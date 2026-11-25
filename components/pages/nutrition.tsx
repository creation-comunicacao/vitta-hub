import {ArrowDown, ArrowUpRight} from 'lucide-react';
import {Breadcrumb} from './shared';
import {StoreCTA} from '@/components/launch/visuals';
import {NutritionExperience} from '@/components/nutrition/experience';
import {NutritionProductStage} from '@/components/nutrition/product-stage';
import {siteConfig, whatsappHref} from '@/config/site';
import {NutritionProductStory} from '@/components/nutrition/product-story';
import {nutritionProducts} from '@/content/nutrition-products';
import './nutrition.css';

const products=nutritionProducts;
const productSource=(id:string)=>nutritionProducts.find(product=>product.id===id)!.src;

export function NutritionPage(){return <NutritionExperience>
 <section className="nutrition-intro" aria-labelledby="nutrition-title">
  <div className="container"><Breadcrumb slug="e-hub-nutrition"/>
   <div className="nutrition-hero">
    <div className="nutrition-copy">
     <span className="eyebrow nutrition-enter">E-Hub Nutrition | Loja de Suplementos</span>
     <h1 className="nutrition-enter" id="nutrition-title">E-Hub Nutrition</h1>
     <h2 className="nutrition-enter">Sua evolução merece <span>o melhor da suplementação.</span></h2>
     <div className="actions nutrition-enter"><StoreCTA/><a className="nutrition-text-link" href={whatsappHref('nutricao')} data-channel="whatsapp">TIRAR DÚVIDAS PELO WHATSAPP <ArrowUpRight size={17}/></a></div>
    </div>
    <NutritionProductStage products={products}/>
   </div>
   <a className="nutrition-scroll-cue" href="#nutrition-story"><span>Conhecer produtos</span><ArrowDown size={15}/><span className="nutrition-cue-line" aria-hidden="true"/></a>
  </div>
 </section>
 <NutritionProductStory products={nutritionProducts}/>
 <section className="nutrition-catalog container" id="suplementos" aria-labelledby="nutrition-catalog-title">
  <div className="nutrition-catalog-heading" data-nutrition-reveal><span className="eyebrow">Loja de Suplementos</span><h2 id="nutrition-catalog-title">Explorar suplementos</h2><p className="page-lead">Conheça nossa seleção de produtos Probiótica: Whey Protein, Creatina, linha Epic, coqueteleiras e muito mais.</p></div>
  <div className="nutrition-product-grid">{products.map((product,index)=><article key={product.id} className="nutrition-product-card" data-nutrition-reveal>
   <div className="nutrition-card-art"><span className="nutrition-card-index" aria-hidden="true">0{index+1}</span><img src={productSource(product.id)} alt={product.alt} width="600" height="600" loading="lazy" decoding="async"/></div>
   <div className="nutrition-card-copy"><h3>{product.name}</h3><a href={siteConfig.storeUrl||'/contato/?interesse=suplementacao'} target="_blank" rel="noopener noreferrer" data-channel={siteConfig.storeUrl?'store':undefined} aria-label={`${siteConfig.storeUrl?'Acessar loja de suplementos':'Entre em contato'} — ${product.name} (abre em nova aba)`}>{siteConfig.storeUrl?'Acessar loja de suplementos':'Entre em contato'}<ArrowUpRight size={20}/></a></div>
  </article>)}</div>
  <div className="nutrition-conversion" data-nutrition-reveal><span className="nutrition-conversion-brand">E-Hub Nutrition</span><div className="actions"><StoreCTA/><a className="button secondary" href={whatsappHref('nutricao')} data-channel="whatsapp">TIRAR DÚVIDAS PELO WHATSAPP <ArrowUpRight size={18}/></a></div></div>
 </section>
 </NutritionExperience>;}
