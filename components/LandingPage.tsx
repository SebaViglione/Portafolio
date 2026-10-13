'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ArrowDown, ArrowRight, ExternalLink, Languages, Mail, Send } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons';
import { CustomCursor } from '@/components/CustomCursor';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { SiteCard } from '@/components/SiteCard';
import BlurText from '@/components/ui/BlurText';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SplitText from '@/components/ui/SplitText';
import TextType from '@/components/ui/TextType';
import { BorderBeam } from '@/components/ui/border-beam';
import { contact } from '@/lib/site';
import { getDictionary, localizedHref, type Locale } from '@/lib/content';

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

function SectionTitle({ text }: { text: string }) {
  return (
    <SplitText
      tag="h2"
      text={text}
      splitType="words"
      textAlign="left"
      delay={45}
      duration={0.8}
      ease="power3.out"
      from={{ opacity: 0, y: 28 }}
      to={{ opacity: 1, y: 0 }}
      rootMargin="-60px"
      className="mt-4 block font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl"
    />
  );
}

function ContactTitle({ title }: { title: ReturnType<typeof getDictionary>['contact']['title'] }) {
  return (
    <h2 className="contact-title font-display text-[2.5rem] font-bold leading-[1.02] tracking-normal text-text-primary sm:text-[3.4rem] xl:text-[4.3rem]">
      <BlurText as="span" text={title.l1} className="block" delay={90} threshold={0.4} />
      {title.l2 ? <BlurText as="span" text={title.l2} className="block" delay={90} threshold={0.4} /> : null}
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
      gsap.set('.hero-kicker, .hero-copy, .hero-actions, .hero-mobile-portrait', { y: 18, opacity: 0 });
      gsap.set('.hero-portrait', { y: 24, opacity: 0, scale: 0.97 });
      gsap.set('.hero-area', { y: 16, opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.site-nav', { y: -22, opacity: 0, duration: 0.6 })
        .to('.hero-mobile-portrait', { y: 0, opacity: 1, duration: 0.45 }, '-=0.3')
        .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.45 }, '-=0.3')
        .to(heroWords, { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.68, stagger: 0.06 }, '-=0.25')
        .to('.hero-portrait', { y: 0, opacity: 1, scale: 1, duration: 0.8, clearProps: 'transform' }, '-=0.7')
        .to('.hero-copy', { y: 0, opacity: 1, duration: 0.55 }, '-=0.45')
        .to('.hero-actions', { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .to('.hero-area', { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, clearProps: 'transform' }, '-=0.25');

      gsap.from('.xp-role, .xp-area, .edu-block', {
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
    <MotionConfig reducedMotion="user">
    <main ref={rootRef} className="min-h-screen overflow-x-clip bg-bg-primary text-text-primary">
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

      <section id="inicio" className="hero-section relative flex flex-col justify-center overflow-hidden pt-20">
        <BackgroundGrid />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-10 md:px-8 md:pt-16 lg:pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="hero-mobile-portrait mb-7 flex items-center gap-4 lg:hidden">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-bg-secondary">
                  <Image
                    src="/assets/img/profile.webp"
                    alt={dict.hero.portraitAlt}
                    fill
                    priority
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-text-primary">{dict.hero.portraitName}</span>
                  <span className="block font-mono text-[11px] text-accent">{dict.hero.portraitRole}</span>
                </span>
              </div>

              <div className="hero-kicker inline-flex items-center gap-3 font-mono text-[13px] font-medium text-text-secondary">
                <span className="pulse-dot" />
                {dict.hero.status}
              </div>

              <div className="mt-6">
                <HeroTitle title={dict.hero.title} />
              </div>

              <p className="hero-copy mt-7 max-w-2xl text-[17px] leading-[1.7] text-text-secondary md:text-lg">
                {dict.hero.copy}
              </p>

              <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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

            <figure className="hero-portrait relative hidden overflow-hidden rounded-2xl border border-border bg-bg-secondary/70 lg:block">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/assets/img/profile.webp"
                  alt={dict.hero.portraitAlt}
                  fill
                  priority
                  sizes="360px"
                  className="object-contain object-bottom saturate-[0.85]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg-secondary/95" aria-hidden="true" />
              </div>
              <figcaption className="flex items-center justify-between gap-3 border-t border-border bg-bg-primary px-4 py-3">
                <span className="text-[13px] font-semibold text-text-primary">{dict.hero.portraitName}</span>
                <span className="text-right font-mono text-[11px] text-accent">{dict.hero.portraitRole}</span>
              </figcaption>
              <BorderBeam size={120} duration={10} borderWidth={1.5} />
            </figure>
          </div>

          <div className="mt-14 border-t border-border pt-8">
            <p className="tile-label">{dict.hero.areasLabel}</p>
            <ul className="mt-5 grid gap-6 md:grid-cols-3 md:gap-8">
              {dict.hero.areas.map((area) => {
                const Icon = area.icon;
                return (
                  <li className="hero-area flex gap-4" key={area.title}>
                    <span className="area-icon">
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-[16px] font-semibold text-text-primary">{area.title}</span>
                        {area.tag ? <span className="area-tag">{area.tag}</span> : null}
                      </span>
                      <span className="mt-1 block text-[14.5px] leading-[1.55] text-text-secondary">{area.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section id="trabajos" className="bg-bg-primary py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-mono text-[13px] font-medium text-accent">{dict.work.monoLabel}</p>
              <SectionTitle text={dict.work.heading} />
            </div>
            <span className="inline-flex items-center gap-2.5 rounded-md border border-border px-3.5 py-2.5 font-mono text-xs text-text-secondary">
              <span className="pulse-dot" />
              {dict.work.statusChip}
            </span>
          </div>

          <ProjectShowcase
            projects={tools}
            locale={locale}
            labels={dict.work.summaryLabels}
            cursorLabel={dict.work.cursorLabel}
          />

          <div className="sites-block mt-24 border-t border-border pt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="section-label">{dict.work.sitesLabel}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-text-primary md:text-3xl">
                  {dict.work.sitesHeading}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-text-secondary">{dict.work.sitesNote}</p>
              </div>
            </div>
            <div className="sites-strip mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sites.map((site) => (
                <SiteCard site={site} cursorLabel={dict.work.cursorLabel} key={site.name} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experiencia" className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading max-w-3xl">
            <p className="section-label">{dict.experience.label}</p>
            <SectionTitle text={dict.experience.heading} />
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <div>
              <div className="xp-role">
                <p className="font-mono text-[12px] text-accent">{dict.experience.role.period}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-text-primary md:text-[1.9rem]">
                  {dict.experience.role.title}
                </h3>
                <p className="mt-1.5 text-[15px] text-text-secondary">
                  {dict.experience.role.company}
                  <span className="font-mono text-[12px] text-text-muted"> · {dict.experience.role.place}</span>
                </p>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.6] text-text-muted">{dict.experience.role.scope}</p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {dict.experience.areas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <SpotlightCard
                      className={`xp-area decision-card${area.tag && area.links.length ? ' is-main' : ''}`}
                      key={area.title}
                      spotlightColor="#B8FF2C"
                      intensity={0.1}
                      spotlightSize={280}
                      borderGlow={0.55}
                      flare={false}
                    >
                      <div className="flex items-center gap-3">
                        <span className="area-icon">
                          <Icon size={18} />
                        </span>
                        <h4 className="font-display text-lg font-semibold text-text-primary">{area.title}</h4>
                        {area.tag ? <span className="area-tag ml-auto">{area.tag}</span> : null}
                      </div>
                      <ul className="mt-4 grid gap-2.5">
                        {area.bullets.map((bullet) => (
                          <li className="xp-bullet" key={bullet}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      {area.links.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {area.links.map((link) => (
                            <Link className="area-link" href={localizedHref(locale, link.href)} key={link.href}>
                              {link.label}
                              <ArrowRight size={13} />
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </SpotlightCard>
                  );
                })}
              </div>
            </div>

            <div className="edu-block h-fit rounded-lg border border-border bg-bg-card p-6 md:p-7">
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
            <SectionTitle text={dict.about.heading} />
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
            className="contact-block contact-form relative rounded-md border border-border bg-bg-card p-5 md:p-7"
            onSubmit={() => setIsSubmitting(true)}
          >
            <BorderBeam size={140} duration={9} borderWidth={1.5} />
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
          <TextType
            as="span"
            className="font-mono text-[13px] text-text-muted"
            text={dict.footer.tagline}
            loop={false}
            typingSpeed={38}
            startOnVisible
            cursorCharacter="_"
            cursorClassName="text-accent"
          />
        </div>
      </footer>
    </main>
    </MotionConfig>
  );
}
