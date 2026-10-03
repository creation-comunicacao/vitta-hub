'use client';
import {useEffect,useState,type ReactNode} from 'react';
import {whatsappHref} from '@/config/site';
export function WhatsAppButton({children}:{children?:ReactNode}){
 const [kind,setKind]=useState<'gestao'|'consultoria'|'nutricao'>('gestao');
 // URL só existe após a hidratação do HTML estático; sincronização inicial intencional.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{const path=location.pathname;const interest=new URLSearchParams(location.search).get('interesse');setKind(path.includes('consultoria')||interest==='consultoria'?'consultoria':path.includes('nutrition')||interest==='nutricao'||interest==='suplementacao'?'nutricao':'gestao');},[]);
 return <a href={whatsappHref(kind)} data-channel="whatsapp">{children||'WhatsApp'}</a>;
}
