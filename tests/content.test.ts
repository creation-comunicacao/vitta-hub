import {test} from 'node:test';
import assert from 'node:assert/strict';
import {publishedArticles,normalizeSearch} from '../lib/articles';
import {contactSchema} from '../lib/contact-validation';
import {isLegalPublished,legalDocuments} from '../content/legal';
const fixture={title:'Conteúdo sintético de teste',slug:'teste-local',category:'Gestão Esportiva',status:'published',approved:true,author:{name:'Autor de teste'},publishedAt:'2020-01-01',image:{src:'/hero-700.webp',alt:'Imagem de teste editorial',width:700,height:467},excerpt:'Este conteúdo é somente um fixture local.',blocks:[{type:'heading',level:2,id:'contexto',text:'Contexto'},{type:'paragraph',text:'Texto sintético de teste.'}],cta:{label:'Conhecer gestão',href:'/gestao-esportiva-condominios/'},seo:{title:'Título sintético de teste',description:'Descrição sintética para a verificação local.'}};
test('Somente artigos aprovados, publicados e datados entram no site',()=>{
 assert.equal(publishedArticles([fixture],'2026-10-02').length,1);
 for(const change of [{approved:false},{status:'draft'},{publishedAt:'2099-01-01'},{updatedAt:'2099-01-01'}])assert.equal(publishedArticles([{...fixture,...change}],'2026-10-02').length,0);
});
test('Datas impossíveis, slugs duplicados e links inseguros falham antes do build',()=>{
 assert.throws(()=>publishedArticles([{...fixture,publishedAt:'2026-02-31'}]));
 assert.throws(()=>publishedArticles([fixture,fixture]));
 assert.throws(()=>publishedArticles([{...fixture,cta:{label:'Teste',href:'javascript:alert(1)'}}]));
});
test('Nenhum artigo fictício publicado; política pendente não libera formulário',()=>{
 assert.equal(publishedArticles().length,0);assert.equal(isLegalPublished(legalDocuments.privacidade),false);
});
test('Busca ignora acentos e capitalização',()=>assert.equal(normalizeSearch('  CONDOMÍNIO  '),'condominio'));
test('Validação muda conforme intenção e bloqueia campos inválidos',()=>{
 const valid={name:'Pessoa Teste',city:'Cidade',phone:'11999999999',email:'test@example.test',interest:'nutricao',message:'Solicito informações.',consent:true};
 assert.equal(contactSchema.safeParse(valid).success,true);
 assert.equal(contactSchema.safeParse({...valid,interest:'gestao-esportiva'}).success,false);
 assert.equal(contactSchema.safeParse({...valid,consent:false}).success,false);
 assert.equal(contactSchema.safeParse({...valid,email:'inválido'}).success,false);
});
