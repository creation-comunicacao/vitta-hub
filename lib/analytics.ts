import { isInterest } from '../config/contact';
export type AnalyticsEvent = 'form_submit'|'whatsapp_click'|'presentation_request'|'consultoria_interest'|'nutrition_contact'|'store_click'|'cta_click';
export type AnalyticsPayload = {event:AnalyticsEvent;page_location:string;page_title:string;cta_name:string;cta_position:string;interest_type:string};
type Sink = (payload:AnalyticsPayload)=>void;
let sink:Sink|undefined;let consent=false;
// Integração opt-in: o adaptador real é instalado apenas após decisão de consentimento.
export function configureAnalytics(adapter?:Sink, allowed=false){sink=adapter;consent=allowed;}
export function track(event:AnalyticsEvent, context:{name:string;position:string;interest?:string}) {
  if(typeof window==='undefined'||!consent||!sink)return;
  const path=window.location.pathname;
  // Nunca envia query, hash, referrer, valores do formulário ou texto digitado na busca.
  const safePath=/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]*$/.test(path)?path:'/';
  const payload:AnalyticsPayload={event,page_location:safePath,page_title:document.title.slice(0,180),cta_name:context.name.slice(0,120),cta_position:context.position.slice(0,40),interest_type:isInterest(context.interest)?context.interest:'outro'};
  try{sink(payload);}catch{/* Falha de analytics não interrompe navegação ou envio. */}
}
