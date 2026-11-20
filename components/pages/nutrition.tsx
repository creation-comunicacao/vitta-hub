import {ArrowDown, ArrowUpRight} from 'lucide-react';
import {Breadcrumb} from './shared';
import {StoreCTA} from '@/components/launch/visuals';
import {NutritionExperience} from '@/components/nutrition/experience';
import {NutritionProductStage} from '@/components/nutrition/product-stage';
import {siteConfig} from '@/config/site';
import './nutrition.css';

const products = [
 {id:'whey',name:'Hiper 100% Whey',alt:'Embalagem original Hiper 100% Whey Probiótica'},
 {id:'epic',name:'Pre Workout Epic',alt:'Embalagem original Pre Workout Epic Probiótica'},
 {id:'creatina',name:'Creatina',alt:'Embalagem original Creatina Probiótica'},
] as const;
const productSource = (id:string) => `/products/probiotica-${id}-transparent.webp`;

export function NutritionPage(){return <NutritionExperience>
 <section className="nutrition-intro" aria-labelledby="nutrition-title">
  <div className="container"><Breadcrumb slug="e-hub-nutrition"/>
   <div className="nutrition-hero">
    <div className="nutrition-copy">
     <span className="eyebrow nutrition-enter">E-Hub Nutrition | Loja de Suplementos</span>
     <h1 className="nutrition-enter" id="nutrition-title">E-Hub Nutrition</h1>
     <h2 className="nutrition-enter">Sua evolução merece <span>o melhor da suplementação.</span></h2>
     <div className="actions nutrition-enter"><a className="button" href="#suplementos">Explorar suplementos <ArrowDown size={17}/></a><a className="nutrition-text-link" href="/contato/">Entre em contato <ArrowUpRight size={17}/></a></div>
    </div>
    <NutritionProductStage products={products}/>
   </div>
   <a className="nutrition-scroll-cue" href="#nutrition-story"><span>Conhecer produtos</span><ArrowDown size={15}/><span className="nutrition-cue-line" aria-hidden="true"/></a>
  </div>
 </section>
 <section className="nutrition-story" id="nutrition-story" aria-label="Destaques dos suplementos">
  <div className="nutrition-story-sticky">
   <div className="container nutrition-story-inner">
    <div className="nutrition-story-heading"><span className="eyebrow">E-Hub Nutrition</span><h2>Conhecer produtos</h2><div className="nutrition-story-progress" aria-hidden="true"><span/></div></div>
    <div className="nutrition-story-scenes">
     {products.map((product,index)=><article key={product.id} className="nutrition-story-scene" data-product-index={index}>
      <div className="nutrition-story-art"><span className="nutrition-story-number" aria-hidden="true">0{index+1}</span><img src={productSource(product.id)} alt={product.alt} width="600" height="600" loading="lazy"/></div>
      <div className="nutrition-story-label"><span aria-hidden="true">0{index+1} / 03</span><h3>{product.name}</h3></div>
     </article>)}
    </div>
   </div>
  </div>
 </section>
 <section className="nutrition-catalog container" id="suplementos" aria-labelledby="nutrition-catalog-title">
  <div className="nutrition-catalog-heading" data-nutrition-reveal><span className="eyebrow">Loja de Suplementos</span><h2 id="nutrition-catalog-title">Explorar suplementos</h2><p className="page-lead">Conheça nossa seleção de produtos Probiótica: Whey Protein, Creatina, linha Epic, coqueteleiras e muito mais.</p></div>
  <div className="nutrition-product-grid">{products.map((product,index)=><article key={product.id} className="nutrition-product-card" data-nutrition-reveal>
   <div className="nutrition-card-art"><span className="nutrition-card-index" aria-hidden="true">0{index+1}</span><img src={productSource(product.id)} alt={product.alt} width="600" height="600" loading="lazy" decoding="async"/></div>
   <div className="nutrition-card-copy"><h3>{product.name}</h3><a href={siteConfig.storeUrl||'/contato/?interesse=suplementacao'} data-channel={siteConfig.storeUrl?'store':undefined} aria-label={`${siteConfig.storeUrl?'Acessar loja de suplementos':'Entre em contato'} — ${product.name}`}>{siteConfig.storeUrl?'Acessar loja de suplementos':'Entre em contato'}<ArrowUpRight size={20}/></a></div>
  </article>)}</div>
  <div className="nutrition-conversion" data-nutrition-reveal><span className="nutrition-conversion-brand">E-Hub Nutrition</span><div className="actions"><StoreCTA/><a className="button secondary" href="/contato/">Entre em contato <ArrowUpRight size={18}/></a></div></div>
 </section>
 </NutritionExperience>;}
