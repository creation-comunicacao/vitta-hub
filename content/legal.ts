// Somente textos aprovados devem ser incluídos aqui. Nunca fabricar dados legais.
export type LegalDocument = { approved: boolean; title: string; updatedAt: string; sections: { title: string; paragraphs: string[] }[] };
export const legalDocuments: Record<'privacidade' | 'termos', LegalDocument> = {
  privacidade: { approved: false, title: 'Política de privacidade', updatedAt: '', sections: [] },
  termos: { approved: false, title: 'Termos de uso', updatedAt: '', sections: [] },
};
export function isLegalPublished(document: LegalDocument) {
  return document.approved && /^\d{4}-\d{2}-\d{2}$/.test(document.updatedAt) && document.sections.length > 0 && document.sections.every(s => s.title && s.paragraphs.length && s.paragraphs.every(p => p.trim()));
}
