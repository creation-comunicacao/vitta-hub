import type { ReactNode } from 'react';
import { presentationHref } from '@/config/site';
export function CTA({children='Solicitar apresentação', href=presentationHref, secondary=false, channel}: {children?:ReactNode;href?:string;secondary?:boolean;channel?:'store'}) { return <a className={`button ${secondary?'secondary':''}`} href={href} data-channel={channel}>{children}</a>; }
export function SectionHeader({label,title,children}: {label:string;title:string;children?:ReactNode}) { return <div className="section-heading"><span className="eyebrow">{label}</span><h2>{title}</h2>{children&&<p>{children}</p>}</div>; }
export {CinematicHero as Hero} from '@/components/home/cinematic-hero';
