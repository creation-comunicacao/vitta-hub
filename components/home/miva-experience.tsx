'use client';

import { useEffect, useRef } from 'react';
import { Brain, Heart, Smile, UserRound, Utensils } from 'lucide-react';
import { CTA, SectionHeader } from '@/components/sections/ui';

const pillars = [
  { Icon: Heart, name: 'Saúde' },
  { Icon: Brain, name: 'Mente' },
  { Icon: Utensils, name: 'Nutrição' },
  { Icon: Smile, name: 'Felicidade / Motivação' },
];
const paths = ['M300 250 C230 250 180 180 105 180', 'M300 250 C370 250 420 180 495 180', 'M300 250 C230 250 180 375 105 375', 'M300 250 C370 250 420 375 495 375'];

/** Native scrolling, with one scheduled frame only when the scene needs an update. */
export function MivaExperience() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 900px), (max-height: 650px)');
    const steps = [...host.querySelectorAll<HTMLElement | SVGElement>('[data-miva-step]')];
    let frame = 0;
    let near = true;
    let keyboard = false;
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const update = () => {
      frame = 0;
      if (!near && !reduced.matches && !keyboard) return;
      const rect = host.getBoundingClientRect();
      const progress = clamp((innerHeight * .12 - rect.top) / Math.max(1, rect.height - innerHeight));
      let complete = true;
      for (const node of steps) {
        const start = Number(node.dataset.mivaStep);
        const target = node.dataset.mivaTarget ? host.querySelector<HTMLElement>(node.dataset.mivaTarget) : node;
        const top = target?.getBoundingClientRect().top ?? 0;
        const raw = reduced.matches || keyboard ? 1 : compact.matches
          ? clamp((innerHeight * .88 - top) / (innerHeight * .28))
          : clamp((progress - start) / .09);
        const value = raw * raw * (3 - 2 * raw);
        node.style.setProperty('--reveal', value.toFixed(4));
        if (node.classList.contains('miva-pillar') && raw < 1) complete = false;
      }
      host.dataset.complete = String(complete);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const focus = () => { keyboard = true; schedule(); };
    host.dataset.enhanced = 'true';
    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      host.dataset.active = String(near);
      schedule();
    }, { rootMargin: '100px' });
    observer.observe(host);
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    compact.addEventListener('change', schedule);
    host.addEventListener('focusin', focus);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule); compact.removeEventListener('change', schedule);
      host.removeEventListener('focusin', focus);
      delete host.dataset.enhanced;
      steps.forEach(node => node.style.removeProperty('--reveal'));
    };
  }, []);

  return <section id="metodologia" ref={ref} className="miva-section miva-story" aria-label="Nossa metodologia transversal">
    <div className="miva-pin container">
      <div className="miva-copy" data-miva-step="0">
        <SectionHeader label="04 / Nossa metodologia transversal" title="M.I.V.A. — Movimento Inteligente para uma Vida Ativa.">Uma metodologia que conecta os Hubs, o treinamento e a nutrição, respeitando as necessidades, os objetivos e o momento de cada pessoa.</SectionHeader>
      </div>
      <div className="miva-system">
        <svg className="miva-lines" viewBox="0 0 600 560" aria-hidden="true">
          <path className="miva-root-line" data-miva-step=".16" data-miva-target=".miva-core" pathLength="1" d="M300 100 L300 250"/>
          {paths.map((d,i)=><path key={d} className={`miva-connection miva-color-${i}`} data-miva-step={.28+i*.12} data-miva-target={`.miva-pillar-${i}`} pathLength="1" d={d}/>)}
          <ellipse className="miva-orbit" data-miva-step=".72" data-miva-target=".miva-links" pathLength="1" cx="300" cy="275" rx="235" ry="168"/>
          <path className="miva-operation-line" data-miva-step=".82" data-miva-target=".miva-links" pathLength="1" d="M300 315 L300 485 M300 465 Q300 485 280 485 L170 485 M300 465 Q300 485 320 485 L430 485"/>
        </svg>
        <div className="miva-person" data-miva-step=".07"><span className="eyebrow">A pessoa no centro</span><span className="miva-person-icon"><UserRound size={30} strokeWidth={1.3} aria-hidden="true"/></span></div>
        <div className="miva-core" data-miva-step=".17"><strong>M.I.V.A.</strong><p>Movimento Inteligente<br/>para uma Vida Ativa</p></div>
        <div className="miva-pillars">{pillars.map(({Icon,name},i)=><div key={name} className={`miva-pillar miva-pillar-${i} miva-color-${i}`} data-miva-step={.28+i*.12}><span className="miva-pillar-icon"><Icon size={34} strokeWidth={1.3} aria-hidden="true"/></span><span>{name}</span></div>)}</div>
        <div className="miva-links" data-miva-step=".82"><span>Uma visão que atravessa</span><div><a href="/gestao-esportiva-condominios/">Hubs</a><a href="/consultoria-online/">Consultoria</a><a href="/e-hub-nutrition/">Nutrição</a></div></div>
      </div>
      <div className="miva-cta" data-miva-step=".9"><CTA secondary href="/miva/">Conhecer a M.I.V.A.</CTA></div>
    </div>
  </section>;
}
