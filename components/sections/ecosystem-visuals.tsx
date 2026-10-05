import { Activity, Waves, Goal, Building2, Users, CalendarDays, MessagesSquare, ClipboardCheck, Heart, Brain, Utensils, Smile, UserRound, Smartphone, TrendingUp, ArrowUpRight } from 'lucide-react';
import { hubs } from '@/config/site';
import type { HubSlug } from '@/content/pages';

const hubIcons = [Activity, Waves, Goal];
export function OperationMap({compact=false}:{compact?:boolean}) {
  return <div className={`operation-map ${compact?'compact':''}`} aria-label="Estrutura de gestão esportiva integrada">
    <div className="operation-top"><span className="eyebrow">Uma estrutura. Toda a operação.</span><Building2 size={24}/></div>
    <div className="operation-center"><span>FITNESS PERSONAL</span><strong>VITTA HUB</strong><p>Gestão Esportiva Integrada</p></div>
    <div className="operation-branches">{hubs.map((hub,i)=>{const Icon=hubIcons[i];return <a href={hub.path} key={hub.path} className={`operation-branch branch-${i}`}><Icon size={23}/><strong>{hub.name}</strong><span>{hub.space}</span></a>})}</div>
    <div className="operation-services">{[{Icon:Users,label:'Profissionais'},{Icon:CalendarDays,label:'Programação'},{Icon:MessagesSquare,label:'Comunicação'},{Icon:ClipboardCheck,label:'Acompanhamento'}].map(({Icon,label})=><span key={label}><Icon size={17}/>{label}</span>)}</div>
    <div className="operation-people"><Users size={22}/><div><strong>A experiência do morador</strong><p>Movimento, convivência e continuidade.</p></div></div>
    <a className="operation-method" href="/miva/">M.I.V.A. <span>Metodologia que conecta toda a estrutura</span><ArrowUpRight size={17}/></a>
  </div>;
}
export function MethodSystem(){return <div className="method-system">
  <div className="method-system-heading"><span className="eyebrow">A pessoa no centro</span><UserRound size={26}/><strong>M.I.V.A.</strong><p>Movimento Inteligente<br/>para uma Vida Ativa</p></div>
  <div className="method-system-pillars">{[{Icon:Heart,name:'Saúde'},{Icon:Brain,name:'Mente'},{Icon:Utensils,name:'Nutrição'},{Icon:Smile,name:'Felicidade / Motivação'}].map(({Icon,name},i)=><div key={name} className={`method-pillar pillar-${i}`}><Icon size={25} strokeWidth={1.5}/><span>{name}</span></div>)}</div>
  <div className="method-system-connections"><span>Uma visão que atravessa</span><div><a href="/gestao-esportiva-condominios/">Hubs</a><a href="/consultoria-online/">Consultoria</a><a href="/e-hub-nutrition/">Nutrição</a></div></div>
</div>}
export function HumanJourney(){return <div className="human-journey"><span className="eyebrow">Acompanhamento conectado</span><h2>Tecnologia organiza.<br/><em>Pessoas acompanham.</em></h2><ol>{[
  {Icon:UserRound,title:'Pessoa',text:'Sua rotina e seu momento.'},
  {Icon:Users,title:'Profissional',text:'Escuta, planejamento e prescrição.'},
  {Icon:Smartphone,title:'App',text:'Treino e orientações organizados.'},
  {Icon:MessagesSquare,title:'Acompanhamento',text:'Contato, suporte e ajustes.'},
  {Icon:TrendingUp,title:'Evolução',text:'Continuidade ao longo da jornada.'},
].map(({Icon,title,text},i)=><li key={title}><span className="human-journey-icon"><Icon size={21}/></span><div><strong>{title}</strong><p>{text}</p></div><small>0{i+1}</small></li>)}</ol></div>}
export function HubVisual({slug}:{slug:HubSlug}){
 const index=slug==='hub-fitness'?0:slug==='hub-aquatico'?1:2;const Icon=hubIcons[index];const hub=hubs[index];
 const spaces=['Academia & áreas externas','Piscina & convivência','Quadra & espaços coletivos'];
 const experiences=[['Treinamento orientado','Força e autonomia','Rotina do morador'],['Aprendizagem na água','Natação e hidroginástica','Diferentes fases da vida'],['Esporte e desenvolvimento','Jogos e interação','Comunidade em movimento']];
 return <div className={`hub-operation-visual branch-${index}`}><div className="hub-operation-parent"><Building2 size={17}/><span>VITTA HUB / Gestão Esportiva</span></div><div className="hub-operation-space"><Icon size={64} strokeWidth={1}/><span>Divisão operacional 0{index+1}</span><strong>{hub.name}</strong><p>{spaces[index]}</p></div><ul>{experiences[index].map(item=><li key={item}>{item}</li>)}</ul><div className="hub-operation-footer"><Users size={20}/><span>Profissionais + programação<br/><strong>Dentro da mesma gestão.</strong></span></div></div>;
}
export function NutritionCare(){return <div className="nutrition-care"><span className="eyebrow">Atendimento nutricional</span><div className="care-person"><UserRound size={35}/><strong>Primeiro,<br/>a pessoa.</strong></div><ol>{['Escutar e avaliar','Orientar a rotina','Acompanhar e ajustar'].map((text,i)=><li key={text}><span>0{i+1}</span>{text}</li>)}</ol><p>Nutrição + treinamento<br/><strong>Cuidado conectado à vida real.</strong></p><small>Suplementação quando pertinente, como complemento.</small></div>}
