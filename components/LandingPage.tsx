'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ExternalLink,
  Mail,
  Send,
} from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon } from '@/components/BrandIcons';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import { CustomCursor } from '@/components/CustomCursor';
import { contact, navItems, projects, reasons, services, type Project } from '@/lib/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const brandText = 'Seba Viglione';
const glyphMap: Record<string, string[]> = {
  a: ['@', '4'],
  e: ['3'],
  i: ['1', '!'],
  l: ['1', '|'],
  o: ['0'],
  s: ['5', '$'],
  S: ['5', '$'],
  b: ['8'],
  g: ['9'],
};

const brandGlyphIndexes = brandText
  .split('')
  .map((character, index) => (glyphMap[character] ? index : -1))
  .filter((index) => index >= 0);

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

function HeroTitle() {
  return (
    <h1 className="hero-title font-display text-[2.62rem] font-bold leading-[0.96] tracking-normal text-text-primary sm:text-[3.65rem] md:text-[4.35rem] xl:text-[5.15rem]">
      <span className="sr-only">Hago software que ordena tu operación.</span>
      <span className="hero-title-line block">{splitWords('Hago software')}</span>
      <span className="hero-title-line block">{splitWords('que ordena')}</span>
      <span className="block">
        {splitWords('tu')}{' '}
        <span className="highlight-word">{splitWords('operación.', 'highlight-word-text')}</span>
      </span>
    </h1>
  );
}

function ContactTitle() {
  return (
    <h2 className="contact-title font-display text-[2.7rem] font-bold leading-[0.98] tracking-normal text-text-primary sm:text-[3.45rem] md:text-[4.6rem] xl:text-[5.8rem]">
      <span className="sr-only">¿Tenés un proyecto en mente?</span>
      <span className="block">{splitWords('¿Tenés un proyecto')}</span>
      <span className="block">{splitWords('en mente?')}</span>
    </h2>
  );
}

function ScrambleBrand() {
  const [text, setText] = useState(brandText);
  const timeoutRef = useRef<number | null>(null);
  const restoreRef = useRef<number | null>(null);

  useEffect(() => {
    const scheduleNextGlyph = () => {
      timeoutRef.current = window.setTimeout(() => {
        const index = brandGlyphIndexes[Math.floor(Math.random() * brandGlyphIndexes.length)];
        const originalCharacter = brandText[index];
        const replacements = glyphMap[originalCharacter] ?? [originalCharacter];
        const nextText = brandText.split('');

        nextText[index] = replacements[Math.floor(Math.random() * replacements.length)];
        setText(nextText.join(''));

        restoreRef.current = window.setTimeout(() => {
          setText(brandText);
          scheduleNextGlyph();
        }, 180 + Math.random() * 140);
      }, 360 + Math.random() * 680);
    };

    scheduleNextGlyph();

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      if (restoreRef.current) {
        window.clearTimeout(restoreRef.current);
      }
    };
  }, []);

  return (
    <span className="brand-mark" aria-hidden="true">
      {text}
    </span>
  );
}

