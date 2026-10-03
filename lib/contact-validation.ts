import { z } from 'zod';
import { isB2B, isInterest, planNames } from '../config/contact';
const short = z.string().trim().max(120, 'Use até 120 caracteres.');
export const contactSchema = z.object({
  name: short.min(2, 'Informe seu nome.'),
  company: short.default(''), role: short.default(''),
  city: short.min(2, 'Informe sua cidade.'),
  phone: z.string().trim().max(25).refine(v => /^\+?[\d\s().-]+$/.test(v) && v.replace(/\D/g, '').length >= 10 && v.replace(/\D/g, '').length <= 15, 'Informe um WhatsApp com DDD.'),
  email: z.string().trim().max(254).email('Informe um e-mail válido.'),
  interest: z.string().refine(isInterest, 'Selecione um interesse.'),
  plan: z.union([z.enum(planNames), z.literal('')]).default(''),
  message: z.string().trim().min(10, 'Escreva uma mensagem com pelo menos 10 caracteres.').max(2000, 'Use até 2.000 caracteres.'),
  consent: z.boolean().refine(v => v, 'Confirme a leitura da política e a finalidade do contato.'),
  website: z.string().max(200).default(''),
  token: z.string().max(400).default(''),
  source: z.string().max(180).default('/contato/'),
}).superRefine((data,ctx) => {
  if (isB2B(data.interest)) {
    if (data.company.length < 2) ctx.addIssue({code:'custom',path:['company'],message:'Informe o condomínio ou a empresa.'});
    if (data.role.length < 2) ctx.addIssue({code:'custom',path:['role'],message:'Informe seu cargo ou relação com o condomínio.'});
  }
});
export type ContactInput = z.infer<typeof contactSchema>;
export function fieldErrors(error: z.ZodError): Record<string,string> {
  return Object.fromEntries(Object.entries(error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0] || 'Confira este campo.']));
}
export function safeSource(value: string) {
  const known = /^\/(?:|vitta-hub\/?|gestao-esportiva-condominios\/?|hub-(?:fitness|aquatico|esportivo)\/?|miva\/?|consultoria-online\/?|e-hub-nutrition\/?|equipe\/?|conteudos\/?|contato\/?)$/;
  return known.test(value) ? value : '/contato/';
}
