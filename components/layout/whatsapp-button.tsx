'use client';
import {Suspense,type ReactNode} from 'react';
import {usePathname,useSearchParams} from 'next/navigation';
import {whatsappHref,whatsappKind} from '@/config/site';
function ContextualWhatsApp({children}:{children?:ReactNode}) {
 const path=usePathname() || '';
 const interest=useSearchParams().get('interesse');
 const kind=whatsappKind(path,interest);
 return <a href={whatsappHref(kind)} data-channel="whatsapp" data-interest={kind==='gestao'?'gestao-esportiva':kind==='geral'?'outro':kind}>{children||'WhatsApp'}</a>;
}
export function WhatsAppButton({children}:{children?:ReactNode}){
 return <Suspense fallback={<a href={whatsappHref()} data-channel="whatsapp">{children||'WhatsApp'}</a>}><ContextualWhatsApp>{children}</ContextualWhatsApp></Suspense>;
}
