import type {Metadata} from 'next';
import {siteConfig} from '../config/site';
export function metadataFor(title:string,description:string,path:string,index=true):Metadata{
 return {title,description,alternates:siteConfig.url?{canonical:path}:{canonical:null},robots:{index:index&&siteConfig.indexable,follow:index&&siteConfig.indexable},openGraph:{title,description,type:'website',locale:'pt_BR',siteName:siteConfig.name,...(siteConfig.url?{url:`${siteConfig.url}${path}`}:{})}};
}
