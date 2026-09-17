'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ArrowLeft, ArrowRight, ExternalLink, Languages, Mail } from 'lucide-react';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import { CustomCursor } from '@/components/CustomCursor';
import { contact } from '@/lib/site';
import { getDictionary, localizedHref, type Locale } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Página comercial (/servicios): servicios, forma de trabajo con clientes y
 * sitios institucionales. Accesible por URL directa; no se enlaza desde la
 * navegación de la home, que es la página de candidato.
 */
export function ServicesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const page = dict.servicesPage;
  const home = locale === 'es' ? '/' : '/en';
  const switchHref = locale === 'es' ? '/en/servicios' : '/servicios';
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

      gsap.from('.service-card', {
        y: 34,
        opacity: 0,
        duration: 0.72,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#servicios', start: 'top 70%' },
      });

      gsap.utils.toArray<SVGPathElement>('.service-icon-path').forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: path.closest('.service-card'), start: 'top 78%' },
        });
      });

      gsap.from('.reason-item', {
        x: -34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#como-trabajo', start: 'top 70%' },
      });

      gsap.utils.toArray<HTMLElement>('.count-number').forEach((number) => {
        const value = Number(number.dataset.value || '0');
        const counter = { value: 0 };
        gsap.to(counter, {
          value,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: number, start: 'top 82%' },
          onUpdate: () => {
            number.textContent = String(Math.round(counter.value)).padStart(2, '0');
          },
        });
      });

      gsap.from('.site-mini', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        clearProps: 'transform,opacity',
        ease: 'power3.out',
        scrollTrigger: { trigger: '.sites-strip', start: 'top 85%' },
      });
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <main ref={rootRef} className="min-h-screen overflow-hidden bg-bg-primary text-text-primary">
      <CustomCursor />

      <header className="case-topbar fixed inset-x-0 top-0 z-50 border-b border-border/70 supports-[backdrop-filter]:backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href={home} className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary">
            <ArrowLeft size={18} className="flex-none" />
            <span className="sm:hidden">{page.back}</span>
            <span className="hidden sm:inline">{page.backFull}</span>
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
        <div className="case-hero relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
          <p className="section-label">{page.kicker}</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.02] text-text-primary sm:text-5xl md:text-6xl">
            {page.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-text-secondary md:text-xl">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#contacto" className="btn-primary">
              {page.contactCta}
              <ArrowRight size={18} />
            </Link>
            <Link href={`mailto:${contact.email}`} className="btn-secondary">
              <Mail size={18} />
              {page.contactMail}
            </Link>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading case-block max-w-3xl">
            <p className="section-label">{dict.services.label}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              {dict.services.heading}
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {dict.services.items.map((service) => {
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
                    {dict.services.more} <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="como-trabajo" className="relative overflow-hidden bg-bg-secondary py-24 md:py-32">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading case-block max-w-3xl">
            <p className="section-label">{dict.reasons.label}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              {dict.reasons.heading}
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {dict.reasons.items.map((reason) => {
              const Icon = reason.icon;
              return (
                <div className="reason-item" key={reason.title}>
                  <div className="flex items-center justify-between border-b border-border pb-5">
                    <span className="count-number font-display text-5xl font-semibold text-accent" data-value={reason.number}>
                      {String(reason.number).padStart(2, '0')}
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

      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="section-heading case-block max-w-3xl">
            <p className="section-label">{page.systemsLabel}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
              {page.systemsHeading}
            </h2>
          </div>

          <div className="case-block mt-12 grid gap-3">
            {dict.work.tools.map((tool) => (
              <Link className="svc-item group" href={localizedHref(locale, tool.url)} key={tool.name}>
                <span className="font-mono text-[11px] text-accent">{tool.label}</span>
                <span className="font-display text-[15px] font-semibold text-text-primary">{tool.name}</span>
                <span className="hidden max-w-xl text-[14px] text-text-secondary lg:inline">{tool.description}</span>
                <span className="ml-auto inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
                  {page.systemsCta}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" size={15} />
                </span>
              </Link>
            ))}
          </div>

          <div className="section-heading case-block mt-24 max-w-3xl">
            <p className="section-label">{page.sitesLabel}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
              {page.sitesHeading}
            </h2>
          </div>

          <div className="sites-strip mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.work.sites.map((site) => (
              <Link
                className="site-mini group overflow-hidden rounded-md border border-border bg-bg-card"
                href={site.url}
                key={site.name}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={dict.work.cursorLabel}
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-secondary">
                  {site.image ? (
                    <Image
                      src={site.image}
                      alt={site.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="placeholder-pattern absolute inset-0" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/30 to-transparent" aria-hidden="true" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-display text-[16px] font-semibold text-text-primary">{site.name}</span>
                      <span className="mt-0.5 block font-mono text-[11px] text-text-muted">{site.domain}</span>
                    </div>
                    <ExternalLink
                      className="ml-auto shrink-0 text-text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      size={15}
                    />
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.6] text-text-secondary">{site.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-24 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="case-block rounded-md border border-border bg-bg-card p-7 md:p-10">
            <h2 className="font-display text-2xl font-semibold text-text-primary md:text-3xl">{page.contactHeading}</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-text-secondary">{page.contactText}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`${home}#contacto`} className="btn-primary">
                {page.contactCta}
                <ArrowRight size={18} />
              </Link>
              <Link href={`mailto:${contact.email}`} className="btn-secondary">
                <Mail size={18} />
                {contact.email}
              </Link>
            </div>
          </div>
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
