'use client';
import {useEffect,useRef,type ReactNode} from 'react';
import '@/components/pages/nutrition.css';

type Product={id:string;name:string;alt:string;src:string};
/** Same native-scroll sequence used by the E-Hub page and Home block 07. */
export function NutritionProductStory({products,heading,id='nutrition-story',home=false}:{products:readonly Product[];heading?:ReactNode;id?:string;home?:boolean}){
 const ref=useRef<HTMLElement>(null);
 useEffect(()=>{
  const host=ref.current;if(!host)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const wide=matchMedia('(min-width: 901px) and (min-height: 650px)');
  let frame=0,near=false;
  function update(){frame=0;if(!near||reduced.matches||!wide.matches)return;const rect=host!.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(100-rect.top)/Math.max(1,rect.height-(innerHeight-100))));host!.style.setProperty('--story-progress',progress.toFixed(4));const active=Math.min(products.length-1,Math.floor(progress*products.length));host!.dataset.active=String(active);host!.querySelectorAll<HTMLElement>('[data-product-index]').forEach((node,index)=>{node.dataset.current=String(index===active);});}
  function schedule(){if(!frame)frame=requestAnimationFrame(update);}
  const preferences=()=>{host.dataset.motion=reduced.matches?'reduced':'ready';schedule();};
  const observer=new IntersectionObserver(([entry])=>{near=entry.isIntersecting;schedule();},{rootMargin:'100px'});
  observer.observe(host);host.dataset.active='0';preferences();
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);reduced.addEventListener('change',preferences);wide.addEventListener('change',preferences);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);reduced.removeEventListener('change',preferences);wide.removeEventListener('change',preferences);delete host.dataset.motion;};
 },[products.length]);
 return <section ref={ref} className={`nutrition-story${home?' home-nutrition-story':''}`} id={id} aria-label={home?'07 / E-Hub Nutrition':'Destaques dos suplementos'}>
  <div className="nutrition-story-sticky"><div className="container nutrition-story-inner">
   <div className="nutrition-story-heading">{heading||<><span className="eyebrow">E-Hub Nutrition</span><h2>Conhecer produtos</h2></>}<div className="nutrition-story-progress" aria-hidden="true"><span/></div></div>
   <div className="nutrition-story-scenes">{products.map((product,index)=><article key={product.id} className="nutrition-story-scene" data-product-index={index} data-current={index===0}>
    <div className="nutrition-story-art"><span className="nutrition-story-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><img src={product.src} alt={product.alt} width="600" height="600" loading="lazy"/></div>
    <div className="nutrition-story-label"><span aria-hidden="true">{String(index+1).padStart(2,'0')} / {String(products.length).padStart(2,'0')}</span><h3>{product.name}</h3></div>
   </article>)}</div>
  </div></div>
 </section>;
}
