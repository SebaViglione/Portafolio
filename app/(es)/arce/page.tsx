import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/CaseStudyPage';

export const metadata: Metadata = {
  title: 'Arce: inteligencia de mercado sobre compras estatales | Sebastián Viglione',
  description:
    'Case study de Arce: estadísticas sobre el histórico de compras estatales de Uruguay (qué vender, a qué precio y contra quién) con TypeScript, PostgreSQL y una IA que las interpreta.',
  alternates: {
    canonical: '/arce',
    languages: { es: '/arce', en: '/en/arce' },
  },
  openGraph: {
    title: 'Arce: inteligencia de mercado sobre compras estatales',
    description:
      'Qué venderle al Estado, a qué precio y contra quién: estadísticas en PostgreSQL y una IA que las interpreta sin inventar cifras. Case study técnico.',
    url: 'https://sebaviglione.com/arce',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/arce.png', width: 1200, height: 630, alt: 'Arce · case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arce: inteligencia de mercado sobre compras estatales',
    description: 'Case study técnico: TypeScript, PostgreSQL, vistas materializadas e IA (Ollama o Anthropic).',
    images: ['/assets/og/arce.png'],
  },
};

export default function Arce() {
  return <CaseStudyPage locale="es" slug="arce" />;
}
