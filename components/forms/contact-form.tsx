'use client';
import {z} from 'zod';
import {useEffect,useRef,useState,type FormEvent} from 'react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import {interests,isB2B,isInterest,planNames,interestContext,type Interest} from '@/config/contact';
import {contactSchema,fieldErrors} from '@/lib/contact-validation';
import {track} from '@/lib/analytics';
import {siteConfig,whatsappHref} from '@/config/site';
const responseSchema=z.object({available:z.boolean().optional(),token:z.string().optional(),ok:z.boolean().optional(),error:z.string().optional(),fields:z.record(z.string()).optional()});
export function ContactForm({privacyPublished}:{privacyPublished:boolean}){
 const [interest,setInterest]=useState<Interest>('gestao-esportiva');const [plan,setPlan]=useState('');const [available,setAvailable]=useState(false);
 const [consent,setConsent]=useState(false);const [token,setToken]=useState('');const [loading,setLoading]=useState(false);
 const [errors,setErrors]=useState<Record<string,string>>({});const [notice,setNotice]=useState('');const [sent,setSent]=useState(false);
 const statusRef=useRef<HTMLDivElement>(null);const formRef=useRef<HTMLFormElement>(null);
 // URL só existe após a hidratação do HTML estático; sincronização inicial intencional.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{const query=new URLSearchParams(location.search);if(isInterest(query.get('interesse')))setInterest(query.get('interesse') as Interest);const selected=query.get('plano');if(selected&&(planNames as readonly string[]).includes(selected))setPlan(selected);if(!privacyPublished)return;const controller=new AbortController();fetch('/api/contact-token.php',{signal:controller.signal,cache:'no-store'}).then(r=>r.json()).then(raw=>{const data=responseSchema.parse(raw);if(data.available&&data.token){setToken(data.token);setAvailable(true);}else setNotice('O envio está temporariamente indisponível. Atualize a página para tentar novamente.');}).catch(()=>{if(!controller.signal.aborted)setNotice('Não foi possível preparar o envio. Atualize a página para tentar novamente.');});return()=>controller.abort();},[privacyPublished]);
 function changeInterest(value:Interest){if(!isInterest(value))return;setInterest(value);if(value!=='consultoria')setPlan('');setErrors({});setNotice('');}
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(loading||sent)return;setErrors({});setNotice('');
  const data=Object.fromEntries(new FormData(event.currentTarget));
  const result=contactSchema.safeParse({...data,interest,plan:interest==='consultoria'?plan:'',consent:available?consent:true,token,source:'/contato/'});
  if(!result.success){const issues=fieldErrors(result.error);setErrors(issues);const first=Object.keys(issues)[0];formRef.current?.querySelector<HTMLElement>(`[id="${first}"]`)?.focus();return;}
  if(!available){setNotice('Preenchimento conferido. O envio permanece indisponível; nenhuma solicitação foi enviada.');statusRef.current?.focus();return;}
  setLoading(true);
  try{
   const response=await fetch('/api/contact.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(result.data),signal:AbortSignal.timeout(15000)});
   const body=responseSchema.parse(await response.json());
   if(!response.ok||body.ok!==true){setErrors(body.fields||{});setNotice(body.error||'Não foi possível confirmar o recebimento. Seus campos foram preservados.');}
   else {setSent(true);setNotice('Solicitação encaminhada ao atendimento. Obrigado pelo contato com a VITTA HUB.');track('form_submit',{name:'contact_form',position:'contact',interest});formRef.current?.reset();}
  }catch{setNotice('Não foi possível confirmar o recebimento. Seus campos foram preservados; tente novamente mais tarde.');}
  finally{setLoading(false);statusRef.current?.focus();}
 }
 const context=interestContext[interest]||interestContext['gestao-esportiva'];
 const field=(name:string,label:string,options:{type?:string;autoComplete?:string;required?:boolean;maxLength?:number}={})=><div className="form-field"><label htmlFor={name}>{label}{options.required&&<span aria-hidden="true"> *</span>}</label><Input id={name} name={name} type={options.type||'text'} autoComplete={options.autoComplete} maxLength={options.maxLength||120} required={options.required} aria-invalid={!!errors[name]} aria-describedby={errors[name]?`${name}-error`:undefined}/>{errors[name]&&<span className="field-error" id={`${name}-error`}>{errors[name]}</span>}</div>;
 return <div className="contact-layout"><aside className="contact-aside"><span className="eyebrow">A conexão certa para você</span><h2>{context.title}</h2><p>{context.text}</p><a className="text-link" href={context.href}>Conhecer esta frente</a><div className="contact-channels"><h3>Canais de atendimento</h3>{siteConfig.whatsapp?<a className="button secondary" href={whatsappHref(interest==='nutricao'?'nutricao':interest==='consultoria'?'consultoria':'gestao')}>Conversar pelo WhatsApp</a>:<p>O canal de WhatsApp será disponibilizado em breve.</p>}{siteConfig.email&&<a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}{interest==='suplementacao'&&(siteConfig.storeUrl?<a className="button" data-channel="store" href={siteConfig.storeUrl}>Acessar loja virtual</a>:<p>O acesso à loja será disponibilizado em breve.</p>)}</div></aside>
 <form className="contact-form" ref={formRef} onSubmit={submit} noValidate aria-busy={loading}>
 <div className="form-heading"><span className="eyebrow">Seu próximo movimento</span><h2>Conte o que você procura.</h2><p>Os campos com * são obrigatórios.</p></div>
 {!available&&<div className="form-availability" role="note">O envio de mensagens ainda não está disponível. Você pode explorar o formulário e conferir o preenchimento, sem enviar seus dados.</div>}
 <fieldset disabled={loading||sent}><legend className="sr-only">Informações para contato</legend>
 <div className="form-field full"><label htmlFor="interest">Interesse *</label><Select value={interest} onValueChange={value=>changeInterest(value as Interest)}><SelectTrigger id="interest" aria-invalid={!!errors.interest}><SelectValue/></SelectTrigger><SelectContent>{interests.map(item=><SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select>{errors.interest&&<span className="field-error">{errors.interest}</span>}</div>
 {interest==='consultoria'&&plan&&<div className="chosen-plan">M.I.V.A. • {plan}<button type="button" onClick={()=>setPlan('')}>Remover seleção</button></div>}
 <div className="form-grid">{field('name','Nome',{required:true,autoComplete:'name'})}{field('city','Cidade',{required:true,autoComplete:'address-level2'})}
 {isB2B(interest)&&<>{field('company','Condomínio / Empresa',{required:true,autoComplete:'organization'})}{field('role','Cargo / Relação com o condomínio',{required:true,autoComplete:'organization-title'})}</>}
 {field('phone','WhatsApp com DDD',{required:true,type:'tel',autoComplete:'tel',maxLength:25})}{field('email','E-mail',{required:true,type:'email',autoComplete:'email',maxLength:254})}</div>
 <div className="form-field full"><label htmlFor="message">Mensagem *</label><Textarea id="message" name="message" rows={5} minLength={10} maxLength={2000} required aria-invalid={!!errors.message} aria-describedby={`message-help${errors.message?' message-error':''}`}/><small id="message-help">Até 2.000 caracteres. Não inclua informações de saúde ou documentos pessoais.</small>{errors.message&&<span className="field-error" id="message-error">{errors.message}</span>}</div>
 <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" autoComplete="off" tabIndex={-1}/></div>
 {privacyPublished?<div className="consent-field"><Checkbox id="consent" checked={consent} onCheckedChange={value=>setConsent(value===true)} aria-invalid={!!errors.consent} aria-describedby={errors.consent?'consent-error':undefined}/><label htmlFor="consent">Li a <a href="/privacidade/">política de privacidade</a> e autorizo o uso dos dados para responder a esta solicitação.</label>{errors.consent&&<span className="field-error" id="consent-error">{errors.consent}</span>}</div>:<p className="privacy-note">A política de privacidade será disponibilizada antes da abertura do formulário para envio. <a href="/privacidade/">Consultar disponibilidade</a>.</p>}
 <button className="button form-submit" type="submit" disabled={loading||sent||(available&&!token)}>{loading?'Enviando…':sent?'Solicitação encaminhada':available?'Enviar solicitação':'Conferir preenchimento'}</button>
 </fieldset><div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className={`form-status ${sent?'received':''}`}>{notice}</div><noscript>Ative o JavaScript para utilizar o formulário.</noscript>
 </form></div>;
}
