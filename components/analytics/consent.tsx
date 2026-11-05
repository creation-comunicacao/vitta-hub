'use client';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {configureAnalytics} from '@/lib/analytics';
import {siteConfig} from '@/config/site';
import {isLegalPublished,legalDocuments} from '@/content/legal';

const id=process.env.NEXT_PUBLIC_GA4_ID || '';
const enabled=process.env.NEXT_PUBLIC_ANALYTICS_ENABLED==='true' && /^G-[A-Z0-9]+$/.test(id) && isLegalPublished(legalDocuments.privacidade);
const key='vitta-analytics-consent';
type Choice='accepted'|'rejected'|null;
type AnalyticsWindow=Window & {dataLayer?:unknown[];gtag?:(...args:unknown[])=>void};
export function AnalyticsConsent(){
 const [choice,setChoice]=useState<Choice>(null);const [ready,setReady]=useState(false);const [editing,setEditing]=useState(false);
 const path=usePathname();
 useEffect(()=>{
  let stored:Choice=null;
  try{const value=localStorage.getItem(key);if(value==='accepted'||value==='rejected')stored=value;}catch{/* Sem armazenamento: escolha apenas nesta visita. */}
  // Sincroniza uma preferência persistida no navegador após a hidratação.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setChoice(stored);setReady(true);
 },[]);
 useEffect(()=>{
  if(!enabled||!ready)return;
  const win=window as AnalyticsWindow;
  const disabled=win as unknown as Record<string,unknown>;
  if(choice!=='accepted'){disabled[`ga-disable-${id}`]=true;configureAnalytics();return;}
  disabled[`ga-disable-${id}`]=false;
  // Google gtag consumes the Arguments command format.
  // eslint-disable-next-line prefer-rest-params
  if(!win.gtag){win.dataLayer=win.dataLayer||[];win.gtag=function(){win.dataLayer!.push(arguments);};win.gtag('js',new Date());}
  const location=siteConfig.url+(/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]*$/.test(path||'')?path:'/');
  win.gtag('config',id,{send_page_view:false,page_location:location,page_referrer:'',allow_google_signals:false,allow_ad_personalization_signals:false});
  if(!document.getElementById('vitta-ga4')){const script=document.createElement('script');script.id='vitta-ga4';script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;document.head.appendChild(script);}
  win.gtag('event','page_view',{page_location:location,page_referrer:'',page_title:document.title});
  configureAnalytics(({event,...payload})=>win.gtag?.('event',event,{...payload,page_location:siteConfig.url+payload.page_location,page_referrer:''}),true);
  return()=>configureAnalytics();
 },[choice,ready,path]);
 function choose(value:Choice){setChoice(value);setEditing(false);try{localStorage.setItem(key,value||'rejected');}catch{/* Preferência em memória. */}}
 if(!enabled||!ready)return null;
 return <>{choice&&!editing?<button className="analytics-preferences" onClick={()=>setEditing(true)}>Preferências de cookies</button>:<aside className="analytics-consent" aria-label="Preferências de privacidade"><p>Podemos usar cookies de análise para entender a navegação e melhorar o site? A escolha é opcional. <a href="/privacidade/">Política de privacidade</a>.</p><div><button className="button secondary" onClick={()=>choose('rejected')}>Somente necessários</button><button className="button" onClick={()=>choose('accepted')}>Aceitar análise</button></div></aside>}</>;
}
