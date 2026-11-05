const officialUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fitnesspersonal.com.br';
if (officialUrl && (!/^https:\/\/[^/]+$/.test(officialUrl) || new URL(officialUrl).username || new URL(officialUrl).password)) throw new Error('NEXT_PUBLIC_SITE_URL deve ser uma origem HTTPS oficial, sem barra final.');
export const siteConfig = {
  name: 'FITNESS PERSONAL • VITTA HUB • ASSESSORIA ESPORTIVA',
  url: officialUrl,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '551141465843', email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'vittahub@fitnesspersonal.com.br', instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '', storeUrl: process.env.NEXT_PUBLIC_STORE_URL || '',
  indexable: process.env.SITE_INDEXABLE === 'true' && process.env.VERCEL_ENV !== 'preview' && process.env.VERCEL_ENV !== 'development',
};
export const navigation = [
  ['VITTA HUB', '/vitta-hub/'], ['M.I.V.A.', '/miva/'], ['Consultoria', '/consultoria-online/'],
  ['E-Hub', '/e-hub-nutrition/'], ['Conteúdos', '/conteudos/'], ['Equipe', '/equipe/'],
] as const;
export const hubs = [
  { name: 'Hub Fitness', path: '/hub-fitness/', text: 'Treinamento, força, funcional, condicionamento e movimento.', space: 'Academia & áreas externas', icon: 'fitness' },
  { name: 'Hub Aquático', path: '/hub-aquatico/', text: 'Natação, hidroginástica, condicionamento e bem-estar.', space: 'Piscina', icon: 'water' },
  { name: 'Hub Esportivo', path: '/hub-esportivo/', text: 'Futebol, desenvolvimento, experiências e eventos.', space: 'Quadra & espaços de convivência', icon: 'sport' },
];
export const presentationHref = '/contato/?interesse=gestao-esportiva';
export const messages = {
  gestao: 'Olá! Gostaria de conhecer a proposta de gestão esportiva da FITNESS PERSONAL • VITTA HUB para o meu condomínio.',
  consultoria: 'Olá! Gostaria de receber informações sobre os programas de Consultoria Online e a metodologia M.I.V.A.',
  nutricao: 'Olá! Gostaria de saber mais sobre os serviços de nutrição e suplementação da VITTA HUB.',
  geral: 'Olá! Gostaria de conhecer melhor os serviços da FITNESS PERSONAL • VITTA HUB.',
};
export function whatsappKind(path: string, interest?: string | null): keyof typeof messages {
  if (interest === 'outro') return 'geral';
  if (interest === 'consultoria' || path.includes('consultoria-online')) return 'consultoria';
  if (interest === 'nutricao' || interest === 'suplementacao' || path.includes('e-hub-nutrition')) return 'nutricao';
  if (interest === 'gestao-esportiva' || interest?.startsWith('hub-') || path === '/' || /\/(?:gestao-esportiva-condominios|hub-fitness|hub-aquatico|hub-esportivo)\/?$/.test(path)) return 'gestao';
  return 'geral';
}
export function whatsappHref(kind: keyof typeof messages = 'geral') {
  return siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(messages[kind])}` : `/contato/?canal=whatsapp&interesse=${kind==='gestao'?'gestao-esportiva':kind==='nutricao'?'nutricao':kind==='consultoria'?'consultoria':'outro'}`;
}
