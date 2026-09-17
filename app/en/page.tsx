import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Sebastián Viglione — Backend Developer | Montevideo',
  description:
    'Backend developer in Montevideo. I build management systems for real operations: stock, costing, purchasing, quoting and integrations, with PostgreSQL, TypeScript and Node.js.',
  alternates: {
    canonical: '/en',
    languages: { es: '/', en: '/en' },
  },
  openGraph: {
    title: 'Sebastián Viglione — Backend Developer | Montevideo',
    description:
      'Management systems for real operations: stock, costing, purchasing, quoting and integrations. Three systems in production, built end to end.',
    url: 'https://sebaviglione.com/en',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/assets/og/home-en.png',
        width: 1200,
        height: 630,
        alt: 'Sebastián Viglione, backend developer in Montevideo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastián Viglione — Backend Developer | Montevideo',
    description: 'Management systems for real operations: stock, costing, purchasing, quoting and integrations.',
    images: ['/assets/og/home-en.png'],
  },
};

export default function HomeEn() {
  return <LandingPage locale="en" />;
}
