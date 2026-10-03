import {articles,articleSchema,type Article} from '../content/articles';
export function publishedArticles(source:unknown[]=articles,today=new Date().toISOString().slice(0,10)):Article[]{
 const parsed=source.map(article=>articleSchema.parse(article));
 const slugs=new Set<string>();for(const article of parsed){if(slugs.has(article.slug))throw new Error('Slug editorial duplicado.');slugs.add(article.slug);}
 return parsed.filter(a=>a.approved&&a.status==='published'&&a.publishedAt<=today&&(!a.updatedAt||a.updatedAt<=today)).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
}
export function getArticle(slug:string){return publishedArticles().find(a=>a.slug===slug);}
export function formatDate(value:string){return new Intl.DateTimeFormat('pt-BR',{dateStyle:'long',timeZone:'UTC'}).format(new Date(`${value}T12:00:00Z`));}
export function normalizeSearch(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();}
