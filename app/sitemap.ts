import {siteConfig} from '@/config/site';
import {pageMeta} from '@/content/pages';
import {legalDocuments,isLegalPublished} from '@/content/legal';
export default function sitemap(){
 if(!siteConfig.url)return [];
 const routes=['/',...Object.keys(pageMeta).filter(s=>s!=='equipe').map(s=>`/${s}/`),'/contato/',...(['privacidade','termos'] as const).filter(k=>isLegalPublished(legalDocuments[k])).map(k=>`/${k}/`)];
 return routes.map(path=>({url:siteConfig.url+path}));
}
