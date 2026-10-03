import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTA } from '@/components/sections/ui';
import { PageEnhancements } from '@/components/sections/page-enhancements';
import { pageMeta, seoTitles, type PageSlug, type HubSlug } from '@/content/pages';
import { siteConfig } from '@/config/site';
import { ManagementPage } from '@/components/pages/management';
import { HubPage } from '@/components/pages/hub';
import { MivaPage } from '@/components/pages/miva';
import { ConsultancyPage } from '@/components/pages/consultancy';
import { NutritionPage } from '@/components/pages/nutrition';
import { InstitutionalPage, TeamPage } from '@/components/pages/institutional';
const pending:Record<string,string>={};
export function generateStaticParams(){return Object.keys(pageMeta).map(slug=>({slug}));}
export const dynamicParams=false;
function isReady(slug:string):slug is PageSlug {return Object.hasOwn(pageMeta,slug)}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 if(!isReady(slug))return {title:`${pending[slug]||'Página não encontrada'} | VITTA HUB`,description:'Página em preparação para a próxima etapa do projeto.',robots:{index:false,follow:false},alternates:{canonical:null},openGraph:{title:pending[slug]||'Página não encontrada',description:'Página em preparação para a próxima etapa do projeto.'}};
 const page=pageMeta[slug];const title=seoTitles[slug];
 return {title,description:page.description,alternates:siteConfig.url?{canonical:`/${slug}/`}:{canonical:null},robots:{index:siteConfig.indexable,follow:siteConfig.indexable},openGraph:{title,description:page.description,type:'website',locale:'pt_BR',siteName:siteConfig.name,...(siteConfig.url?{url:`${siteConfig.url}/${slug}/`}:{})}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const{slug}=await params;
 if(!isReady(slug)){
  if(!pending[slug])notFound();
  return <main className="container pending-page" id="principal"><span className="eyebrow">VITTA HUB / Prévia do projeto</span><h1>{pending[slug]}</h1><div className="pending-status"><p>Esta página será desenvolvida na parte 3. A Home e as páginas do negócio estão disponíveis para revisão.</p></div>{slug==='contato'&&<p>O canal de atendimento ainda não está conectado. Nenhuma solicitação é enviada por esta prévia.</p>}{(slug==='termos'||slug==='privacidade')&&<p>As informações oficiais serão disponibilizadas após validação. Esta página não constitui um documento jurídico.</p>}<div className="actions"><CTA href="/">Voltar à Home</CTA></div></main>;
 }
 let content;
 switch(slug){
  case 'gestao-esportiva-condominios':content=<ManagementPage/>;break;
  case 'hub-fitness':case 'hub-aquatico':case 'hub-esportivo':content=<HubPage slug={slug as HubSlug}/>;break;
  case 'miva':content=<MivaPage/>;break;
  case 'consultoria-online':content=<ConsultancyPage/>;break;
  case 'e-hub-nutrition':content=<NutritionPage/>;break;
  case 'vitta-hub':content=<InstitutionalPage/>;break;
  case 'equipe':content=<TeamPage/>;break;
 }
 return <main id="principal">{content}<PageEnhancements/></main>;
}
