export const interests = [
  { value: 'gestao-esportiva', label: 'Gestão Esportiva' },
  { value: 'hub-fitness', label: 'Hub Fitness' },
  { value: 'hub-aquatico', label: 'Hub Aquático' },
  { value: 'hub-esportivo', label: 'Hub Esportivo' },
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'nutricao', label: 'Nutrição' },
  { value: 'suplementacao', label: 'Suplementação' },
  { value: 'outro', label: 'Outro' },
] as const;
export type Interest = typeof interests[number]['value'];
export const planNames = ['Essencial', 'Performance & Nutri', 'Híbrido Start', 'Executive VIP'] as const;
export function isInterest(value: unknown): value is Interest { return interests.some(i => i.value === value); }
export function isB2B(value: string) { return value === 'gestao-esportiva' || value.startsWith('hub-'); }
export const interestContext: Record<Interest, { title: string; text: string; href: string }> = {
  'gestao-esportiva': { title: 'O próximo movimento do seu condomínio.', text: 'Conte sobre os espaços e a rotina do condomínio para conversar sobre a gestão integrada.', href: '/gestao-esportiva-condominios/' },
  'hub-fitness': { title: 'Treinamento dentro de uma gestão integrada.', text: 'Converse sobre a academia e as atividades do seu condomínio.', href: '/hub-fitness/' },
  'hub-aquatico': { title: 'Movimento e bem-estar na piscina.', text: 'Conte sobre o contexto do condomínio e sua programação aquática.', href: '/hub-aquatico/' },
  'hub-esportivo': { title: 'Esporte que conecta os moradores.', text: 'Converse sobre atividades esportivas e experiências para o condomínio.', href: '/hub-esportivo/' },
  consultoria: { title: 'Seu treino começa pela sua rotina.', text: 'Conte o que procura na consultoria. Evite incluir dados de saúde neste primeiro contato.', href: '/consultoria-online/' },
  nutricao: { title: 'Nutrição começa pela pessoa.', text: 'Solicite informações sobre atendimento e disponibilidade. Deixe informações de saúde para a consulta.', href: '/e-hub-nutrition/' },
  suplementacao: { title: 'Orientação antes da escolha.', text: 'Conheça o E-Hub e o acesso à loja. O formulário também pode direcionar sua dúvida.', href: '/e-hub-nutrition/' },
  outro: { title: 'Encontre a conexão certa.', text: 'Conte brevemente como podemos ajudar.', href: '/vitta-hub/' },
};
