export const pageMeta = {
  'gestao-esportiva-condominios': {
    title: 'Gestão Esportiva para Condomínios',
    description: 'Gestão centralizada para conectar profissionais, atividades, programação e acompanhamento nos espaços esportivos do seu condomínio.',
    label: 'Condomínios',
  },
  'hub-fitness': {
    title: 'Treinamento e Movimento para o seu Condomínio',
    description: 'Hub Fitness: musculação, funcional, mobilidade e treinamento orientado como parte da Gestão Esportiva Integrada para condomínios.',
    label: 'Hub Fitness',
  },
  'hub-aquatico': {
    title: 'Natação, Movimento e Bem-Estar no seu Condomínio',
    description: 'Hub Aquático: natação, hidroginástica e atividades por nível, com programação e acompanhamento integrados à gestão do condomínio.',
    label: 'Hub Aquático',
  },
  'hub-esportivo': {
    title: 'Esporte que movimenta. Desenvolve. Conecta.',
    description: 'Hub Esportivo: futebol, FutCross, desenvolvimento motor, jogos e eventos conectados à gestão esportiva do condomínio.',
    label: 'Hub Esportivo',
  },
  miva: {
    title: 'M.I.V.A. — Movimento Inteligente para uma Vida Ativa',
    description: 'Conheça a metodologia transversal da VITTA HUB: saúde, mente, nutrição e felicidade conectadas ao movimento, à autonomia e à performance.',
    label: 'M.I.V.A.',
  },
  'consultoria-online': {
    title: 'Seu treino. Sua rotina. Seu acompanhamento.',
    description: 'Consultoria Online M.I.V.A.: treinamento individualizado, acompanhamento e quatro ofertas para diferentes necessidades. Valores sob consulta.',
    label: 'Consultoria Online',
  },
  'e-hub-nutrition': {
    title: 'Nutrição que acompanha o seu movimento.',
    description: 'E-Hub Nutrition: atendimento com Douglas Silva, avaliação, orientação e acompanhamento nutricional integrados ao treinamento.',
    label: 'E-Hub Nutrition',
  },
  'vitta-hub': {
    title: 'VITTA HUB — Assessoria Esportiva Integrada',
    description: 'Conheça a FITNESS PERSONAL • VITTA HUB: estrutura integrada de gestão esportiva que conecta pessoas, profissionais, metodologia e tecnologia.',
    label: 'VITTA HUB',
  },
  equipe: {
    title: 'Por trás de cada experiência, existe uma equipe.',
    description: 'Conheça as lideranças da FITNESS PERSONAL • VITTA HUB e suas responsabilidades na gestão, no atendimento, no treinamento e na nutrição.',
    label: 'Equipe',
  },
} as const;
export type PageSlug = keyof typeof pageMeta;
export const managementFAQ = [
  { question: 'A VITTA HUB fornece apenas professores?', answer: 'A proposta é uma estrutura integrada de gestão esportiva: profissionais, modalidades, programação, metodologia, comunicação e acompanhamento conectados. A composição da operação é definida conforme o projeto do condomínio.' },
  { question: 'Os três Hubs são contratados como empresas separadas?', answer: 'Não. Hub Fitness, Hub Aquático e Hub Esportivo são divisões operacionais do ecossistema B2B da VITTA HUB. A composição do projeto considera os espaços, os públicos e as necessidades do condomínio.' },
  { question: 'Todos os condomínios recebem a mesma programação?', answer: 'O planejamento parte do diagnóstico dos espaços e das necessidades de cada condomínio. Modalidades, horários e composição da equipe são definidos no projeto, sem pressupor uma programação única para todos.' },
  { question: 'Como começa a implantação?', answer: 'O processo começa pelo diagnóstico, seguido de planejamento, implementação, operação, acompanhamento e evolução. A apresentação comercial é o próximo passo para conversar sobre o contexto do condomínio.' },
  { question: 'A operação atende diferentes idades e níveis?', answer: 'O planejamento considera diferentes públicos, como crianças, adultos, pessoas em busca de longevidade ativa e praticantes com objetivos esportivos. A oferta de cada atividade depende do escopo definido para o condomínio.' },
];
export const nutritionFAQ = [
  { question: 'É preciso comprar suplementos para conhecer o atendimento?', answer: 'O ponto de partida do E-Hub Nutrition é a pessoa: avaliação, atendimento, orientação individualizada e acompanhamento. Suplementação e loja são extensões dessa experiência.' },
  { question: 'Quem é a liderança de nutrição?', answer: 'Douglas Silva é o Head de Nutrição Esportiva & Suporte Visual, responsável por consultas, orientação, acompanhamento e curadoria nutricional.' },
  { question: 'Como nutrição e treinamento se conectam?', answer: 'A nutrição integra a metodologia M.I.V.A. e pode compor o acompanhamento do treinamento. As ofertas Performance & Nutri e Executive VIP incluem nutrição, conforme a descrição de cada plano.' },
  { question: 'Onde consultar valores e disponibilidade?', answer: 'Valores e disponibilidade devem ser confirmados com o atendimento. Nenhum preço ou agenda é presumido nesta apresentação.' },
];
export const hubDetails = {
  'hub-fitness': {
    eyebrow: 'Divisão operacional B2B / Hub Fitness',
    lead: 'O espaço ganha vida. O morador ganha experiência.',
    description: 'Treinamento orientado que conecta o uso da academia e das áreas externas à rotina das pessoas, dentro de uma gestão esportiva integrada.',
    introTitle: 'Mais possibilidades para se movimentar.',
    intro: 'Da construção de fundamentos ao desenvolvimento do condicionamento, o Hub Fitness reúne atividades para diferentes necessidades, objetivos e momentos de vida.',
    activities: ['Musculação', 'Treinamento funcional', 'Força e resistência', 'Condicionamento', 'Mobilidade', 'Atividades outdoor', 'Longevidade ativa', 'Treinamento orientado'],
    featureTitle: 'Metodologia que acompanha diferentes objetivos.',
    feature: 'A M.I.V.A. orienta a conexão entre treinamento e acompanhamento. T.A.L. e T.A.R. trabalham focos distintos, respeitando o ponto de partida de cada pessoa.',
    groups: ['Quem está começando ou retomando a rotina', 'Moradores que buscam força e condicionamento', 'Pessoas que priorizam autonomia e longevidade', 'Praticantes com objetivos de desempenho'],
  },
  'hub-aquatico': {
    eyebrow: 'Divisão operacional B2B / Hub Aquático',
    lead: 'A piscina como espaço de movimento e convivência.',
    description: 'Atividades aquáticas conectadas a profissionais, programação e acompanhamento, com propostas que consideram o nível e o momento de cada praticante.',
    introTitle: 'Diferentes relações com a água.',
    intro: 'Natação, hidroginástica e treinamento se integram a uma programação que considera desenvolvimento técnico, condicionamento e bem-estar.',
    activities: ['Natação', 'Hidroginástica', 'Condicionamento', 'Desenvolvimento técnico', 'Treinamento aquático', 'Atividades por nível', 'Bem-estar'],
    featureTitle: 'Programação por nível. Acompanhamento próximo.',
    feature: 'A organização conecta profissionais, horários, comunicação e acompanhamento da experiência. A composição das atividades é planejada conforme os espaços e o projeto do condomínio.',
    groups: ['Crianças', 'Adultos', 'Pessoas em busca de longevidade ativa', 'Praticantes e esportistas'],
  },
  'hub-esportivo': {
    eyebrow: 'Divisão operacional B2B / Hub Esportivo',
    lead: 'O esporte como encontro, desenvolvimento e experiência.',
    description: 'Futebol, atividades e eventos que conectam movimento, interação e convivência nos espaços do condomínio.',
    introTitle: 'A quadra abre espaço para novas experiências.',
    intro: 'Fundamentos, jogos dirigidos e desafios compõem propostas de esporte que consideram diferentes públicos e objetivos dentro da programação do condomínio.',
    activities: ['Futebol', 'Futebol infantil', 'FutCross', 'Fundamentos', 'Desenvolvimento motor', 'Circuitos e desafios', 'Jogos dirigidos', 'Atividades cognitivas', 'Eventos'],
    featureTitle: 'FutCross: Futebol + Movimento + Cognição.',
    feature: 'Uma proposta que combina fundamentos do futebol, movimento e desafios. Percepção, tomada de decisão e interação fazem parte das atividades, sem promessas de resultados padronizados.',
    groups: ['Crianças em experiências de iniciação esportiva', 'Moradores que desejam praticar futebol', 'Participantes de jogos, circuitos e desafios', 'Comunidade em atividades e eventos'],
  },
} as const;
export type HubSlug = keyof typeof hubDetails;
export const seoTitles: Record<PageSlug,string> = {
 'vitta-hub':'VITTA HUB | Assessoria Esportiva Integrada',
 'gestao-esportiva-condominios':'Gestão Esportiva para Condomínios | VITTA HUB',
 'hub-fitness':'Hub Fitness | Treinamento e Academia em Condomínios',
 'hub-aquatico':'Natação e Hidroginástica em Condomínios | VITTA HUB',
 'hub-esportivo':'Atividades Esportivas em Condomínios | Hub Esportivo',
 miva:'M.I.V.A. | Movimento Inteligente para uma Vida Ativa',
 'consultoria-online':'Consultoria de Treino Online | Treinamento Personalizado',
 'e-hub-nutrition':'Nutrição Esportiva e Suplementação | E-Hub Nutrition',
 equipe:'Equipe | FITNESS PERSONAL • VITTA HUB',
};
