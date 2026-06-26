import type { Metadata } from 'next';
import { ArcePage } from '@/components/ArcePage';

export const metadata: Metadata = {
  title: 'Arce — Monitoreo de licitaciones con IA local | Sebastián Viglione',
  description:
    'Case study de Arce: sistema que monitorea, estructura y analiza licitaciones públicas con Python, n8n, PostgreSQL e IA local (Ollama).',
  alternates: {
    canonical: '/arce',
    languages: { es: '/arce', en: '/en/arce' },
  },
  openGraph: {
    title: 'Arce — Monitoreo de licitaciones con IA local',
    description:
      'Sistema que monitorea, estructura y analiza licitaciones públicas con Python, n8n, PostgreSQL e IA local. Case study técnico.',
    url: 'https://sebaviglione.com/arce',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/arce.png', width: 1200, height: 630, alt: 'Arce — case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arce — Monitoreo de licitaciones con IA local',
    description: 'Case study técnico: Python, n8n, PostgreSQL e IA local (Ollama).',
    images: ['/assets/og/arce.png'],
  },
};

export default function Arce() {
  return <ArcePage locale="es" />;
}
