import {z} from 'zod';
export const editorialCategories=['Gestão Esportiva','Condomínios','Treinamento','Esporte','Saúde & Bem-Estar','Nutrição'] as const;
const relative=z.string().regex(/^\/(?!\/)[a-zA-Z0-9/_.,-]+$/);
const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>!Number.isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v);
export const articleSchema=z.object({
 title:z.string().min(5),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),category:z.enum(editorialCategories),
 status:z.enum(['draft','published']),approved:z.boolean(),featured:z.boolean().default(false),
 author:z.object({name:z.string().min(2),role:z.string().optional()}),publishedAt:date,updatedAt:date.optional(),
 image:z.object({src:relative,alt:z.string().min(5),width:z.number().positive(),height:z.number().positive()}),
 excerpt:z.string().min(20),
 blocks:z.array(z.discriminatedUnion('type',[
  z.object({type:z.literal('paragraph'),text:z.string().min(1)}),
  z.object({type:z.literal('heading'),level:z.union([z.literal(2),z.literal(3)]),text:z.string().min(1),id:z.string().regex(/^[a-z0-9-]+$/)}),
  z.object({type:z.literal('list'),items:z.array(z.string().min(1)).min(1)}),
  z.object({type:z.literal('link'),label:z.string().min(1),href:relative}),
 ])).min(1),
 related:z.array(z.string()).default([]),cta:z.object({label:z.string(),href:relative}),
 faq:z.array(z.object({question:z.string(),answer:z.string()})).default([]),
 seo:z.object({title:z.string().min(5),description:z.string().min(20),canonical:relative.optional()}),
}).superRefine((article,ctx)=>{
 if(article.updatedAt&&article.updatedAt<article.publishedAt)ctx.addIssue({code:'custom',message:'Atualização anterior à publicação.'});
 let previous=1;const ids=new Set<string>();
 for(const block of article.blocks)if(block.type==='heading'){
  if(block.level>previous+1||ids.has(block.id))ctx.addIssue({code:'custom',message:'Revise a hierarquia ou IDs dos headings.'});
  ids.add(block.id);previous=block.level;
 }
});
export type Article=z.infer<typeof articleSchema>;
// Nenhum texto foi publicado ou atribuído a profissionais sem revisão editorial.
export const articles:Article[]=[];
export const editorialTopics=[
 {title:'Gestão esportiva para condomínios',category:'Gestão Esportiva'},
 {title:'Gestão esportiva e contratação isolada',category:'Gestão Esportiva'},
 {title:'Organização de atividades esportivas',category:'Condomínios'},
 {title:'Melhor utilização das áreas do condomínio',category:'Condomínios'},
 {title:'Atividades físicas para condomínios',category:'Condomínios'},
 {title:'Prescrição além da planilha',category:'Treinamento'},
 {title:'Funcional em condomínio',category:'Treinamento'},
 {title:'Futebol infantil',category:'Esporte'},
 {title:'FutCross',category:'Esporte'},
 {title:'Longevidade ativa',category:'Saúde & Bem-Estar'},
 {title:'Movimento no dia a dia',category:'Saúde & Bem-Estar'},
 {title:'Creatina',category:'Nutrição'},
] as const;
