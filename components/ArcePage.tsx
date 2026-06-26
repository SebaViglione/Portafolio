'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ArrowLeft, ArrowRight, ExternalLink, Languages, Workflow } from 'lucide-react';
import { GitHubIcon } from '@/components/BrandIcons';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import { CustomCursor } from '@/components/CustomCursor';
import { arceMedia, contact } from '@/lib/site';
import { getDictionary, type Locale } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ArcePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const arce = dict.arce;
  const home = locale === 'es' ? '/' : '/en';
  const switchHref = locale === 'es' ? '/en/arce' : '/arce';

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
        .from('.case-hero > *', { y: 22, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.15');

      gsap.utils.toArray<HTMLElement>('.case-block').forEach((block) => {
        gsap.from(block, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: block, start: 'top 80%' },
        });
      });

      gsap.from('.arch-step', {
        x: -26,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.arch-flow', start: 'top 72%' },
      });

      gsap.from('.decision-card', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.decision-grid', start: 'top 76%' },
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
            <span className="sm:hidden">{arce.back}</span>
            <span className="hidden sm:inline">{arce.backFull}</span>
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
          <p className="section-label">{arce.caseLabel} · {arce.category}</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.98] text-text-primary md:text-7xl">
            Arce
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-[1.55] text-text-secondary md:text-2xl">{arce.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-text-muted">
            <span>
              <span className="block text-xs uppercase tracking-[0.04em] text-text-muted/70">{arce.roleLabel}</span>
              <span className="text-text-secondary">{arce.role}</span>
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.04em] text-text-muted/70">{arce.yearLabel}</span>
              <span className="text-text-secondary">{arce.year}</span>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={arceMedia.repo} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={18} />
              {arce.repoBtn}
            </Link>
            <Link href="#demo" className="btn-secondary">
              {arce.demoBtn}
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-2">
            {arce.stack.map((item) => (
              <span className="stack-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <p className="case-block max-w-3xl border-l-2 border-accent pl-5 text-lg leading-[1.7] text-text-secondary md:text-xl">
          {arce.summary}
        </p>

        <section className="case-block mt-20 grid gap-8 md:grid-cols-[160px_1fr] md:gap-12">
          <p className="section-label md:pt-2">{arce.problemLabel}</p>
          <div className="max-w-2xl space-y-5">
            {arce.problem.map((paragraph) => (
              <p className="text-[17px] leading-[1.75] text-text-secondary" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="case-block mt-16 grid gap-8 md:grid-cols-[160px_1fr] md:gap-12">
          <p className="section-label md:pt-2">{arce.solutionLabel}</p>
          <div className="max-w-2xl space-y-5">
            {arce.solution.map((paragraph) => (
              <p className="text-[17px] leading-[1.75] text-text-secondary" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{arce.archLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {arce.archHeading}
            </h2>
          </div>

          <div className="arch-flow mt-12 max-w-3xl">
            {arce.architecture.map((node) => (
              <div className="arch-step" key={node.step}>
                <span className="arch-step-number font-display">{node.step}</span>
                <div className="arch-step-body">
                  <h3 className="font-display text-xl font-semibold text-text-primary">{node.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-text-secondary">{node.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex max-w-3xl items-start gap-3 rounded-md border border-border bg-bg-card p-5 text-[15px] leading-[1.65] text-text-secondary">
            <Workflow className="mt-0.5 flex-none text-accent" size={20} />
            <span>{arce.orchestration}</span>
          </div>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{arce.decisionsLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {arce.decisionsHeading}
            </h2>
          </div>

          <div className="decision-grid mt-12 grid gap-4 md:grid-cols-2">
            {arce.decisions.map((decision) => (
              <article className="decision-card" key={decision.title}>
                <h3 className="font-display text-xl font-semibold text-text-primary">{decision.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-text-secondary">{decision.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="demo" className="case-block mt-20 scroll-mt-24">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{arce.demoLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {arce.demoHeading}
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-md border border-border bg-bg-secondary">
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={arce.demoAria}
            >
              <source src={arceMedia.video} type="video/webm" />
            </video>
          </div>
        </section>

        <section className="case-block mt-20">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{arce.shotsLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {arce.shotsHeading}
            </h2>
          </div>

          <div className="mt-10 space-y-8">
            {arce.gallery.map((shot) => (
              <figure className="arce-shot" key={shot.src}>
                {shot.available ? (
                  <a
                    href={shot.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-md border border-border bg-bg-secondary transition-colors hover:border-accent/50"
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
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-md border border-border bg-bg-secondary px-4 text-center text-xs font-medium uppercase tracking-[0.04em] text-text-muted">
                    {arce.shotsPending}
                  </div>
                )}
                <figcaption className="mt-3 text-[14px] leading-[1.5] text-text-muted">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-block mt-20">
          <p className="section-label">{arce.resultsLabel}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {arce.results.map((result) => (
              <div className="arce-stat" key={result.label}>
                <span className="font-display text-4xl font-bold text-accent md:text-5xl">{result.value}</span>
                <p className="mt-3 text-[15px] leading-[1.5] text-text-secondary">{result.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-block mt-20 mb-24 rounded-md border border-border bg-bg-card p-7 md:p-10">
          <h2 className="font-display text-2xl font-semibold text-text-primary md:text-3xl">
            {arce.ctaHeading}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-text-secondary">
            {arce.ctaText}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`${home}#contacto`} className="btn-primary">
              {arce.ctaTalk}
              <ArrowRight size={18} />
            </Link>
            <Link href={arceMedia.repo} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
              {arce.ctaCode}
            </Link>
            <Link href={contact.github} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={18} />
              {arce.ctaGithub}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
