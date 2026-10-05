import { OperationMap, MethodSystem } from '@/components/sections/ecosystem-visuals';
import { StructuredData } from '@/components/sections/structured-data';
import { siteConfig } from '@/config/site';
import type { ReactNode } from 'react';
import { CTA, SectionHeader } from '@/components/sections/ui';
import { pageMeta, type PageSlug } from '@/content/pages';
import { presentationHref } from '@/config/site';
import { FAQAccordion } from './faq';
export function Breadcrumb({slug}:{slug:PageSlug}) {
  const isHub=slug.startsWith('hub-');
  return <><nav className="breadcrumb" aria-label="Caminho da página"><ol><li><a href="/">Início</a></li>{isHub&&<li><a href="/gestao-esportiva-condominios/">Condomínios</a></li>}<li aria-current="page">{pageMeta[slug].label}</li></ol></nav>{siteConfig.url&&<StructuredData data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Início',item:siteConfig.url+'/'},...(isHub?[{name:'Condomínios',item:siteConfig.url+'/gestao-esportiva-condominios/'}]:[]),{name:pageMeta[slug].label,item:siteConfig.url+`/${slug}/`}].map((item,index)=>({'@type':'ListItem',position:index+1,...item}))}}/>}</>;
}
export function PageHero({slug,eyebrow,lead,children,cta='Solicitar apresentação',href=presentationHref,visual}:{slug:PageSlug;eyebrow:string;lead:string;children?:ReactNode;cta?:string;href?:string;visual?:ReactNode}) {
  return <section className={`page-hero page-${slug} ${visual?'with-visual':''}`}><div className="container"><Breadcrumb slug={slug}/><div className="page-hero-grid"><div><span className="eyebrow">{eyebrow}</span><h1>{pageMeta[slug].title}</h1><p className="page-lead">{lead}</p>{children&&<div className="page-intro">{children}</div>}<div className="actions"><CTA href={href}>{cta}</CTA></div></div>{visual&&<div className="page-hero-art">{visual}</div>}</div></div></section>;
}
export function ContentSection({label,title,children,tone='',id}:{label:string;title:string;children:ReactNode;tone?:string;id?:string}) {
  return <section className={`section page-section ${tone}`} id={id}><div className="container"><SectionHeader label={label} title={title}/><div className="section-body">{children}</div></div></section>;
}
export function FeatureList({items}:{items:readonly string[]}) {return <ul className="feature-list">{items.map((item,index)=><li key={item}><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span>{item}</li>)}</ul>;}
export function PageCTA({title='Vamos conectar os espaços e as pessoas do seu condomínio?',text='Converse sobre a Gestão Esportiva Integrada para o seu condomínio.',label='Solicitar apresentação',href=presentationHref,secondary}:{title?:string;text?:string;label?:string;href?:string;secondary?:{label:string;href:string}}) {
  return <section className="section page-cta"><div className="container"><span className="eyebrow">O próximo movimento</span><h2>{title}</h2><p>{text}</p><div className="actions"><CTA href={href}>{label}</CTA>{secondary&&<CTA secondary href={secondary.href}>{secondary.label}</CTA>}</div></div></section>;
}
export function FAQSection({items}:{items:readonly {question:string;answer:string}[]}) {return <section className="section container faq-section"><SectionHeader label="Perguntas frequentes" title="Antes do próximo passo."/><FAQAccordion items={items}/><StructuredData data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:items.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))}}/></section>;}
export function ManagementMark(){return <OperationMap/>;}
export function MethodMark(){return <MethodSystem/>;}
