'use client';

import {useEffect,useRef,type ReactNode} from 'react';

/** CSS owns floating; this scheduler only runs while input is changing. */
export function NutritionExperience({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const host=root.current;
  if(!host)return;
  const hero=host.querySelector<HTMLElement>('.nutrition-intro')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const pointer=matchMedia('(hover: hover) and (pointer: fine)');
  let frame=0,targetX=0,targetY=0,x=0,y=0,heroVisible=true;
  const reset=()=>{targetX=0;targetY=0;schedule();};
  function update(){
   frame=0;
   if(reduced.matches||document.hidden)return;
   x+=(targetX-x)*.09;y+=(targetY-y)*.09;
   if(Math.abs(targetX-x)<.001)x=targetX;
   if(Math.abs(targetY-y)<.001)y=targetY;
   hero.style.setProperty('--pointer-x',x.toFixed(4));hero.style.setProperty('--pointer-y',y.toFixed(4));
   if(heroVisible){const box=hero.getBoundingClientRect();hero.style.setProperty('--hero-progress',Math.max(0,Math.min(1,-box.top/box.height)).toFixed(4));}
   if(heroVisible&&(x!==targetX||y!==targetY))frame=requestAnimationFrame(update);
  }
  function schedule(){if(!frame&&!reduced.matches&&!document.hidden)frame=requestAnimationFrame(update);}
  const move=(event:PointerEvent)=>{if(hero.dataset.dragging==='true'){reset();return;}if(!pointer.matches||reduced.matches||event.pointerType!=='mouse')return;const box=hero.getBoundingClientRect();targetX=(event.clientX-box.left)/box.width-.5;targetY=(event.clientY-box.top)/box.height-.5;schedule();};
  const preferences=()=>{
   x=0;y=0;targetX=0;targetY=0;
   hero.style.removeProperty('--pointer-x');hero.style.removeProperty('--pointer-y');hero.style.removeProperty('--hero-progress');
   if(reduced.matches){cancelAnimationFrame(frame);frame=0;host.dataset.motion='reduced';}
   else{host.dataset.motion='ready';schedule();}
  };
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.target===hero){heroVisible=entry.isIntersecting;hero.dataset.visible=String(heroVisible);if(!heroVisible){targetX=0;targetY=0;}}
    else if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}
   }
   schedule();
  },{threshold:0,rootMargin:'40px'});
  observer.observe(hero);
  host.querySelectorAll('[data-nutrition-reveal]').forEach(element=>observer.observe(element));
  preferences();
  hero.addEventListener('pointermove',move,{passive:true});hero.addEventListener('pointerleave',reset);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  reduced.addEventListener('change',preferences);pointer.addEventListener('change',preferences);
  const visibility=()=>{hero.dataset.visible=String(!document.hidden&&heroVisible);if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();};
  document.addEventListener('visibilitychange',visibility);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',reset);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);reduced.removeEventListener('change',preferences);pointer.removeEventListener('change',preferences);document.removeEventListener('visibilitychange',visibility);delete host.dataset.motion;};
 },[]);
 return <div className="nutrition-lp" ref={root}>{children}</div>;
}
