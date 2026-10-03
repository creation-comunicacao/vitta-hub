import {build} from 'esbuild';
import {cp,mkdir,readFile,writeFile,readdir,rm,access} from 'node:fs/promises';
import {join} from 'node:path';
const source='dist/client';const root='locaweb';const publicRoot=join(root,'public');
// Recria somente o artefato gerado. Configuração real permanece em php/private/config.php.
await access(join(source,'index.html'));
await rm(root,{recursive:true,force:true});await mkdir(publicRoot,{recursive:true});
await cp(source,publicRoot,{recursive:true,filter:path=>!path.split('/').some(p=>p.startsWith('.'))&&!path.endsWith('.map')});
await cp('php/public',publicRoot,{recursive:true});
await mkdir(join(root,'private'),{recursive:true});
for(const name of ['contact.php','config.example.php'])await cp(join('php/private',name),join(root,'private',name));
// Apache e PHP servem URLs de diretório sem exigir rewrites de SPA.
async function nest(directory){for(const entry of await readdir(directory,{withFileTypes:true})){const path=join(directory,entry.name);if(entry.isDirectory()){await nest(path);continue;}if(entry.name.endsWith('.html')&&!['index.html','404.html'].includes(entry.name)){const name=entry.name.slice(0,-5);const folder=join(directory,name);await mkdir(folder,{recursive:true});await cp(path,join(folder,'index.html'));await rm(path);}}}
await nest(publicRoot);
const required=['','vitta-hub','gestao-esportiva-condominios','hub-fitness','hub-aquatico','hub-esportivo','miva','consultoria-online','e-hub-nutrition','equipe','conteudos','contato','privacidade','termos'];
for(const route of required){const path=join(publicRoot,route,'index.html');await access(path);const html=await readFile(path,'utf8');if(!html.includes('<h1'))throw new Error(`Página sem H1: ${route}`);}
await access(join(publicRoot,'404.html'));
// Não inventar domínio. Com domínio configurado, as rotas metadata do build são usadas.
const config=JSON.parse(await readFile('config/redirects.json','utf8'));
if(!Array.isArray(config))throw new Error('Redirects devem formar uma lista.');
let redirects='\n# Redirects 301 aprovados (vazio até receber o mapa antigo).\n';const seen=new Set();
for(const item of config){if(!/^\/[a-z0-9/_-]+$/.test(item.from)||!/^\/[a-z0-9/_-]*$/.test(item.to)||item.from===item.to||seen.has(item.from))throw new Error('Redirect inválido.');if(config.some(other=>other.from===item.to))throw new Error('Corrente/ciclo de redirects não permitido.');seen.add(item.from);redirects+=`RedirectMatch 301 ^${item.from}$ ${item.to}\n`;}
await writeFile(join(publicRoot,'.htaccess'),await readFile('php/public/.htaccess','utf8')+redirects);
// O exportador não materializa rotas metadata dinâmicas; gerar os arquivos explicitamente.
try { process.loadEnvFile('.env'); } catch (error) { if(error.code !== 'ENOENT') throw error; }
async function loadModule(entry){const result=await build({entryPoints:[entry],bundle:true,platform:'node',format:'esm',write:false});return import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));}
const {default:sitemap}=await loadModule('app/sitemap.ts');
const {default:robots}=await loadModule('app/robots.ts');
const escape=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const entries=sitemap();
await writeFile(join(publicRoot,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries.map(e=>'<url><loc>'+escape(e.url)+'</loc>'+(e.lastModified?'<lastmod>'+escape(e.lastModified)+'</lastmod>':'')+'</url>').join('')+'</urlset>');
const robot=robots();await writeFile(join(publicRoot,'robots.txt'),'User-agent: *\n'+(robot.rules.disallow?'Disallow: /\n':'Allow: /\n')+(robot.sitemap?'Sitemap: '+robot.sitemap+'\n':''));
const instructions=await readFile('docs/LOCAWEB.md','utf8');await writeFile(join(root,'LEIA-ME.md'),instructions);
console.log(`Pacote estático + PHP: ${root}/ (${required.length} páginas, sem Node em produção).`);
