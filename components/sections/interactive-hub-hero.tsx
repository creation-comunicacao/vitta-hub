'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { HubSlug } from '@/content/pages';

/** Progressive enhancement: server-rendered copy remains readable without JS. */
export function InteractiveHubHero({ slug, children }: { slug: HubSlug; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(pointer: fine) and (min-width: 901px)');
    let frame = 0;
    let visible = true;
    let x = 0, y = 0;
    const update = () => {
      frame = 0;
      if (!visible || reduced.matches) return;
      const bounds = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - innerHeight * .45)));
      element.style.setProperty('--journey', progress.toFixed(4));
      element.style.setProperty('--pointer-x', `${x.toFixed(2)}px`);
      element.style.setProperty('--pointer-y', `${y.toFixed(2)}px`);
    };
    const schedule = () => { if (!frame && visible && !reduced.matches) frame = requestAnimationFrame(update); };
    const pointer = (event: PointerEvent) => {
      if (!fine.matches) return;
      const bounds = element.getBoundingClientRect();
      x = ((event.clientX - bounds.left) / bounds.width - .5) * 12;
      y = ((event.clientY - bounds.top) / bounds.height - .5) * 8;
      schedule();
    };
    const reset = () => { x = 0; y = 0; schedule(); };
    const preference = () => {
      element.style.removeProperty('--journey');
      element.style.removeProperty('--pointer-x');
      element.style.removeProperty('--pointer-y');
      reset();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); });
    observer.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    element.addEventListener('pointermove', pointer, { passive: true });
    element.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', preference);
    fine.addEventListener('change', preference);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      element.removeEventListener('pointermove', pointer);
      element.removeEventListener('pointerleave', reset);
      reduced.removeEventListener('change', preference);
      fine.removeEventListener('change', preference);
    };
  }, []);
  return <div ref={root} className={`interactive-hub ${slug}`}>{children}<div className="hub-exit" aria-hidden="true" /></div>;
}

export function HubScene({slug}: {slug: HubSlug}) {
  return <div className="hub-scene" aria-hidden="true">
    <picture><source media="(max-width: 600px)" srcSet={`/hubs/${slug}-700.webp`} />{/* Decorative concept artwork; original editorial copy is unchanged. */}
      <img src={`/hubs/${slug}-1400.webp`} width="1400" height="933" alt="" fetchPriority="high" decoding="async" />
    </picture>
    <div className="hub-scene-light" />
    <svg className="hub-scene-lines" viewBox="0 0 800 600" fill="none" preserveAspectRatio="xMidYMid slice">
      {slug==='hub-aquatico' ? <><path d="M-50 170 Q180 40 400 170 T850 170"/><path d="M-50 205 Q180 75 400 205 T850 205"/><path d="M-50 240 Q180 110 400 240 T850 240"/></> : slug==='hub-esportivo' ? <><path d="M120 560 Q180 310 680 180" pathLength="1"/><circle cx="420" cy="350" r="95"/><path d="M40 520 L740 520 L640 90 L160 90 Z M110 330 H690"/></> : <><ellipse cx="420" cy="330" rx="310" ry="210"/><ellipse cx="420" cy="330" rx="285" ry="185"/><path d="M60 510 H220 M140 430 V590 M620 90 H760 M690 20 V160"/></>}
    </svg>
    <div className="hub-scene-particles">{[0,1,2,3,4,5].map(i=><i key={i}/>)}</div>
    <div className="hub-scene-progress"><span/></div>
  </div>;
}
