import { PageHero, ContentSection, PageCTA, FAQSection } from './shared';
import { Consultancy } from '@/components/sections/home';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table';
import { plans } from '@/content/home';
const journey = [
  ['Anamnese','Conhecer seu contexto e sua rotina.'],['Objetivos','Entender o que você busca neste momento.'],
  ['Planejamento','Organizar o caminho de treinamento.'],['Prescrição','Construir o treino individualizado.'],
  ['Execução','Treinar com orientações e aplicativo.'],['Acompanhamento','Manter o contato com a estrutura de suporte.'],
  ['Ajustes','Revisar a proposta conforme a jornada.'],['Evolução','Acompanhar o desenvolvimento ao longo do processo.'],
];
const comparisons = [
  ['Treino e aplicativo','Incluídos','Incluídos','Incluídos','Incluídos'],
  ['Nutrição','Não descrita nesta oferta','Consulta + planejamento alimentar','Não descrita nesta oferta','Presencial'],
  ['Sessões presenciais','Não descritas nesta oferta','Não descritas nesta oferta','1–2 na primeira semana, conforme disponibilidade','Primeira semana presencial'],
  ['Avaliação e bioimpedância','Anamnese','Anamnese do Essencial','Não descritas nesta oferta','Avaliação + bioimpedância'],
  ['Suporte','Suporte e acompanhamento','Suporte e acompanhamento','Consultar composição','Prioritário'],
  ['Investimento','Sob consulta','Sob consulta','Sob consulta','Sob consulta'],
];
export function ConsultancyPage(){return <>
  <PageHero slug="consultoria-online" eyebrow="Consultoria Online / M.I.V.A." lead="Você não precisa de mais uma planilha." cta="Conhecer a Consultoria" href="#ofertas" visual={<div className="consultancy-mark"><span className="eyebrow">O acompanhamento conecta</span><strong>Você</strong><div><span>Profissional</span><span>Treino</span><span>Aplicativo</span></div><p>Tecnologia organiza.<br/>Pessoas acompanham.</p></div>}><p>Prescrição individualizada e acompanhamento para conectar o treinamento à sua rotina, aos seus objetivos e ao seu momento.</p></PageHero>
  <ContentSection label="A jornada" title="Do primeiro contato ao próximo ajuste."><ol className="consultancy-journey">{journey.map(([title,text],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></ContentSection>
  <div id="ofertas"><Consultancy label="Quatro ofertas / Sob consulta"/></div>
  <ContentSection label="Compare as ofertas" title="Encontre a composição que faz sentido para você."><p>Todos os valores são sob consulta. Confirme disponibilidade e escopo com o atendimento.</p><div className="comparison-wrap" role="region" aria-label="Comparação dos quatro planos" tabIndex={0}><Table className="comparison-table"><TableCaption>Os itens não descritos em uma oferta devem ser confirmados com o atendimento.</TableCaption><TableHeader><TableRow><TableHead scope="col">O que acompanha você</TableHead>{plans.map(p=><TableHead key={p.name} scope="col">M.I.V.A.<br/>{p.name}</TableHead>)}</TableRow></TableHeader><TableBody>{comparisons.map(([label,...values])=><TableRow key={label}><TableHead scope="row">{label}</TableHead>{values.map((value,i)=><TableCell key={i}>{value}</TableCell>)}</TableRow>)}</TableBody></Table></div></ContentSection>
  <ContentSection label="Físico + digital + humano" title="Tecnologia organiza. Pessoas acompanham." tone="soft-section"><div className="editorial-split"><p className="large-copy">O aplicativo apoia a organização do treino. A prescrição, a orientação e o acompanhamento mantêm as pessoas no centro da experiência.</p><div><h3>Diferentes momentos, diferentes necessidades.</h3><p>A consultoria pode conversar com quem está começando, retomando a rotina ou buscando evolução, composição corporal, autonomia ou objetivos esportivos.</p><p>A M.I.V.A. conecta essa visão ao movimento. A nutrição compõe as ofertas Performance & Nutri e Executive VIP.</p><div className="actions"><a className="text-link" href="/miva/">Entender a M.I.V.A.</a><a className="text-link" href="/e-hub-nutrition/">Conhecer o atendimento nutricional</a></div></div></div></ContentSection>
  <FAQSection items={[
    {question:'Quanto custa cada plano?',answer:'Todos os valores são sob consulta. O atendimento deve confirmar o escopo comercial e a disponibilidade antes da contratação.'},
    {question:'O Híbrido Start inclui sessões presenciais?',answer:'A proposta inclui treino, aplicativo e 1–2 sessões presenciais na primeira semana, conforme disponibilidade.'},
    {question:'Quais ofertas incluem nutrição?',answer:'Performance & Nutri reúne o Essencial, consulta nutricional e planejamento alimentar individualizado com Douglas Silva. Executive VIP também inclui nutrição em sua composição.'},
    {question:'M.I.V.A. é o nome de um aplicativo?',answer:'Não. M.I.V.A. é a metodologia Movimento Inteligente para uma Vida Ativa. O aplicativo é uma ferramenta de organização do treinamento dentro da experiência.'},
  ]}/>
  <PageCTA title="Vamos conhecer sua rotina?" text="Converse sobre a consultoria e a composição mais adequada ao seu momento." label="Conhecer a Consultoria" href="/contato/?interesse=consultoria"/>
</>}
