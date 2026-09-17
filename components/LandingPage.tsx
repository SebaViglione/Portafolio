'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ArrowDown, ArrowRight, ExternalLink, Languages, Mail, Send } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons';
import { CustomCursor } from '@/components/CustomCursor';
import { contact } from '@/lib/site';
import { getDictionary, localizedHref, type Locale, type Project } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function splitWords(text: string, className = '') {
  const words = text.trim().split(/\s+/);

  return words.map((word, wordIndex) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className={`word ${className}`} aria-hidden="true">
        {word}
      </span>
      {wordIndex < words.length - 1 ? ' ' : null}
    </Fragment>
  ));
}

function HeroTitle({ title }: { title: ReturnType<typeof getDictionary>['hero']['title'] }) {
  return (
    <h1 className="hero-title font-display text-[2rem] font-bold leading-[1.02] tracking-[-0.015em] text-text-primary min-[400px]:text-[2.35rem] sm:text-[3rem] md:text-[3.3rem] xl:text-[3.7rem]">
      <span className="sr-only">{title.sr}</span>
      <span className="hero-title-line block">{splitWords(title.l1)}</span>
      <span className="hero-title-line block">{splitWords(title.l2)}</span>
      <span className="block">
        {splitWords(title.l3pre)}{' '}
        <span className="highlight-word">{splitWords(title.highlight, 'highlight-word-text')}</span>
      </span>
    </h1>
  );
}

function ContactTitle({ title }: { title: ReturnType<typeof getDictionary>['contact']['title'] }) {
  return (
    <h2 className="contact-title font-display text-[2.5rem] font-bold leading-[1.02] tracking-normal text-text-primary sm:text-[3.4rem] xl:text-[4.3rem]">
      <span className="contact-line block">{title.l1}</span>
      {title.l2 ? <span className="contact-line block">{title.l2}</span> : null}
    </h2>
  );
}

function TerminalBrand() {
  return (
    <span className="font-mono text-[15px] font-medium text-text-primary" aria-hidden="true">
      <span className="text-accent">seba</span>@mvd:~$
      <span className="term-cursor ml-0.5" />
    </span>
  );
}

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('es-UY', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Montevideo',
    });

    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return <span className="tabular-nums">{time ?? '--:--'}</span>;
}

function SysMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="sys-media relative aspect-[16/9] overflow-hidden border-b border-border bg-bg-secondary md:aspect-auto md:h-full md:min-h-[300px] md:border-b-0 md:border-r">
      {project.video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={project.name}
        >
          <source src={project.video} type="video/webm" />
        </video>
      ) : project.image ? (
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 92vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="placeholder-pattern absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/35 to-transparent" aria-hidden="true" />
    </div>
  );
}

