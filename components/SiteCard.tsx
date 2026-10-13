import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/content';

/** Tarjeta de un sitio web en línea: captura, nombre, dominio, origen y una línea de contexto. Sin case study. */
export function SiteCard({ site, cursorLabel }: { site: Project; cursorLabel: string }) {
  return (
    <Link
      className="site-mini group overflow-hidden rounded-md border border-border bg-bg-card"
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor={cursorLabel}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-secondary">
        {site.image ? (
          <Image
            src={site.image}
            alt={site.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 92vw"
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
        <span className="area-tag mt-3 inline-block">{site.kind}</span>
        <p className="mt-3 text-[14px] leading-[1.6] text-text-secondary">{site.description}</p>
      </div>
    </Link>
  );
}
