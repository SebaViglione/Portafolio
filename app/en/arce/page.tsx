import type { Metadata } from 'next';
import { ArcePage } from '@/components/ArcePage';

export const metadata: Metadata = {
  title: 'Arce — Tender monitoring with local AI | Sebastián Viglione',
  description:
    'Arce case study: a system that monitors, structures and analyzes public tenders with Python, n8n, PostgreSQL and local AI (Ollama).',
  alternates: {
    canonical: '/en/arce',
    languages: { es: '/arce', en: '/en/arce' },
  },
  openGraph: {
    title: 'Arce — Tender monitoring with local AI',
    description:
      'A system that monitors, structures and analyzes public tenders with Python, n8n, PostgreSQL and local AI. Technical case study.',
    url: 'https://sebaviglione.com/en/arce',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'article',
    images: [{ url: '/assets/og/arce.png', width: 1200, height: 630, alt: 'Arce — case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arce — Tender monitoring with local AI',
    description: 'Technical case study: Python, n8n, PostgreSQL and local AI (Ollama).',
    images: ['/assets/og/arce.png'],
  },
};

export default function ArceEn() {
  return <ArcePage locale="en" />;
}
