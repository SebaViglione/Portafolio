import type { Metadata } from 'next';
import { RootDocument, baseMetadata } from '@/components/RootDocument';

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Sebastián Viglione — Desarrollador backend | Montevideo',
  description:
    'Desarrollador backend en Montevideo. Construyo sistemas de gestión para operaciones reales: stock, costeo, compras, cotización e integraciones, con PostgreSQL, TypeScript y Node.js.',
  openGraph: {
    title: 'Sebastián Viglione — Desarrollador backend | Montevideo',
    description:
      'Sistemas de gestión para operaciones reales: stock, costeo, compras, cotización e integraciones. A cargo de los sistemas de Grupo CPS, construidos de punta a punta.',
    url: 'https://sebaviglione.com',
    siteName: 'sebaviglione.com',
    images: [
      {
        url: '/assets/og/home-es.png',
        width: 1200,
        height: 630,
        alt: 'Sebastián Viglione, desarrollador backend en Montevideo',
      },
    ],
    locale: 'es_UY',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastián Viglione — Desarrollador backend | Montevideo',
    description: 'Sistemas de gestión para operaciones reales: stock, costeo, compras, cotización e integraciones.',
    images: ['/assets/og/home-es.png'],
  },
};

export default function RootLayoutEs({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
