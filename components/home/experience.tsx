'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** One event-driven scheduler for the entire Home; no perpetual animation loop. */
export function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = matchMedia('(min-width: 901px) and (pointer: fine)');
    const sections = [...host.querySelectorAll<HTMLElement>('[data-home-scene], .home-chapter, .final-cta')];
    const opening = host.querySelector<HTMLElement>('.home-opening');
    let introTimer: ReturnType<typeof setTimeout>;
    const finishIntro = () => {
      if (opening) opening.dataset.intro = 'done';
      clearTimeout(introTimer);
    };
    const introEnd = (event: AnimationEvent) => {
      if (event.animationName === 'vitta-intro-secondary') finishIntro();
    };
    const introKey = (event: KeyboardEvent) => {
      if (['Tab', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) finishIntro();
    };
    if (reduced.matches || window.scrollY > 8 || location.hash) finishIntro();
    else introTimer = setTimeout(finishIntro, 2700);
    opening?.addEventListener('animationend', introEnd);
    opening?.addEventListener('focusin', finishIntro);
    window.addEventListener('wheel', finishIntro, { passive: true });
    window.addEventListener('touchmove', finishIntro, { passive: true });
    window.addEventListener('keydown', introKey);
    const active = new Set<HTMLElement>();
    let frame = 0;
    let x = 0, y = 0;
    const update = () => {
      frame = 0;
      if (reduced.matches) return;
      if (window.scrollY > 8) finishIntro();
      for (const section of active) {
        if (section === opening && opening.dataset.intro === 'playing') continue;
        const rect = section.getBoundingClientRect();
        // The opening starts exactly at zero: no scale jump on the first pointer event.
        const start = section === opening ? 0 : innerHeight * .25;
        const p = Math.max(0, Math.min(1, (start - rect.top) / Math.max(1, rect.height - innerHeight * .5)));
        section.style.setProperty('--scene-progress', p.toFixed(4));
        section.style.setProperty('--mouse-x', `${desktop.matches ? x * (section === opening ? .55 : 1) : 0}px`);
        section.style.setProperty('--mouse-y', `${desktop.matches ? y * (section === opening ? .55 : 1) : 0}px`);
      }
      host.style.setProperty('--reading-progress', `${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)}`);
    };
    const schedule = () => { if (!frame && !reduced.matches) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const section = entry.target as HTMLElement;
        if (entry.isIntersecting) active.add(section); else active.delete(section);
      }
      schedule();
    }, { rootMargin: '120px' });
    sections.forEach(section => observer.observe(section));
    const move = (event: PointerEvent) => {
      if (!desktop.matches || opening?.dataset.intro === 'playing') return;
      x = (event.clientX / innerWidth - .5) * 14;
      y = (event.clientY / innerHeight - .5) * 10;
      schedule();
    };
    const reset = () => { x = 0; y = 0; schedule(); };
    const preference = () => {
      finishIntro();
      for (const section of sections) {
        section.style.removeProperty('--scene-progress');
        section.style.removeProperty('--mouse-x');
        section.style.removeProperty('--mouse-y');
      }
      reset();
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', preference);
    desktop.addEventListener('change', preference);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      finishIntro();
      opening?.removeEventListener('animationend', introEnd);
      opening?.removeEventListener('focusin', finishIntro);
      window.removeEventListener('wheel', finishIntro);
      window.removeEventListener('touchmove', finishIntro);
      window.removeEventListener('keydown', introKey);
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
      host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', reset);
      reduced.removeEventListener('change', preference); desktop.removeEventListener('change', preference);
    };
  }, []);
  return <main id="principal" className="home-experience" ref={root}><div className="home-reading-progress" aria-hidden="true"/>{children}</main>;
}

/** Sources intentionally optional: no requests to missing video files. */
export function HomeVideo({webm,mp4}: {webm?:string;mp4?:string}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || (!webm && !mp4)) return;
    const allowed = matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    let near = false;
    const sync = () => {
      if (near && allowed.matches && !document.hidden) {
        if (!video.src) video.src = webm && video.canPlayType('video/webm') ? webm : (mp4 || webm || '');
        void video.play().catch(() => { video.style.opacity = '0'; });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {near = entry.isIntersecting; sync();}, {threshold:.1});
    observer.observe(video);
    allowed.addEventListener('change',sync); document.addEventListener('visibilitychange',sync);
    return () => {observer.disconnect();allowed.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);video.pause();};
  },[webm,mp4]);
  if (!webm && !mp4) return null;
  return <video ref={ref} className="home-video" muted loop playsInline preload="none" aria-hidden="true" onError={event=>{event.currentTarget.style.opacity='0';}}/>;
}
