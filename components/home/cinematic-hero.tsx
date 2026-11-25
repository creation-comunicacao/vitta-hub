'use client';

import {useEffect, useRef, useState} from 'react';
import {ArrowDown, ArrowUpRight, Pause, Play} from 'lucide-react';
import {presentationHref} from '@/config/site';

/** A single, edited film: no simultaneous downloads or competing video players. */
export function CinematicHero(){
 const host=useRef<HTMLElement>(null);
 const film=useRef<HTMLVideoElement>(null);
 const progress=useRef<HTMLSpanElement>(null);
 const syncPlayback=useRef<()=>void>(()=>{});
 const userPaused=useRef(false);
 const [playing,setPlaying]=useState(false);
 const [ready,setReady]=useState(false);
 const [available,setAvailable]=useState(false);
 useEffect(()=>{
  const video=film.current,section=host.current;
  if(!video||!section)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
  let visible=true,disposed=false,failed=false;
  const sync=()=>{
   const allowed=!reduced.matches&&!connection?.saveData&&!failed;
   setAvailable(allowed);
   if(!allowed){video.pause();setReady(false);return;}
   if(!video.getAttribute('src'))video.src=innerWidth<=760?'/media/home/hero-film-mobile.mp4':'/media/home/hero-film-desktop.mp4';
   if(visible&&!document.hidden&&!userPaused.current){void video.play().catch(()=>{if(!disposed)setPlaying(false);});}
   else video.pause();
  };
  syncPlayback.current=sync;
  const onPlaying=()=>{setPlaying(true);setReady(true);};
  const onPause=()=>setPlaying(false);
  const onError=()=>{failed=true;setReady(false);setAvailable(false);};
  const onTime=()=>{if(progress.current&&video.duration)progress.current.style.transform=`scaleX(${video.currentTime/video.duration})`;};
  video.addEventListener('playing',onPlaying);video.addEventListener('pause',onPause);video.addEventListener('error',onError);video.addEventListener('timeupdate',onTime);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.12});
  observer.observe(section);reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
  return()=>{disposed=true;observer.disconnect();reduced.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);video.removeEventListener('playing',onPlaying);video.removeEventListener('pause',onPause);video.removeEventListener('error',onError);video.removeEventListener('timeupdate',onTime);video.pause();syncPlayback.current=()=>{};};
 },[]);
 function toggle(){userPaused.current=playing;syncPlayback.current();}
 return <section ref={host} className="hero institutional-hero cinematic-hero" aria-labelledby="home-hero-title">
  <div className="container hero-grid">
   <div className="hero-copy">
    <div className="eyebrow"><span className="line"/>Assessoria esportiva integrada · Condomínios</div>
    <h1 id="home-hero-title">Gestão Esportiva Integrada para uma <em>Vida em Movimento</em></h1>
    <p>Estruturamos, conectamos e gerimos experiências de saúde, esporte e bem-estar para condomínios e pessoas.</p>
    <div className="actions"><a className="button" href={presentationHref}>Solicitar apresentação <ArrowUpRight size={17}/></a><a className="button secondary" href="/vitta-hub/">Conhecer a VITTA HUB</a></div>
   </div>
   <div className="hero-context"><div className="hero-visual"><div className="hero-camera">
    <img className="hero-image" src="/hero-1200.webp" srcSet="/hero-700.webp 700w, /hero-1200.webp 1200w" sizes="100vw" width="1200" height="800" fetchPriority="high" alt="Grupo de adultos em atividade orientada em área comum de um condomínio."/>
    <video ref={film} className="hero-film" data-ready={ready} muted loop playsInline preload="none" aria-hidden="true"/>
   </div><div className="home-hero-light" aria-hidden="true"/></div></div>
   <div className="hero-film-tools">
    <a className="hero-explore" href="#home-hero-details" aria-label="Explorar a estrutura VITTA HUB"><ArrowDown size={16}/><span>GESTÃO QUE CONECTA TODA A OPERAÇÃO</span></a>
    {available&&<button className="hero-film-toggle" onClick={toggle} aria-label={playing?'Pausar vídeo de apresentação':'Reproduzir vídeo de apresentação'}>{playing?<Pause size={15}/>:<Play size={15}/>}<span>{playing?'Pausar':'Reproduzir'}</span></button>}
   </div>
   <div className="hero-film-progress" aria-hidden="true"><span ref={progress}/></div>
  </div>
  <div className="hero-details container" id="home-hero-details">
   <div className="hero-note"><span className="hero-note-line"/><span>Para síndicos, administradoras e gestores.<br/><strong>Uma estrutura que conecta espaços e pessoas.</strong></span></div>
   <div className="hero-details-caption"><span>O ESPAÇO GANHA VIDA.</span><strong>O morador ganha experiência.</strong><small>Condomínio + pessoas + movimento</small></div>
   <div className="hero-details-operation"><span className="eyebrow">Por trás de cada experiência</span><div><span>Gestão</span><span>Profissionais</span><span>Programação</span><span>Acompanhamento</span></div></div>
  </div>
  <div className="hero-bottom container"><div><a href="/hub-fitness/">Hub Fitness</a><a href="/hub-aquatico/">Hub Aquático</a><a href="/hub-esportivo/">Hub Esportivo</a></div><a className="text-link" href="/gestao-esportiva-condominios/">Conhecer a gestão ↗</a></div>
 </section>;
}
