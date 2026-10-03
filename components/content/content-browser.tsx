'use client';
import {useEffect,useState} from 'react';
import {Input} from '@/components/ui/input';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import {editorialCategories,editorialTopics,type Article} from '@/content/articles';
import {normalizeSearch} from '@/lib/articles';
import {ArticleCard} from './article-card';
export function ContentBrowser({articles}:{articles:Article[]}){
 const [query,setQuery]=useState('');const [category,setCategory]=useState('todos');
 // URL só existe após a hidratação do HTML estático; sincronização inicial intencional.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{const value=new URLSearchParams(location.search).get('categoria');if(value&&(editorialCategories as readonly string[]).includes(value))setCategory(value);},[]);
 const match=(item:{title:string;category:string},extra='')=>(category==='todos'||category===item.category)&&normalizeSearch(`${item.title} ${extra}`).includes(normalizeSearch(query));
 const results=articles.filter(a=>match(a,a.excerpt));const topics=editorialTopics.filter(t=>match(t));
 return <><div className="content-controls"><div className="form-field"><label htmlFor="content-search">Buscar por assunto</label><Input id="content-search" type="search" placeholder="Ex.: condomínio, treino, nutrição" value={query} onChange={e=>setQuery(e.target.value)} maxLength={120}/></div><div className="form-field"><label htmlFor="category">Categoria</label><Select value={category} onValueChange={setCategory}><SelectTrigger id="category"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="todos">Todas as categorias</SelectItem>{editorialCategories.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>{(query||category!=='todos')&&<button className="text-link" onClick={()=>{setQuery('');setCategory('todos')}}>Limpar filtros</button>}</div>
 <div className="content-result" role="status" aria-live="polite">{results.length} {results.length===1?'conteúdo publicado encontrado':'conteúdos publicados encontrados'}.</div>
 {results.length?<div className="articles-grid">{results.map(article=><ArticleCard key={article.slug} article={article}/>)}</div>:<div className="editorial-empty"><span className="eyebrow">Conhecimento em movimento</span><h2>{articles.length?'Nenhum conteúdo corresponde à busca.':'Os primeiros conteúdos estão em preparação.'}</h2><p>{articles.length?'Experimente outro assunto ou limpe os filtros.':'Em breve, reflexões sobre gestão, esporte, treinamento e bem-estar. Enquanto isso, conheça como a VITTA HUB conecta essas frentes.'}</p><a className="button secondary" href="/gestao-esportiva-condominios/">Conhecer a Gestão Esportiva</a></div>}
 {!articles.length&&<section className="editorial-topics"><span className="eyebrow">Assuntos previstos</span><h2>O que vem por aqui.</h2><p>Temas em preparação. Os artigos serão disponibilizados após revisão.</p><ul>{topics.map(topic=><li key={topic.title}><span>{topic.category}</span><h3>{topic.title}</h3><small>Em preparação</small></li>)}</ul>{!topics.length&&<p>Nenhum tema previsto corresponde aos filtros selecionados.</p>}</section>}</>;
}
