const officialUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
if (officialUrl && (!/^https:\/\/[^/]+$/.test(officialUrl) || new URL(officialUrl).username || new URL(officialUrl).password)) throw new Error('NEXT_PUBLIC_SITE_URL deve ser uma origem HTTPS oficial, sem barra final.');
export const siteConfig = {
  name: 'FITNESS PERSONAL • VITTA HUB • ASSESSORIA ESPORTIVA',
  url: officialUrl,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '', email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '', instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '', storeUrl: process.env.NEXT_PUBLIC_STORE_URL || '',
  indexable: process.env.SITE_INDEXABLE === 'true' && !!officialUrl,
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
export const messages = { gestao: 'Olá, gostaria de conhecer a proposta de Gestão Esportiva da VITTA HUB para meu condomínio.', consultoria: 'Olá, gostaria de saber mais sobre a Consultoria Online M.I.V.A.', nutricao: 'Olá, gostaria de informações sobre o atendimento nutricional.' };
export function whatsappHref(kind: keyof typeof messages = 'gestao') {
  return siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(messages[kind])}` : `/contato/?canal=whatsapp&interesse=${kind==='gestao'?'gestao-esportiva':kind==='nutricao'?'nutricao':'consultoria'}`;
}
