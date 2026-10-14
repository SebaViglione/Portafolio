import type { Metadata } from 'next';
import { SystemDiagramPage } from '@/components/SystemDiagramPage';

export const metadata: Metadata = {
  title: 'CPS Warehouses: interactive system diagram | Sebastián Viglione',
  description:
    'How the Grupo CPS stock system works, in a diagram you can move around: the material circuit, the immutable ledger and costing, serial-numbered tools and how it is built.',
  alternates: {
    canonical: '/en/stock/diagrama',
    languages: { es: '/stock/diagrama', en: '/en/stock/diagrama' },
  },
  openGraph: {
    title: 'CPS Warehouses: interactive system diagram',
    description: 'Five views of the warehouse system in an interactive diagram, with a step-by-step walkthrough.',
    url: 'https://sebaviglione.com/en/stock/diagrama',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'article',
    images: [{ url: '/assets/og/stock-en.png', width: 1200, height: 630, alt: 'CPS Warehouses · system diagram' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPS Warehouses: interactive system diagram',
    description: 'Five views of the warehouse system in an interactive diagram, with a step-by-step walkthrough.',
    images: ['/assets/og/stock-en.png'],
  },
};

export default function StockDiagramaEn() {
  return <SystemDiagramPage locale="en" project="stock" />;
}
