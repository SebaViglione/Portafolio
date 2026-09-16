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

/**
 * La página ES el diagrama: ocupa toda la pantalla y el título, el idioma, el
 * volver al case study y el contacto viven dentro de la barra lateral.
 */
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
      gsap.from('.dg-side-head > *', { y: 14, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', clearProps: 'all' });
    },
    { scope: rootRef, dependencies: [locale, project] },
  );

  return (
    <main ref={rootRef} className="dg-page bg-bg-primary text-text-primary">
      <CustomCursor />
      <SystemDiagram
        diagram={diagram}
        sideHeader={
          <div className="dg-side-head">
            <div className="dg-side-top">
              <Link href={home} className="font-display text-sm font-semibold text-text-primary" aria-label="Seba Viglione">
                Seba Viglione
              </Link>
              <Link href={switchHref} className="dg-side-switch" aria-label={ui.switchAria}>
                <Languages size={14} />
                {ui.switchLabel}
              </Link>
            </div>
            <p className="section-label">{header.kicker}</p>
            <h1 className="dg-side-title">{header.title}</h1>
            <p className="dg-side-intro">{header.intro}</p>
          </div>
        }
        sideFooter={
          <div className="dg-side-foot">
            <div className="dg-side-actions">
              <Link href={caseHref} className="dg-btn">
                <ArrowLeft size={14} />
                {ui.backCase}
              </Link>
              <Link href={`${home}#contacto`} className="dg-btn is-primary">
                {ui.ctaTalk}
                <ArrowRight size={14} />
              </Link>
            </div>
            <p className="dg-side-note">{header.footNote}</p>
          </div>
        }
      />
    </main>
  );
}
