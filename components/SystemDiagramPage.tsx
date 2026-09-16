'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, Languages } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { SystemDiagram } from '@/components/SystemDiagram';
import { getDictionary, localizedHref, type Locale } from '@/lib/content';
import { diagramSlug, getSystemDiagram, type DiagramProject } from '@/lib/diagrams';

gsap.registerPlugin(useGSAP);

export function SystemDiagramPage({ locale, project }: { locale: Locale; project: DiagramProject }) {
  const dict = getDictionary(locale);
  const diagram = getSystemDiagram(project, locale);
  const { ui, header } = diagram;
  const home = locale === 'es' ? '/' : '/en';
  const slug = diagramSlug(project);
  const caseHref = localizedHref(locale, slug);
  const switchHref = localizedHref(locale === 'es' ? 'en' : 'es', `${slug}/diagrama`);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.lang = dict.htmlLang;
  }, [dict.htmlLang]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.case-topbar', { y: -18, opacity: 0, duration: 0.5 })
        .from('.dg-head > *', { y: 18, opacity: 0, duration: 0.55, stagger: 0.07 }, '-=0.2')
        .from('.dg-frame', { y: 16, opacity: 0, duration: 0.6 }, '-=0.3');
    },
    { scope: rootRef, dependencies: [locale, project] },
  );

  return (
    <main ref={rootRef} className="min-h-screen bg-bg-primary text-text-primary">
      <CustomCursor />

      <header className="case-topbar fixed inset-x-0 top-0 z-50 border-b border-border/70 supports-[backdrop-filter]:backdrop-blur-xl">
        <div className="flex h-16 w-full items-center justify-between px-5 md:px-8">
          <Link href={caseHref} className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary">
            <ArrowLeft size={18} className="flex-none" />
            <span className="sm:hidden">{ui.back}</span>
            <span className="hidden sm:inline">{ui.backFull}</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href={switchHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
              aria-label={ui.switchAria}
            >
              <Languages size={16} />
              {ui.switchLabel}
            </Link>
            <Link href={home} className="font-display text-base font-semibold text-text-primary" aria-label="Seba Viglione">
              Seba Viglione
            </Link>
          </div>
        </div>
      </header>

      {/* El lienzo va a todo el ancho y completa el alto de la pantalla: la cabecera
          es corta y el marco crece hasta llenar lo que queda del viewport. */}
      <div className="flex min-h-[100dvh] flex-col pt-16">
        <section className="dg-head w-full px-5 pt-6 pb-4 md:px-8">
          <p className="section-label">{header.kicker}</p>
          <h1 className="mt-2 font-display text-2xl font-bold leading-[1.05] text-text-primary md:text-3xl">{header.title}</h1>
          <p className="mt-2 max-w-3xl text-[14px] leading-[1.55] text-text-secondary">{header.intro}</p>
        </section>

        <div className="dg-frame">
          <SystemDiagram diagram={diagram} />
        </div>
      </div>

      <footer className="w-full px-5 pt-8 pb-14 md:px-8">
        <p className="max-w-2xl text-[13px] leading-[1.6] text-text-muted">{header.footNote}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={caseHref} className="direct-action">
            <ArrowLeft size={18} />
            {ui.backCase}
          </Link>
          <Link href={`${home}#contacto`} className="btn-primary">
            {ui.ctaTalk}
            <ArrowRight size={18} />
          </Link>
        </div>
      </footer>
    </main>
  );
}
