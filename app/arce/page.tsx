import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/CaseStudyPage';

export const metadata: Metadata = {
  title: 'Arce: monitoreo de licitaciones con IA local | Sebastián Viglione',
  description:
    'Case study de Arce: sistema que monitorea, estructura y analiza licitaciones públicas con n8n, Node.js, PostgreSQL e IA local (Ollama).',
  alternates: {
    canonical: '/arce',
    languages: { es: '/arce', en: '/en/arce' },
  },
  openGraph: {
    title: 'Arce: monitoreo de licitaciones con IA local',
    description:
      'Sistema que monitorea, estructura y analiza licitaciones públicas con n8n, Node.js, PostgreSQL e IA local. Case study técnico.',
    url: 'https://sebaviglione.com/arce',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/arce.png', width: 1200, height: 630, alt: 'Arce · case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arce: monitoreo de licitaciones con IA local',
    description: 'Case study técnico: n8n, Node.js, PostgreSQL e IA local (Ollama).',
    images: ['/assets/og/arce.png'],
  },
};

export default function Arce() {
  return <CaseStudyPage locale="es" slug="arce" />;
}