export function LandingPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const tools = dict.work.tools;
  const sites = dict.work.sites;
  const switchHref = locale === 'es' ? '/en' : '/';

  const rootRef = useRef<HTMLElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    const button = menuIconRef.current;
    if (!button) return;

    const lines = button.querySelectorAll('span');
    gsap.to(lines[0], { y: menuOpen ? 7 : 0, rotate: menuOpen ? 45 : 0, duration: 0.22, ease: 'power2.out' });
    gsap.to(lines[1], { opacity: menuOpen ? 0 : 1, duration: 0.16, ease: 'power2.out' });
    gsap.to(lines[2], { y: menuOpen ? -7 : 0, rotate: menuOpen ? -45 : 0, duration: 0.22, ease: 'power2.out' });
  }, [menuOpen]);

  useGSAP(
    () => {
      const reduceMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      const heroWords = gsap.utils.toArray<HTMLElement>('.hero-title .word');

      gsap.set(heroWords, { yPercent: -90, opacity: 0, rotateX: -28 });
      gsap.set('.contact-line', { y: 34, opacity: 0 });
      gsap.set('.bento-tile', { y: 26, opacity: 0 });
      gsap.set('.hero-kicker, .hero-copy, .hero-actions', { y: 18, opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.site-nav', { y: -22, opacity: 0, duration: 0.6 })
        .to('.tile-intro', { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' }, '-=0.25')
        .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.45 }, '-=0.3')
        .to(heroWords, { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.68, stagger: 0.06 }, '-=0.25')
        .to('.hero-copy', { y: 0, opacity: 1, duration: 0.55 }, '-=0.3')
        .to('.hero-actions', { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .to(
          '.bento-tile:not(.tile-intro)',
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.09, clearProps: 'transform' },
          '-=0.55',
        );

      gsap.utils.toArray<HTMLElement>('.section-heading').forEach((heading) => {
        gsap.from(heading, {
          y: 34,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 78%',
          },
        });
      });

      gsap.from('.sys-row', {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        clearProps: 'transform,opacity',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.sys-table',
          start: 'top 78%',
        },
      });

      gsap.from('.xp-item, .edu-block', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        clearProps: 'transform,opacity',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#experiencia',
          start: 'top 70%',
        },
      });

      gsap.from('.about-block', {
        y: 28,
        opacity: 0,
        duration: 0.72,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#sobre-mi',
          start: 'top 64%',
        },
      });

      gsap.from('.stack-group', {
        y: 22,
        opacity: 0,
        duration: 0.58,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stack-grid',
          start: 'top 82%',
        },
      });

      gsap.from('.reason-item', {
        x: -34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#porque',
          start: 'top 65%',
        },
      });

      gsap.utils.toArray<HTMLElement>('.count-number').forEach((number) => {
        const value = Number(number.dataset.value || '0');
        const counter = { value: 0 };
        gsap.to(counter, {
          value,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: number,
            start: 'top 82%',
          },
          onUpdate: () => {
            number.textContent = String(Math.round(counter.value)).padStart(2, '0');
          },
        });
      });

      gsap.to('.seba-watermark', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '#porque',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.contact-line', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '#contacto',
          start: 'top 68%',
        },
      });

      gsap.from('.contact-block', {
        y: 28,
        opacity: 0,
        duration: 0.72,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contacto',
          start: 'top 60%',
        },
      });
    },
    { scope: rootRef, dependencies: [locale] },
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={rootRef} className="min-h-screen overflow-hidden bg-bg-primary text-text-primary">
      <CustomCursor />

      <motion.header
        className={`site-nav fixed inset-x-0 top-0 z-50 border-b border-white/0 transition-colors duration-300 supports-[backdrop-filter]:backdrop-blur-xl ${
          menuOpen ? 'is-menu-open' : ''
        }`}
        initial={false}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="#inicio" className="brand-link" aria-label="Seba Viglione">
            <TerminalBrand />
            <span className="sr-only">Seba Viglione</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {dict.nav.items.map((item) => (
              <Link className="nav-link text-sm font-medium text-text-secondary" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link
              href={switchHref}
              className="nav-link inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary"
              aria-label={dict.nav.switchAria}
            >
              <Languages size={16} />
              {dict.nav.switchLabel}
            </Link>
            <span className="hidden h-5 w-px bg-border xl:block" aria-hidden="true" />
            <span className="hidden items-center gap-2.5 rounded-md border border-border px-3 py-2.5 font-mono text-xs text-text-secondary xl:inline-flex">
              <span className="pulse-dot" />
              {dict.nav.status}
              <span aria-hidden="true">· mvd</span>
              <LocalTime />
              <span className="sr-only">{dict.nav.timeSr}</span>
            </span>
            <Link href="#contacto" className="nav-cta text-sm font-semibold">
              {dict.nav.cta}
            </Link>
          </nav>

          <button
            ref={menuIconRef}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-md border border-border bg-bg-card text-text-primary lg:hidden"
            aria-label={menuOpen ? dict.nav.menuClose : dict.nav.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="absolute h-0.5 w-5 rounded-full bg-current" />
            <span className="absolute h-0.5 w-5 rounded-full bg-current" />
            <span className="absolute h-0.5 w-5 rounded-full bg-current" />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu-panel fixed inset-0 z-40 min-h-dvh px-6 pb-8 pt-28 lg:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex flex-col gap-4">
                {dict.nav.items.map((item) => (
                  <Link
                    className="border-b border-border py-5 font-display text-4xl font-semibold text-text-primary"
                    href={item.href}
                    key={item.href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={switchHref}
                  className="inline-flex items-center gap-2 border-b border-border py-5 font-display text-4xl font-semibold text-text-primary"
                  onClick={closeMenu}
                  aria-label={dict.nav.switchAria}
                >
                  <Languages size={28} />
                  {dict.nav.switchLabel}
                </Link>
                <Link href="#contacto" className="btn-primary mt-4 justify-center" onClick={closeMenu}>
                  {dict.nav.cta}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <section id="inicio" className="relative pt-20">
        <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-6 md:px-8 md:pt-10">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="bento-tile tile-intro flex flex-col justify-center overflow-hidden p-7 md:p-12 lg:col-span-8">
              <div className="hero-kicker inline-flex items-center gap-3 font-mono text-[13px] font-medium text-text-secondary">
                <span className="pulse-dot" />
                {dict.hero.status}
              </div>

              <div className="mt-6">
                <HeroTitle title={dict.hero.title} />
              </div>

              <p className="hero-copy mt-6 max-w-xl text-[17px] leading-[1.7] text-text-secondary md:text-lg">
                {dict.hero.copy}
              </p>

              <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href="#trabajos" className="btn-primary">
                  {dict.hero.ctaWork}
                  <ArrowDown size={18} />
                </Link>
                <Link href={contact.github} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon size={18} />
                  {dict.hero.ctaGithub}
                </Link>
                <Link href={contact.linkedin} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon size={18} />
                  {dict.hero.ctaLinkedin}
                </Link>
              </div>
            </div>

            <div className="bento-tile relative min-h-[420px] overflow-hidden sm:min-h-[480px] lg:col-span-4 lg:row-span-2 lg:min-h-0">
              <div className="tile-grid-bg absolute inset-0" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-11 top-0">
                <Image
                  src="/assets/img/profile.webp"
                  alt={dict.hero.portraitAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 400px, 92vw"
                  className="object-contain object-bottom saturate-[0.85]"
                />
              </div>
              <div
                className="absolute inset-x-0 bottom-11 h-28 bg-gradient-to-b from-transparent to-bg-secondary/90"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex h-11 items-center justify-between border-t border-border bg-bg-primary px-4">
                <span className="text-[13px] font-semibold text-text-primary">{dict.bento.portraitName}</span>
                <span className="font-mono text-[11px] text-accent">{dict.bento.portraitRole}</span>
              </div>
            </div>

            <div className="bento-tile p-6 lg:col-span-3">
              <span className="tile-label">{dict.bento.estadoLabel}</span>
              <div className="mt-4 grid gap-3">
                {dict.bento.estado.map((row) => (
                  <div className="estado-row" key={row.label}>
                    <span className="font-mono text-[11.5px] text-text-muted">{row.label}</span>
                    {row.live ? (
                      <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent">
                        <span className="pulse-dot" />
                        {row.value}
                      </span>
                    ) : (
                      <span className="text-right text-[13px] text-text-primary">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bento-tile p-6 lg:col-span-5">
              <span className="tile-label">{dict.bento.stackLabel}</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {dict.bento.stack.map((item) => (
                  <span className="chip-mono" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bento-tile overflow-hidden lg:col-span-6">
              <div className="term-bar">
                <span className="term-dot" />
                <span className="term-dot" />
                <span className="term-dot is-accent" />
                <span className="ml-2 font-mono text-[11px] text-text-muted">{dict.bento.terminalTitle}</span>
              </div>
              <div className="grid gap-3.5 p-6">
                {dict.bento.values.map((value, index) => (
                  <p className="flex gap-3 text-[15px] leading-relaxed text-text-secondary" key={value.title}>
                    <span className="select-none font-mono text-accent" aria-hidden="true">
                      &gt;
                    </span>
                    <span>
                      <span className="font-semibold text-text-primary">{value.title}</span> — {value.text}
                      {index === dict.bento.values.length - 1 ? <span className="term-cursor ml-1.5" /> : null}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            <div className="bento-tile flex flex-col p-6 lg:col-span-6">
              <span className="tile-label">{dict.bento.projectsLabel}</span>
              <div className="mt-4 grid flex-1 gap-2.5">
                {tools.map((tool) => (
                  <Link className="svc-item group" href={localizedHref(locale, tool.url)} key={tool.name}>
                    <span className="font-mono text-[11px] text-accent">{tool.label}</span>
                    <span className="font-display text-[15px] font-semibold text-text-primary">{tool.name}</span>
                    <span className="hidden font-mono text-[11px] lowercase text-text-muted sm:inline">{tool.kind}</span>
                    <ArrowRight
                      className="ml-auto text-text-muted transition-transform duration-300 group-hover:translate-x-0.5"
                      size={15}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trabajos" className="bg-bg-primary py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-mono text-[13px] font-medium text-accent">{dict.work.monoLabel}</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
                {dict.work.heading}
              </h2>
            </div>
            <span className="inline-flex items-center gap-2.5 rounded-md border border-border px-3.5 py-2.5 font-mono text-xs text-text-secondary">
              <span className="pulse-dot" />
              {dict.work.statusChip}
            </span>
          </div>

          <div className="sys-table mt-10 overflow-hidden rounded-lg border border-border">
            {tools.map((tool, index) => {
              const href = localizedHref(locale, tool.url);
              return (
                <article className="sys-row" key={tool.name}>
                  <Link className="grid md:grid-cols-2" href={href} data-cursor={dict.work.cursorLabel}>
                    <SysMedia project={tool} priority={index === 0} />
                    <div className="flex flex-col p-6 md:p-8">
                      <p className="font-mono text-[11.5px] lowercase text-text-muted">
                        {tool.kind}
                        {tool.year ? ` · ${tool.year}` : ''}
                      </p>
                      <h3 className="mt-2.5 font-display text-2xl font-semibold leading-tight text-text-primary md:text-[1.7rem]">
                        {tool.name}
                      </h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-[1.65] text-text-secondary">
                        {tool.description}
                      </p>
                      <p className="mt-4 font-mono text-[11.5px] lowercase text-text-muted">
                        {tool.tags.join(' · ')}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                        {tool.cta}
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          <p className="sites-line mt-8 text-[15px] leading-[1.7] text-text-muted">
            {dict.work.sitesLine}{' '}
            {sites.map((site, index) => (
              <Fragment key={site.name}>
                <Link href={site.url} target="_blank" rel="noopener noreferrer">
                  {site.name}
                </Link>
                {index < sites.length - 1 ? ' · ' : '.'}
              </Fragment>
            ))}
          </p>
        </div>
      </section>

      <section id="experiencia" className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{dict.experience.label}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              {dict.experience.heading}
            </h2>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
            <div className="grid gap-4">
              {dict.experience.items.map((item) => (
                <article className="xp-item" key={`${item.role}-${item.company}`}>
                  <div>
                    <p className="font-mono text-[12px] text-accent">{item.period}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-text-primary">{item.role}</h3>
                    <p className="mt-1 text-[15px] text-text-secondary">{item.company}</p>
                    <p className="mt-1 font-mono text-[11.5px] text-text-muted">{item.place}</p>
                  </div>
                  <ul className="grid gap-3">
                    {item.bullets.map((bullet) => (
                      <li className="xp-bullet" key={bullet}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="edu-block rounded-lg border border-border bg-bg-card p-6 md:p-7">
              <p className="tile-label">{dict.experience.educationLabel}</p>
              <div className="mt-4">
                {dict.experience.education.map((row) => (
                  <div className="edu-row" key={row.title}>
                    <div>
                      <p className="font-display text-[15px] font-semibold text-text-primary">{row.title}</p>
                      <p className="mt-0.5 text-[14px] text-text-secondary">{row.place}</p>
                    </div>
                    {row.period ? <span className="font-mono text-[11.5px] text-text-muted">{row.period}</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre-mi" className="bg-bg-primary py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{dict.about.label}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              {dict.about.heading}
            </h2>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="about-block">
              <p className="max-w-2xl text-[17px] leading-[1.75] text-text-secondary md:text-lg">{dict.about.intro}</p>
              <p className="mt-5 max-w-2xl text-[17px] leading-[1.75] text-text-secondary md:text-lg">{dict.about.body}</p>

              <ul className="mt-9 grid gap-3">
                {dict.about.facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <li className="about-fact" key={fact.label}>
                      <span className="about-fact-icon">
                        <Icon size={18} />
                      </span>
                      {fact.label}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={contact.linkedin} className="btn-primary" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon size={18} />
                  LinkedIn
                </Link>
                <Link href={contact.github} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon size={18} />
                  GitHub
                </Link>
              </div>
            </div>

            <div className="about-block">
              <p className="section-label">{dict.about.stackLabel}</p>
              <div className="stack-grid mt-5 grid gap-3">
                {dict.stackLevels.map((level) => (
                  <div className="stack-group" key={level.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.04em] text-text-primary">
                        {level.title}
                      </h3>
                      <span className="stack-level-note">{level.note}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {level.items.map((item) => (
                        <span className="stack-chip" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="porque" className="relative overflow-hidden bg-bg-secondary py-24 md:py-32">
        <div className="seba-watermark pointer-events-none absolute inset-x-0 top-8 text-center font-display text-[24vw] font-bold leading-none text-[#1A1E26] md:top-0" aria-hidden="true">
          SEBA
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{dict.practices.label}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              {dict.practices.heading}
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {dict.practices.items.map((practice) => {
              const Icon = practice.icon;
              return (
                <div className="reason-item" key={practice.title}>
                  <div className="flex items-center justify-between border-b border-border pb-5">
                    <span className="count-number font-display text-5xl font-semibold text-accent" data-value={practice.number}>
                      {String(practice.number).padStart(2, '0')}
                    </span>
                    <Icon className="text-text-muted" size={25} />
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-semibold text-text-primary">{practice.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary">{practice.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-bg-primary py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.72fr)] lg:gap-16">
          <div className="contact-block">
            <p className="section-label">{dict.contact.label}</p>
            <div className="mt-5">
              <ContactTitle title={dict.contact.title} />
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-[1.7] text-text-secondary md:text-xl">
              {dict.contact.copy}
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <Link className="direct-action" href={`mailto:${contact.email}`}>
                <Mail size={20} />
                {dict.contact.mail}
                <ExternalLink size={16} />
              </Link>
              <Link className="direct-action" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon size={20} />
                LinkedIn
                <ExternalLink size={16} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-text-muted">
              <span>{dict.contact.social}</span>
              <Link className="social-link" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={19} />
              </Link>
              <Link className="social-link" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon size={19} />
              </Link>
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action={localizedHref(locale, '/gracias')}
            className="contact-block contact-form rounded-md border border-border bg-bg-card p-5 md:p-7"
            onSubmit={() => setIsSubmitting(true)}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                No llenar:
                <input name="bot-field" />
              </label>
            </p>

            <div className="floating-field">
              <input id="name" name="name" type="text" placeholder=" " required />
              <label htmlFor="name">{dict.contact.formName}</label>
            </div>

            <div className="floating-field">
              <input id="email" name="email" type="email" placeholder=" " required />
              <label htmlFor="email">{dict.contact.formEmail}</label>
            </div>

            <div className="floating-field">
              <textarea id="message" name="message" rows={6} placeholder=" " required />
              <label htmlFor="message">{dict.contact.formMessage}</label>
            </div>

            <button className="btn-primary w-full justify-center" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="loading-dots" aria-label={dict.contact.formSending}>
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                <>
                  {dict.contact.formSubmit}
                  <Send size={18} />
                </>
              )}
            </button>

            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {dict.contact.formDirectPre}{' '}
              <Link className="text-accent hover:text-accent-soft" href={`mailto:${contact.email}`}>
                {contact.email}
              </Link>
              .
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-bg-primary py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 text-sm text-text-muted md:flex-row md:items-center md:px-8">
          <span>sebaviglione.com · {new Date().getFullYear()}</span>
          <span className="hidden h-px flex-1 bg-border md:block" />
          <span className="typewriter">{dict.footer.tagline}</span>
        </div>
      </footer>
    </main>
  );
}