function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="project-media relative aspect-[16/10] overflow-hidden bg-bg-secondary">
      {project.video ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={`Video de ${project.name}`}
        >
          <source src={project.video} type="video/webm" />
        </video>
      ) : project.image ? (
        <Image
          src={project.image}
          alt={`Captura de ${project.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 58vw, 92vw"
          className="object-cover"
        />
      ) : (
        <div className="placeholder-pattern flex h-full flex-col justify-between p-5 md:p-7">
          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.04em] text-text-muted">
            <span>{project.domain}</span>
            <ExternalLink size={16} />
          </div>
          <div>
            <span className="font-display text-6xl font-bold text-text-primary/90 md:text-7xl">{project.label}</span>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-text-secondary">{project.kind}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function LandingPage() {
  const rootRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);
  const projectCarouselRef = useRef<HTMLDivElement>(null);
  const projectIndexRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectCarouselPaused, setProjectCarouselPaused] = useState(false);

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

  const scrollProjectCarousel = useCallback((direction = 1) => {
    const carousel = projectCarouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll<HTMLElement>('.project-carousel-card'));
    if (!cards.length) return;

    projectIndexRef.current = (projectIndexRef.current + direction + cards.length) % cards.length;
    carousel.scrollTo({
      left: cards[projectIndexRef.current].offsetLeft - carousel.offsetLeft,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const carousel = projectCarouselRef.current;
    if (!carousel) return;

    const resetCarousel = () => {
      projectIndexRef.current = 0;
      carousel.scrollTo({ left: 0, behavior: 'auto' });
    };

    resetCarousel();
    const frame = window.requestAnimationFrame(resetCarousel);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (projectCarouselPaused) return;

    const interval = window.setInterval(() => {
      scrollProjectCarousel(1);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [projectCarouselPaused, scrollProjectCarousel]);

  useGSAP(
    () => {
      const heroWords = gsap.utils.toArray<HTMLElement>('.hero-title .word');
      const contactWords = gsap.utils.toArray<HTMLElement>('.contact-title .word');

      gsap.set(heroWords, { yPercent: -90, opacity: 0, rotateX: -28 });
      gsap.set(contactWords, { yPercent: -70, opacity: 0, rotateX: -24 });
      gsap.set('.hero-copy, .hero-actions, .scroll-cue, .hero-portrait, .hero-portrait-mobile', { y: 22, opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.site-nav', { y: -22, opacity: 0, duration: 0.6 })
        .from('.hero-kicker', { y: -18, opacity: 0, duration: 0.5 }, '-=0.2')
        .to(heroWords, { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.72, stagger: 0.065 }, '-=0.05')
        .to('.hero-copy', { y: 0, opacity: 1, duration: 0.58 }, '-=0.18')
        .to('.hero-actions', { y: 0, opacity: 1, duration: 0.5 }, '-=0.25')
        .to('.hero-portrait, .hero-portrait-mobile', { y: 0, opacity: 1, duration: 0.75 }, '-=0.45')
        .to('.scroll-cue', { y: 0, opacity: 1, duration: 0.4 }, '-=0.35');

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

      gsap.from('.service-card', {
        y: 34,
        opacity: 0,
        duration: 0.72,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#servicios',
          start: 'top 64%',
        },
      });

      gsap.utils.toArray<SVGPathElement>('.service-icon-path').forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: path.closest('.service-card'),
            start: 'top 78%',
          },
        });
      });

      gsap.from('.project-carousel-card', {
        y: 24,
        opacity: 0,
        duration: 0.58,
        stagger: 0.08,
        clearProps: 'transform,opacity',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#trabajos',
          start: 'top 58%',
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

      gsap.to(contactWords, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.58,
        stagger: 0.045,
        ease: 'power3.out',
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
    { scope: rootRef },
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
          <Link href="#inicio" className="brand-link font-display text-lg font-semibold tracking-normal text-text-primary" aria-label="Seba Viglione">
            <ScrambleBrand />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link className="nav-link text-sm font-medium text-text-secondary" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="#contacto" className="nav-cta text-sm font-semibold">
              Hablemos
            </Link>
          </nav>

          <button
            ref={menuIconRef}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-md border border-border bg-bg-card text-text-primary lg:hidden"
            aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
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
              ref={menuPanelRef}
              className="mobile-menu-panel fixed inset-0 z-40 min-h-dvh px-6 pb-8 pt-28 lg:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    className="border-b border-border py-5 font-display text-4xl font-semibold text-text-primary"
                    href={item.href}
                    key={item.href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="#contacto" className="btn-primary mt-4 justify-center" onClick={closeMenu}>
                  Hablemos
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <section id="inicio" className="relative min-h-[100svh] overflow-hidden pt-28">
        <BackgroundGrid />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-7xl items-center px-5 pb-10 md:px-8 min-[1050px]:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.72fr)] min-[1050px]:gap-10 min-[1050px]:pb-14 xl:gap-16">
          <div className="max-w-[800px]">
            <div className="hero-kicker mb-7 inline-flex items-center gap-3 rounded-full border border-border bg-bg-secondary/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.04em] text-text-secondary">
              <span className="pulse-dot" />
              disponible para proyectos
            </div>

            <HeroTitle />

            <p className="hero-copy mt-7 max-w-2xl text-lg leading-[1.7] text-text-secondary md:text-xl">
              Desde el sitio web hasta el sistema interno que te ahorra horas de trabajo manual. Sin equipos grandes, sin procesos eternos.
            </p>

            <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center min-[1050px]:justify-start">
              <Link href={contact.whatsapp} className="btn-primary" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={19} />
                Hablemos por WhatsApp
              </Link>
              <Link href="#trabajos" className="btn-secondary">
                Ver trabajos
                <ArrowDown size={18} />
              </Link>
            </div>

            <div className="hero-portrait-mobile portrait-shell relative mx-auto mt-8 h-[340px] max-w-[340px] overflow-hidden sm:h-[420px] sm:max-w-[420px] md:h-[500px] md:max-w-[500px] min-[1050px]:hidden">
              <Image
                src="/assets/img/profile_pic_transparent.png"
                alt="Sebastián Viglione"
                fill
                priority
                sizes="(min-width: 768px) 500px, (min-width: 640px) 420px, 340px"
                className="portrait-image object-contain object-bottom"
              />
            </div>
          </div>

          <div className="hero-portrait pointer-events-none relative hidden min-h-[720px] min-[1050px]:block">
            <div className="portrait-shell absolute -inset-x-12 bottom-0 h-[720px] overflow-hidden xl:-inset-x-16 xl:h-[760px]">
              <Image
                src="/assets/img/profile_pic_transparent.png"
                alt="Sebastián Viglione"
                fill
                priority
                sizes="620px"
                className="portrait-image object-contain object-bottom"
              />
            </div>
            <div className="absolute bottom-8 right-6 rounded-md border border-border bg-bg-secondary/80 px-4 py-3 text-sm text-text-secondary backdrop-blur">
              <span className="block font-display text-xl font-semibold text-text-primary">Sebastián Viglione</span>
              Software a medida para empresas
            </div>
          </div>
        </div>

        <div className="scroll-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.04em] text-text-muted md:flex">
          <span>scroll</span>
          <span className="scroll-line" />
        </div>
      </section>

      <section id="servicios" className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading max-w-3xl">
            <p className="section-label">que puedo hacer por tu empresa</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              Soluciones a medida, sin vueltas.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article
                  className="service-card group relative min-h-[260px] overflow-hidden rounded-md border border-border bg-bg-card p-7 transition-colors duration-300"
                  key={service.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="absolute inset-y-0 left-0 w-1 scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
                  <div className="mb-9 flex h-12 w-12 items-center justify-center rounded-md border border-border bg-bg-secondary text-accent transition-transform duration-300 group-hover:rotate-[5deg] group-hover:scale-110">
                    <Icon size={24} />
                    <svg className="absolute h-12 w-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <path className="service-icon-path" d="M24 5 L43 24 L24 43 L5 24 Z" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-text-primary">{service.title}</h3>
                  <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-text-secondary">{service.text}</p>
                  <Link href="#contacto" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Más info <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="trabajos" className="bg-bg-primary py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading max-w-3xl">
            <p className="section-label">trabajos recientes</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              Cosas que hice que ya están funcionando.
            </h2>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 text-sm text-text-muted">
            <span className="inline-flex items-center gap-2">
              <ArrowLeftRight size={17} />
              Deslizá para ver más trabajos
            </span>
            <span className="project-scroll-meter" aria-hidden="true" />
          </div>

          <div className="project-carousel -mx-5 mt-5 overflow-hidden px-5 md:-mx-8 md:px-8" aria-label="Trabajos recientes">
            <div ref={projectCarouselRef} className="project-carousel-track flex gap-4 pb-4 pt-2">
              {projects.map((project, index) => (
                <article
                  className="project-carousel-card group relative overflow-hidden rounded-md border border-border bg-bg-card"
                  key={project.name}
                  data-cursor="VER"
                  onMouseEnter={() => setProjectCarouselPaused(true)}
                  onMouseLeave={() => setProjectCarouselPaused(false)}
                  onFocus={() => setProjectCarouselPaused(true)}
                  onBlur={() => setProjectCarouselPaused(false)}
                >
                  <Link
                    className="block h-full"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ProjectVisual project={project} priority={index === 0} />

                    <div className="flex min-h-[300px] flex-col p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-xs font-medium uppercase tracking-[0.04em] text-text-muted">
                            {project.domain}
                          </span>
                          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-text-primary">
                            {project.name}
                          </h3>
                        </div>
                        <span className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-accent">
                          {String((index % projects.length) + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <p className="mt-4 text-[15px] leading-[1.65] text-text-secondary">
                        {project.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span className="project-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-accent">
                        {project.cta}
                        <ExternalLink className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={17} />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
              <article
                className="project-carousel-card project-more-card relative overflow-hidden rounded-md border border-border bg-bg-card"
                onMouseEnter={() => setProjectCarouselPaused(true)}
                onMouseLeave={() => setProjectCarouselPaused(false)}
                onFocus={() => setProjectCarouselPaused(true)}
                onBlur={() => setProjectCarouselPaused(false)}
              >
                <div className="flex h-full min-h-[568px] flex-col justify-between p-6 md:p-7">
                  <span className="text-xs font-medium uppercase tracking-[0.04em] text-text-muted">próximamente</span>
                  <div>
                    <p className="font-display text-5xl font-semibold leading-none text-text-primary md:text-6xl">
                      y más...
                    </p>
                    <p className="mt-5 max-w-[18rem] text-[15px] leading-[1.7] text-text-secondary">
                      Hay más trabajos y sistemas que puedo mostrarte según lo que necesites resolver.
                    </p>
                  </div>
                  <Link href="#contacto" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Hablemos
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
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
            <p className="section-label">como trabajo</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              Sin agencias en el medio. Hablás directo conmigo.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div className="reason-item" key={reason.title}>
                  <div className="flex items-center justify-between border-b border-border pb-5">
                    <span className="count-number font-display text-5xl font-semibold text-accent" data-value={reason.number}>
                      00
                    </span>
                    <Icon className="text-text-muted" size={25} />
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-semibold text-text-primary">{reason.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary">{reason.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-bg-primary py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.72fr)] lg:gap-16">
          <div className="contact-block">
            <p className="section-label">contacto</p>
            <div className="mt-5">
              <ContactTitle />
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-[1.7] text-text-secondary md:text-xl">
              Contame qué necesitás. Sin compromisos, sin tecnicismos. Si puedo ayudarte, te lo digo. Si no, también.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <Link className="direct-action" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={20} />
                WhatsApp
                <ExternalLink size={16} />
              </Link>
              <Link className="direct-action" href={`mailto:${contact.email}`}>
                <Mail size={20} />
                Mail
                <ExternalLink size={16} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-text-muted">
              <span>También en redes:</span>
              <Link className="social-link" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon size={19} />
              </Link>
              <Link className="social-link" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={19} />
              </Link>
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/gracias"
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
              <label htmlFor="name">Tu nombre</label>
            </div>

            <div className="floating-field">
              <input id="email" name="email" type="email" placeholder=" " required />
              <label htmlFor="email">Tu email</label>
            </div>

            <div className="floating-field">
              <textarea id="message" name="message" rows={6} placeholder=" " required />
              <label htmlFor="message">¿En qué puedo ayudarte?</label>
            </div>

            <button className="btn-primary w-full justify-center" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="loading-dots" aria-label="Enviando">
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                <>
                  Mandar mensaje
                  <Send size={18} />
                </>
              )}
            </button>

            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Si preferís ir directo, escribime a{' '}
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
          <span className="typewriter">hecho por mí, obviamente.</span>
        </div>
      </footer>
    </main>
  );
}
