import type { Metadata } from 'next';
import { SystemDiagramPage } from '@/components/SystemDiagramPage';

export const metadata: Metadata = {
  title: 'Arce: interactive system diagram | Sebastián Viglione',
  description:
    'How Arce works, in a diagram you can move around: from the public procurement portal to the dashboard, the n8n workflow, local AI analysis and the team’s feedback.',
  alternates: {
    canonical: '/en/arce/diagrama',
    languages: { es: '/arce/diagrama', en: '/en/arce/diagrama' },
  },
  openGraph: {
    title: 'Arce: interactive system diagram',
    description: 'Four views of Arce in an interactive diagram: n8n, scraper, PostgreSQL, local AI and dashboard.',
    url: 'https://sebaviglione.com/en/arce/diagrama',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'article',
    images: [{ url: '/assets/og/arce.png', width: 1200, height: 630, alt: 'Arce · system diagram' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arce: interactive system diagram',
    description: 'Four views of Arce in an interactive diagram: n8n, scraper, PostgreSQL, local AI and dashboard.',
    images: ['/assets/og/arce.png'],
  },
};

export default function ArceDiagramaEn() {
  return <SystemDiagramPage locale="en" project="arce" />;
}
