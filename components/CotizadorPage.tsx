'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ArrowLeft, ArrowRight, Languages, MoveRight } from 'lucide-react';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import { CustomCursor } from '@/components/CustomCursor';
import { getDictionary, type Locale } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CotizadorPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.cotizador;
  const home = locale === 'es' ? '/' : '/en';
  const switchHref = locale === 'es' ? '/en/cotizador' : '/cotizador';

  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.lang = dict.htmlLang;
  }, [dict.htmlLang]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const reduceMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.case-topbar', { y: -18, opacity: 0, duration: 0.5 })
        .from('.case-hero > *', { y: 22, opacity: 0, duration: 0.6, stagger: 0.07 }, '-=0.15');

      gsap.utils.toArray<HTMLElement>('.case-block').forEach((block) => {
        gsap.from(block, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: block, start: 'top 82%' },
        });
      });

      gsap.from('.arch-step', {
        x: -26,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.arch-flow', start: 'top 74%' },
      });

      gsap.from('.decision-card', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.decision-grid', start: 'top 78%' },
      });
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <main ref={rootRef} className="min-h-screen overflow-hidden bg-bg-primary text-text-primary">
      <CustomCursor />

      <header className="case-topbar fixed inset-x-0 top-0 z-50 border-b border-border/70 supports-[backdrop-filter]:backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 md:px-8">
          <Link href={`${home}#trabajos`} className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary">
            <ArrowLeft size={18} className="flex-none" />
            <span className="sm:hidden">{c.back}</span>
            <span className="hidden sm:inline">{c.backFull}</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href={switchHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
              aria-label={dict.nav.switchAria}
            >
              <Languages size={16} />
              {dict.nav.switchLabel}
            </Link>
            <Link href={home} className="font-display text-base font-semibold text-text-primary" aria-label="Seba Viglione">
              Seba Viglione
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <BackgroundGrid />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" aria-hidden="true" />

        <div className="case-hero relative z-10 mx-auto w-full max-w-5xl px-5 md:px-8">
          <p className="section-label">{c.caseLabel} · {c.category}</p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] text-text-primary sm:text-5xl md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-[1.5] text-text-secondary md:text-2xl">{c.tagline}</p>

          <div className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-4 text-sm text-text-muted">
            <span className="max-w-xs">
              <span className="block text-xs uppercase tracking-[0.04em] text-text-muted/70">{c.roleLabel}</span>
              <span className="text-text-secondary">{c.role}</span>
            </span>
            <span className="max-w-xs">
              <span className="block text-xs uppercase tracking-[0.04em] text-text-muted/70">{c.clientLabel}</span>
              <span className="text-text-secondary">{c.client}</span>
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.04em] text-text-muted/70">{c.yearLabel}</span>
              <span className="text-text-secondary">{c.year}</span>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href={`${home}#contacto`} className="btn-primary">
              {c.repoBtn}
              <ArrowRight size={18} />
            </Link>
            <span className="text-xs text-text-muted">{c.privateNote}</span>
          </div>

          <div className="mt-9 flex flex-wrap gap-2">
            {c.stack.map((item) => (
              <span className="stack-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <div className="case-block metric-badge mt-4">
          <span className="metric-badge-value font-display">{c.metricValue}</span>
          <p className="metric-badge-text">{c.metricText}</p>
        </div>

        <p className="case-block mt-16 max-w-3xl border-l-2 border-accent pl-5 text-lg leading-[1.7] text-text-secondary md:text-xl">
          {c.summary}
        </p>

        <section className="case-block mt-20 grid gap-8 md:grid-cols-[160px_1fr] md:gap-12">
          <p className="section-label md:pt-2">{c.problemLabel}</p>
          <div className="max-w-2xl space-y-5">
            {c.problem.map((paragraph) => (
              <p className="text-[17px] leading-[1.75] text-text-secondary" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{c.insightLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {c.insightHeading}
            </h2>
          </div>
          <div className="mt-8 max-w-3xl space-y-5">
            {c.insight.map((paragraph) => (
              <p className="text-[17px] leading-[1.75] text-text-secondary" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="beforeafter mt-10 max-w-3xl">
            <div className="beforeafter-box">
              <span className="text-xs uppercase tracking-[0.04em] text-text-muted">{c.beforeLabel}</span>
              <span className="mt-2 font-display text-3xl font-bold text-text-secondary md:text-4xl">{c.beforeValue}</span>
            </div>
            <MoveRight className="beforeafter-arrow text-accent" size={26} />
            <div className="beforeafter-box is-after">
              <span className="text-xs uppercase tracking-[0.04em] text-text-muted">{c.afterLabel}</span>
              <span className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl">{c.afterValue}</span>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-[15px] leading-[1.7] text-text-muted">{c.beforeAfterText}</p>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{c.solutionLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {c.solutionHeading}
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {c.solution.map((item, index) => (
              <li className="solution-step" key={item.title}>
                <span className="solution-step-number font-display">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-text-secondary">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-7 max-w-3xl rounded-md border border-border bg-bg-card p-5 text-[15px] leading-[1.7] text-text-secondary">
            {c.solutionNote}
          </p>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{c.archLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {c.archHeading}
            </h2>
          </div>
          <div className="arch-flow mt-12 max-w-3xl">
            {c.architecture.map((node) => (
              <div className="arch-step" key={node.step}>
                <span className="arch-step-number arch-step-number-sm font-display">{node.step}</span>
                <div className="arch-step-body">
                  <h3 className="font-display text-lg font-semibold text-text-primary">{node.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.6] text-text-secondary">{node.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[15px] leading-[1.7] text-text-muted">{c.archNote}</p>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{c.securityLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {c.securityHeading}
            </h2>
          </div>
          <div className="decision-grid mt-12 grid gap-4 md:grid-cols-2">
            {c.security.map((item) => (
              <article className="decision-card" key={item.title}>
                <h3 className="font-display text-xl font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-text-secondary">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{c.qualityLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {c.qualityHeading}
            </h2>
          </div>
          <dl className="mt-10 max-w-3xl">
            {c.quality.map((row) => (
              <div className="quality-row" key={row.metric}>
                <dt className="text-[15px] leading-[1.5] text-text-secondary">{row.metric}</dt>
                <dd className="font-display text-lg font-semibold text-accent">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 max-w-3xl rounded-md border border-border bg-bg-card p-5 text-[15px] leading-[1.7] text-text-secondary">
            {c.qualityNote}
          </p>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{c.shotsLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {c.shotsHeading}
            </h2>
          </div>
          <div className="mt-10 space-y-8">
            {c.gallery.map((shot) => (
              <figure className="arce-shot" key={shot.src}>
                {shot.kind === 'video' ? (
                  <div className="overflow-hidden rounded-md border border-border bg-bg-secondary">
                    <video
                      src={shot.src}
                      width={shot.width}
                      height={shot.height}
                      className="h-auto w-full"
                      playsInline
                      muted={shot.loop}
                      autoPlay={shot.loop}
                      loop={shot.loop}
                      controls={!shot.loop}
                      preload="metadata"
                      aria-label={shot.alt}
                    />
                  </div>
                ) : (
                  <a
                    href={shot.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block overflow-hidden rounded-md border border-border bg-bg-secondary transition-colors hover:border-accent/50${
                      shot.width < shot.height ? ' mx-auto max-w-md' : ''
                    }`}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="h-auto w-full"
                    />
                  </a>
                )}
                <figcaption className="mt-3 text-[14px] leading-[1.5] text-text-muted">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{c.learningsLabel}</p>
          </div>
          <ul className="mt-8 max-w-3xl space-y-4">
            {c.learnings.map((item) => (
              <li className="learn-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="case-block mt-20 mb-24 rounded-md border border-border bg-bg-card p-7 md:p-10">
          <h2 className="font-display text-2xl font-semibold text-text-primary md:text-3xl">
            {c.ctaHeading}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-text-secondary">
            {c.ctaText}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`${home}#contacto`} className="btn-primary">
              {c.ctaTalk}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
