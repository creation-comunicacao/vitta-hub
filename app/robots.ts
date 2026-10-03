import { siteConfig } from '@/config/site';
export default function robots(){return {rules:{userAgent:'*',...(siteConfig.indexable?{allow:'/'}:{disallow:'/'})},...(siteConfig.url&&siteConfig.indexable?{sitemap:`${siteConfig.url}/sitemap.xml`}:{})}}
