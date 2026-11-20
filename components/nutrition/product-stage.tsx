'use client';

import {useRef,useState,type PointerEvent,type KeyboardEvent} from 'react';
import {ArrowLeft,ArrowRight,MoveHorizontal} from 'lucide-react';

type Product={id:string;name:string;alt:string};
const positions=['left','right','center'] as const;
export function NutritionProductStage({products}:{products:readonly Product[]}){
 const [rotation,setRotation]=useState(0);
 const [announcement,setAnnouncement]=useState('');
 const stage=useRef<HTMLDivElement>(null);
 const gesture=useRef<{id:number;x:number;y:number;dx:number;axis:'pending'|'x'|'y'}|null>(null);
 const rotate=(direction:number)=>{
  const next=(rotation+direction+products.length)%products.length;
  setRotation(next);
  const featured=products.find((_,index)=>positions[(index+next)%positions.length]==='center');
  setAnnouncement(`Produto em destaque: ${featured?.name}.`);
 };
 const clear=()=>{
  const node=stage.current;
  if(node){node.style.setProperty('--drag-x','0px');delete node.dataset.dragging;const hero=node.closest<HTMLElement>('.nutrition-intro');if(hero)delete hero.dataset.dragging;}
  gesture.current=null;
 };
 const down=(event:PointerEvent<HTMLDivElement>)=>{
  if(!event.isPrimary||event.button!==0)return;
  gesture.current={id:event.pointerId,x:event.clientX,y:event.clientY,dx:0,axis:'pending'};
  event.currentTarget.setPointerCapture(event.pointerId);
 };
 const move=(event:PointerEvent<HTMLDivElement>)=>{
  const active=gesture.current;if(!active||active.id!==event.pointerId)return;
  const dx=event.clientX-active.x,dy=event.clientY-active.y;
  if(active.axis==='pending'&&Math.max(Math.abs(dx),Math.abs(dy))>8)active.axis=Math.abs(dx)>Math.abs(dy)*1.2?'x':'y';
  if(active.axis!=='x')return;
  active.dx=dx;event.currentTarget.dataset.dragging='true';
  const hero=event.currentTarget.closest<HTMLElement>('.nutrition-intro');if(hero)hero.dataset.dragging='true';
  event.currentTarget.style.setProperty('--drag-x',`${Math.max(-45,Math.min(45,dx*.18))}px`);
 };
 const up=(event:PointerEvent<HTMLDivElement>)=>{
  const active=gesture.current;if(!active||active.id!==event.pointerId)return;
  if(active.axis==='x'&&Math.abs(active.dx)>=45)rotate(active.dx<0?1:-1);
  clear();if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
 };
 const key=(event:KeyboardEvent<HTMLDivElement>)=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();rotate(event.key==='ArrowRight'?1:-1);}
 };
 return <>
  <div ref={stage} className="nutrition-showcase nutrition-draggable" role="group" aria-roledescription="carrossel" aria-label="Produtos Probiótica. Arraste para os lados ou use as setas do teclado para trocar o produto em destaque." tabIndex={0} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={clear} onLostPointerCapture={clear} onKeyDown={key}>
   <div className="nutrition-orbit orbit-one" aria-hidden="true"/><div className="nutrition-orbit orbit-two" aria-hidden="true"/><div className="nutrition-stage-shadow" aria-hidden="true"/>
   {products.map((product,index)=><div key={product.id} className={`nutrition-actor actor-${product.id}`} data-position={positions[(index+rotation)%positions.length]}><div className="nutrition-parallax"><div className="nutrition-float"><img src={`/products/probiotica-${product.id}-transparent.webp`} width="600" height="600" alt={product.alt} draggable={false} loading="eager" fetchPriority={product.id==='creatina'?'high':undefined} decoding="async"/></div></div></div>)}
  </div>
  <div className="nutrition-stage-controls" role="group" aria-label="Trocar produto em destaque"><span className="nutrition-drag-hint"><MoveHorizontal size={15}/>Arraste para trocar</span><button type="button" aria-label="Produto anterior" onClick={()=>rotate(-1)}><ArrowLeft size={18}/></button><button type="button" aria-label="Próximo produto" onClick={()=>rotate(1)}><ArrowRight size={18}/></button></div>
  <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
 </>;
}
