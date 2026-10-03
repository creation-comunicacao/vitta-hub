'use client';
import {useEffect} from 'react';
import {track} from '@/lib/analytics';
export function AnalyticsBridge(){useEffect(()=>{
 const click=(event:MouseEvent)=>{
  const link=(event.target as Element)?.closest?.('a');if(!link)return;
  const url=new URL(link.href,location.href);const name=link.dataset.cta||link.textContent?.trim()||'link';
  const position=link.closest('header')?'header':link.closest('footer')?'footer':link.closest('.mobile-bottom')?'mobile-bottom':'content';
  const interest=url.searchParams.get('interesse')||'outro';const context={name,position,interest};
  if(link.dataset.channel==='store'){track('store_click',context);return;}
  if(url.hostname==='wa.me'){track('whatsapp_click',context);return;}
  if(url.origin!==location.origin)return;
  if(url.pathname.replace(/\/$/,'')==='/contato'){
   if(interest==='gestao-esportiva'||interest.startsWith('hub-'))track('presentation_request',context);
   else if(interest==='consultoria')track('consultoria_interest',context);
   else if(interest==='nutricao')track('nutrition_contact',context);
  }
  if(link.classList.contains('button')||link.classList.contains('text-link'))track('cta_click',context);
 };document.addEventListener('click',click);return()=>document.removeEventListener('click',click);
},[]);return null}
