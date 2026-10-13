'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Safari } from '@/components/ui/safari';
import { localizedHref, type Locale, type Project } from '@/lib/content';

type SummaryLabels = { problem: string; decision: string; result: string };

function ProjectMockup({ project }: { project: Project }) {
  return project.video ? (
    <Safari videoSrc={project.video} />
  ) : (
    <Safari imageSrc={project.image} imageAlt={project.name} />
  );
}

/**
 * Proyectos de la home. En desktop, la lista avanza con el scroll y el navegador
 * de la derecha queda fijo mostrando la captura del proyecto activo (el que cruza
 * el centro de la pantalla). En celular cada proyecto lleva su propia captura.
 */
export function ProjectShowcase({
  projects,
  locale,
  labels,
  cursorLabel,
}: {
  projects: Project[];
  locale: Locale;
  labels: SummaryLabels;
  cursorLabel: string;
}) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    itemRefs.current[index]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <div className="showcase mt-12 grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <div className="grid gap-16 lg:gap-0">
        {projects.map((project, index) => {
          const href = localizedHref(locale, project.url);
          return (
            <article
              className="showcase-item lg:flex lg:min-h-[72vh] lg:flex-col lg:justify-center"
              data-index={index}
              data-active={index === active}
              key={project.name}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
            >
              <div className="mb-7 lg:hidden">
                <ProjectMockup project={project} />
              </div>

              <p className="font-mono text-[12px] lowercase text-text-muted">
                <span className="showcase-index">{String(index + 1).padStart(2, '0')}</span>
                {' · '}
                {project.kind}
                {project.year ? ` · ${project.year}` : ''}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-text-primary md:text-[2.2rem]">
                <Link href={href} data-cursor={cursorLabel}>
                  {project.name}
                </Link>
              </h3>

              {project.summary ? (
                <dl className="mt-6 grid gap-4">
                  {(['problem', 'decision', 'result'] as const).map((key) => (
                    <div className="showcase-row" key={key}>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent">{labels[key]}</dt>
                      <dd className="mt-1 text-[15.5px] leading-[1.6] text-text-secondary">{project.summary?.[key]}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-5 text-[15.5px] leading-[1.65] text-text-secondary">{project.description}</p>
              )}

              <p className="mt-6 font-mono text-[11.5px] lowercase text-text-muted">{project.tags.join(' · ')}</p>
              <Link
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent"
                href={href}
                data-cursor={cursorLabel}
              >
                {project.cta}
                <ArrowRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="showcase-frame relative rounded-xl p-2">
            <GlowingEffect disabled={false} glow spread={36} proximity={80} inactiveZone={0.01} borderWidth={1} />
            <div className="relative">
              {projects.map((project, index) => (
                <div
                  className={`showcase-shot ${index === 0 ? 'relative' : 'absolute inset-0'}`}
                  data-active={index === active}
                  aria-hidden={index !== active}
                  key={project.name}
                >
                  <ProjectMockup project={project} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="tablist">
            {projects.map((project, index) => (
              <button
                className="showcase-tab"
                data-active={index === active}
                role="tab"
                aria-selected={index === active}
                key={project.name}
                type="button"
                onClick={() => goTo(index)}
              >
                <span className="font-mono text-[11px] text-accent">{String(index + 1).padStart(2, '0')}</span>
                {project.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
