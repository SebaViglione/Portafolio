import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/CaseStudyPage';

export const metadata: Metadata = {
  title: 'Depósitos CPS: stock entre depósitos y obras | Sebastián Viglione',
  description:
    'Case study: sistema interno de stock para Grupo CPS. Kardex inmutable, costeo promedio ponderado, RPCs transaccionales y RLS en PostgreSQL, herramientas por número de serie. Next.js, Supabase.',
  alternates: {
    canonical: '/stock',
    languages: { es: '/stock', en: '/en/stock' },
  },
  openGraph: {
    title: 'Depósitos CPS: stock entre depósitos y obras',
    description:
      'Sistema interno de stock sobre un kardex inmutable: compras, transferencias, vales con rendición y herramientas por serie. La lógica vive en PostgreSQL.',
    url: 'https://sebaviglione.com/stock',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/stock-es.png', width: 1200, height: 630, alt: 'Depósitos CPS · case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Depósitos CPS: stock entre depósitos y obras',
    description: 'Case study técnico: Next.js, Supabase self-hosted y un kardex inmutable con las reglas de negocio en PostgreSQL.',
    images: ['/assets/og/stock-es.png'],
  },
};

export default function Stock() {
  return <CaseStudyPage locale="es" slug="stock" />;
}
