import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/CaseStudyPage';

export const metadata: Metadata = {
  title: 'Depósitos CPS: warehouse stock system | Sebastián Viglione',
  description:
    'Case study: internal stock system for Grupo CPS. Immutable ledger, weighted-average costing, transactional RPCs and RLS in PostgreSQL, serial-numbered tools. Next.js, Supabase.',
  alternates: {
    canonical: '/en/stock',
    languages: { es: '/stock', en: '/en/stock' },
  },
  openGraph: {
    title: 'Depósitos CPS: warehouse stock system',
    description:
      'Internal stock system on an immutable ledger: purchases, transfers, consumption vouchers with reconciliation and serial-numbered tools. Business logic lives in PostgreSQL.',
    url: 'https://sebaviglione.com/en/stock',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'article',
    images: [{ url: '/assets/og/stock-en.png', width: 1200, height: 630, alt: 'Depósitos CPS · case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Depósitos CPS: warehouse stock system',
    description: 'Technical case study: Next.js, self-hosted Supabase and an immutable stock ledger with business rules in PostgreSQL.',
    images: ['/assets/og/stock-en.png'],
  },
};

export default function StockEn() {
  return <CaseStudyPage locale="en" slug="stock" />;
}
