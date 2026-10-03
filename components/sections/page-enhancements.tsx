'use client';
import {useEffect} from 'react';
export function PageEnhancements(){useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}}),{threshold:0.08});document.querySelectorAll('.section-heading,.hub-card,.plan-card,.team-card').forEach(e=>{e.classList.add('reveal-ready');observer.observe(e)});return()=>observer.disconnect()},[]);return null}
