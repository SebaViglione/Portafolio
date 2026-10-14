import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/CaseStudyPage';

export const metadata: Metadata = {
  title: 'Arce: market intelligence on public procurement | Sebastián Viglione',
  description:
    'Arce case study: statistics over the history of Uruguay’s public purchases (what to sell, at what price and against whom) with TypeScript, PostgreSQL and an AI that interprets them.',
  alternates: {
    canonical: '/en/arce',
    languages: { es: '/arce', en: '/en/arce' },
  },
  openGraph: {
    title: 'Arce: market intelligence on public procurement',
    description:
      'What to sell to the State, at what price and against whom: statistics in PostgreSQL and an AI that interprets them without making up figures. Technical case study.',
    url: 'https://sebaviglione.com/en/arce',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'article',
    images: [{ url: '/assets/og/arce.png', width: 1200, height: 630, alt: 'Arce · case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arce: market intelligence on public procurement',
    description: 'Technical case study: TypeScript, PostgreSQL, materialized views and AI (Ollama or Anthropic).',
    images: ['/assets/og/arce.png'],
  },
};

export default function ArceEn() {
  return <CaseStudyPage locale="en" slug="arce" />;
}
