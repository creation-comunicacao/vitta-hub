'use client';
import {Suspense,type ReactNode} from 'react';
import {usePathname,useSearchParams} from 'next/navigation';
import {whatsappHref} from '@/config/site';
function ContextualWhatsApp({children}:{children?:ReactNode}) {
 const path=usePathname() || '';
 const interest=useSearchParams().get('interesse');
 const kind=path.includes('consultoria')||interest==='consultoria'?'consultoria':path.includes('nutrition')||interest==='nutricao'||interest==='suplementacao'?'nutricao':'gestao';
 return <a href={whatsappHref(kind)} data-channel="whatsapp">{children||'WhatsApp'}</a>;
}
export function WhatsAppButton({children}:{children?:ReactNode}){
 return <Suspense fallback={<a href={whatsappHref()} data-channel="whatsapp">{children||'WhatsApp'}</a>}><ContextualWhatsApp>{children}</ContextualWhatsApp></Suspense>;
}
