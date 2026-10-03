import {siteConfig} from '@/config/site';
import {pageMeta} from '@/content/pages';
import {publishedArticles} from '@/lib/articles';
import {legalDocuments,isLegalPublished} from '@/content/legal';
export default function sitemap(){
 if(!siteConfig.url)return [];
 const routes=['/',...Object.keys(pageMeta).map(s=>`/${s}/`),'/contato/','/conteudos/',...(['privacidade','termos'] as const).filter(k=>isLegalPublished(legalDocuments[k])).map(k=>`/${k}/`)];
 return [...routes.map(path=>({url:siteConfig.url+path})),...publishedArticles().map(a=>({url:siteConfig.url+(a.seo.canonical||`/conteudos/${a.slug}/`),lastModified:a.updatedAt||a.publishedAt}))];
}
