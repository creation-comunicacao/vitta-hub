import { Heart, Brain, Utensils, Smile } from 'lucide-react';
import { PageHero, ContentSection, FeatureList, PageCTA, FAQSection, MethodMark } from './shared';
import { Journey } from '@/components/sections/home';
export function MivaPage(){return <>
  <PageHero slug="miva" eyebrow="Metodologia transversal da VITTA HUB" lead="Uma visão integrada do movimento, conectada à pessoa, ao seu objetivo e ao seu momento de vida." cta="Conhecer a Consultoria" href="/consultoria-online/" visual={<MethodMark/>}/>
  <ContentSection label="Quatro pilares conectados" title="O movimento faz parte de um todo."><div className="method-pillar-grid">{[
    {Icon:Heart,title:'Saúde',text:'Movimento orientado, consciência corporal e uma rotina que considera o bem-estar.'},
    {Icon:Brain,title:'Mente',text:'Atenção à experiência, à percepção e ao envolvimento da pessoa no processo.'},
    {Icon:Utensils,title:'Nutrição',text:'Orientação individualizada conectada à rotina e ao treinamento.'},
    {Icon:Smile,title:'Felicidade / Motivação',text:'Acolhimento, convivência e sentido para dar continuidade ao movimento.'},
  ].map(({Icon,title,text})=><article key={title}><Icon size={34} strokeWidth={1.2}/><h3>{title}</h3><p>{text}</p></article>)}</div></ContentSection>
  <ContentSection label="Diferentes pontos de partida" title="A pessoa orienta o percurso." tone="soft-section"><div className="editorial-split"><div><p className="large-copy">A jornada não é uma sequência obrigatória. Pessoas podem começar em pontos diferentes, conforme sua necessidade, seu objetivo e seu momento.</p><p>A pirâmide organiza focos de trabalho. Ela não classifica o valor das pessoas nem exige que todos busquem alto rendimento.</p></div><div className="method-pyramid" aria-label="Pirâmide de focos: Base, Desenvolvimento e Performance"><div>Performance <small>Potência · Velocidade</small></div><div>Desenvolvimento <small>Força · Resistência</small></div><div>Base <small>CORE · Mobilidade · Fundamentos</small></div></div></div></ContentSection>
  <Journey label="Jornada de evolução"/>
  <ContentSection label="Aplicação no ecossistema" title="Uma metodologia. Diferentes contextos." tone="soft-section"><div className="application-grid"><a href="/gestao-esportiva-condominios/"><span className="eyebrow">Nos Hubs</span><h3>O movimento no condomínio</h3><p>Fitness, Aquático e Esportivo conectados à gestão, aos profissionais e ao acompanhamento.</p><span className="text-link">Conhecer a Gestão Esportiva</span></a><a href="/consultoria-online/"><span className="eyebrow">Na consultoria</span><h3>O treino na sua rotina</h3><p>Prescrição individualizada e acompanhamento nas ofertas digitais e híbridas.</p><span className="text-link">Conhecer a Consultoria</span></a><a href="/e-hub-nutrition/"><span className="eyebrow">Na nutrição</span><h3>O cuidado com a pessoa</h3><p>Avaliação, orientação e acompanhamento nutricional integrados ao treinamento.</p><span className="text-link">Conhecer o E-Hub Nutrition</span></a></div></ContentSection>
  <ContentSection label="Clareza sobre a proposta" title="O que M.I.V.A. não é."><div className="editorial-split"><p className="large-copy">M.I.V.A. é a metodologia transversal da VITTA HUB, conectando os pilares e as experiências do ecossistema.</p><FeatureList items={['Não é uma modalidade','Não é uma planilha','Não é um aplicativo','Não é uma dieta','Não é um suplemento','Não é uma promessa de resultado rápido']}/></div></ContentSection>
  <FAQSection items={[
    {question:'Todos precisam passar por todos os níveis da pirâmide?',answer:'Não. A pirâmide organiza focos de trabalho. As pessoas podem começar em pontos diferentes conforme necessidades, objetivos e momento de vida.'},
    {question:'Qual a diferença entre M.I.V.A., T.A.L. e T.A.R.?',answer:'M.I.V.A. é a metodologia transversal. T.A.L. é o protocolo de Treinamento para Autonomia e Longevidade. T.A.R. é o protocolo de Treinamento de Alto Rendimento.'},
    {question:'A metodologia se aplica somente à consultoria?',answer:'Não. A M.I.V.A. atravessa os Hubs, a Consultoria Online e a integração com a nutrição dentro do ecossistema VITTA HUB.'},
  ]}/>
  <PageCTA title="Encontre um acompanhamento conectado à sua rotina." text="Conheça as quatro ofertas da Consultoria Online M.I.V.A." label="Conhecer a Consultoria" href="/consultoria-online/"/>
</>}
