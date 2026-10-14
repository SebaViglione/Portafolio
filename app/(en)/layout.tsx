import type { Metadata } from 'next';
import { RootDocument, baseMetadata } from '@/components/RootDocument';

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Sebastián Viglione — Backend Developer | Montevideo',
  description:
    'Backend developer in Montevideo. I build management systems for real operations: stock, costing, purchasing, quoting and integrations, with PostgreSQL, TypeScript and Node.js.',
  openGraph: {
    title: 'Sebastián Viglione — Backend Developer | Montevideo',
    description:
      'Management systems for real operations: stock, costing, purchasing, quoting and integrations. In charge of the systems at Grupo CPS, built end to end.',
    url: 'https://sebaviglione.com/en',
    siteName: 'sebaviglione.com',
    images: [
      {
        url: '/assets/og/home-en.png',
        width: 1200,
        height: 630,
        alt: 'Sebastián Viglione, backend developer in Montevideo',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastián Viglione — Backend Developer | Montevideo',
    description: 'Management systems for real operations: stock, costing, purchasing, quoting and integrations.',
    images: ['/assets/og/home-en.png'],
  },
};

export default function RootLayoutEn({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
