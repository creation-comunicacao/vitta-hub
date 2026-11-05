import {test} from 'node:test';
import assert from 'node:assert/strict';
import {publishedArticles,normalizeSearch} from '../lib/articles';
import {contactSchema} from '../lib/contact-validation';
import {isLegalPublished,legalDocuments} from '../content/legal';
const fixture={title:'Conteúdo sintético de teste',slug:'teste-local',category:'Gestão Esportiva',status:'published',approved:true,author:{name:'Autor de teste'},publishedAt:'2020-01-01',image:{src:'/hero-700.webp',alt:'Imagem de teste editorial',width:700,height:467},excerpt:'Este conteúdo é somente um fixture local.',blocks:[{type:'heading',level:2,id:'contexto',text:'Contexto'},{type:'paragraph',text:'Texto sintético de teste.'}],cta:{label:'Conhecer gestão',href:'/gestao-esportiva-condominios/'},seo:{title:'Título sintético de teste',description:'Descrição sintética para a verificação local.'}};
test('Somente artigos aprovados, publicados e datados entram no site',()=>{
 assert.equal(publishedArticles([fixture],'2026-10-02').length,1);
 for(const change of [{approved:false},{status:'draft'},{publishedAt:'2099-01-01'},{updatedAt:'2099-01-01'}])assert.equal(publishedArticles([{...fixture,...change}],'2026-10-02').length,0);
});
test('Datas impossíveis, slugs duplicados e links inseguros falham antes do build',()=>{
 assert.throws(()=>publishedArticles([{...fixture,publishedAt:'2026-02-31'}]));
 assert.throws(()=>publishedArticles([fixture,fixture]));
 assert.throws(()=>publishedArticles([{...fixture,cta:{label:'Teste',href:'javascript:alert(1)'}}]));
});
test('Nenhum artigo fictício publicado; política pendente não libera formulário',()=>{
 assert.equal(publishedArticles().length,0);assert.equal(isLegalPublished(legalDocuments.privacidade),false);
});
test('Busca ignora acentos e capitalização',()=>assert.equal(normalizeSearch('  CONDOMÍNIO  '),'condominio'));
test('Validação muda conforme intenção e bloqueia campos inválidos',()=>{
 const valid={name:'Pessoa Teste',city:'Cidade',phone:'11999999999',email:'test@example.test',interest:'nutricao',message:'Solicito informações.',consent:true};
 assert.equal(contactSchema.safeParse(valid).success,true);
 assert.equal(contactSchema.safeParse({...valid,interest:'gestao-esportiva'}).success,false);
 assert.equal(contactSchema.safeParse({...valid,consent:false}).success,false);
 assert.equal(contactSchema.safeParse({...valid,email:'inválido'}).success,false);
});

import {messages,whatsappHref,whatsappKind,siteConfig} from '../config/site';
import {plans} from '../content/home';
import {planNames,normalizePlan} from '../config/contact';
import {safeSource} from '../lib/contact-validation';
import {validateStoreRedirects} from '../lib/store-redirects';
import {configureAnalytics,track} from '../lib/analytics';
test('Devolutiva: canais e mensagens por intenção',()=>{
 assert.equal(siteConfig.email,'vittahub@fitnesspersonal.com.br');
 assert.equal(siteConfig.url,'https://fitnesspersonal.com.br');
 for(const kind of Object.keys(messages) as (keyof typeof messages)[]) {
  const url=new URL(whatsappHref(kind));assert.equal(url.pathname,'/551141465843');assert.equal(url.searchParams.get('text'),messages[kind]);
 }
 assert.equal(whatsappKind('/hub-aquatico/'),'gestao');assert.equal(whatsappKind('/consultoria-online/'),'consultoria');
 assert.equal(whatsappKind('/contato/','suplementacao'),'nutricao');assert.equal(whatsappKind('/equipe/'),'geral');assert.equal(whatsappKind('/contato/','outro'),'geral');
});
test('Programas novos preservam links antigos e validam plano no formulário',()=>{
 assert.deepEqual(plans.map(p=>p.name),[...planNames]);
 assert.equal(normalizePlan('Essencial'),'Digital');assert.equal(normalizePlan('Performance & Nutri'),'Total');assert.equal(normalizePlan('M.I.V.A. Híbrido Start'),'Híbrido Start');assert.equal(normalizePlan('não existe'),'');
 assert.equal(safeSource('/consultoria-online/'),'/consultoria-online/');assert.equal(safeSource('/contato/?email=private@example.test'),'/contato/');
});
test('Redirects 301 rejeitam rotas institucionais, duplicatas e destinos não aprovados',()=>{
 const row={source:'/produto-legado',destination:'https://loja.example.test/produto'};
 assert.equal(validateStoreRedirects([row],'https://loja.example.test',['/contato'])[0].statusCode,301);
 assert.throws(()=>validateStoreRedirects([{...row,source:'/contato/'}],'https://loja.example.test',['/contato']));
 assert.throws(()=>validateStoreRedirects([row,row],'https://loja.example.test',[]));
 assert.throws(()=>validateStoreRedirects([row],'https://outro.example.test',[]));
 assert.throws(()=>validateStoreRedirects([{...row,source:'/conteudos/artigo'}],'https://loja.example.test',[]));
});
test('Eventos dependem de consentimento e excluem query, hash e referrer',()=>{
 const globals=globalThis as unknown as Record<string,unknown>;
 const oldWindow=globals.window, oldDocument=globals.document;
 globals.window={location:{pathname:'/contato/',search:'?email=private@example.test',hash:'#private'}};globals.document={title:'Contato',referrer:'https://example.test/?secret=private'};
 const received:unknown[]=[];
 try{
  configureAnalytics(p=>received.push(p),false);track('click_email',{name:'email_contact',position:'footer'});assert.equal(received.length,0);
  configureAnalytics(p=>received.push(p),true);track('generate_lead',{name:'contact_form',position:'contact',interest:'consultoria'});
  assert.equal(received.length,1);assert.equal(JSON.stringify(received).includes('private'),false);assert.equal(JSON.stringify(received).includes('generate_lead'),true);
 }finally{configureAnalytics();globals.window=oldWindow;globals.document=oldDocument;}
});
