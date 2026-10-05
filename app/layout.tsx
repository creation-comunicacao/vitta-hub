import { AnalyticsBridge } from '@/components/analytics/bridge';
import { StructuredData } from '@/components/sections/structured-data';
import type { Metadata } from 'next';
import './globals.css';
import './institutional.css';
import './hub-experience.css';
import { Header } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/config/site';
const title = 'FITNESS PERSONAL • VITTA HUB | Gestão Esportiva Integrada';
const description = 'Gestão Esportiva Integrada para condomínios: profissionais, modalidades, metodologia e acompanhamento em uma única estrutura.';
export const metadata: Metadata = { title, description, ...(siteConfig.url?{metadataBase:new URL(siteConfig.url),alternates:{canonical:'/'}}:{}), robots:{index:siteConfig.indexable,follow:siteConfig.indexable}, openGraph:{title,description,type:'website',locale:'pt_BR',siteName:siteConfig.name}, icons:{icon:'/brand/simbolo.png'} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><Header/>{children}<Footer/><AnalyticsBridge/><StructuredData data={{'@context':'https://schema.org','@type':'Organization',name:'FITNESS PERSONAL',alternateName:'VITTA HUB • ASSESSORIA ESPORTIVA',description,...(siteConfig.url?{url:siteConfig.url}:{})}}/>{siteConfig.url&&<StructuredData data={{'@context':'https://schema.org','@type':'WebSite',name:siteConfig.name,url:siteConfig.url}}/>}</body></html>}
