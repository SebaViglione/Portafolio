import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sebaviglione.com'),
  title: 'Sebastián Viglione | Software a medida para empresas',
  description:
    'Software a medida para empresas que quieren ordenar su operación y automatizar procesos manuales.',
  icons: {
    icon: '/assets/icons/Favicon.ico',
  },
  openGraph: {
    title: 'Sebastián Viglione | Software a medida para empresas',
    description:
      'Software a medida para empresas que quieren ordenar su operación y automatizar procesos manuales.',
    url: 'https://sebaviglione.com',
    siteName: 'sebaviglione.com',
    images: [
      {
        url: '/assets/og/home.png',
        width: 1200,
        height: 630,
        alt: 'Sebastián Viglione — Software developer',
      },
    ],
    locale: 'es_UY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastián Viglione | Software a medida para empresas',
    description: 'Software a medida para ordenar operaciones y automatizar procesos manuales.',
    images: ['/assets/og/home.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://sebaviglione.com/#person',
      name: 'Sebastián Viglione',
      url: 'https://sebaviglione.com',
      image: 'https://sebaviglione.com/assets/img/profile.webp',
      jobTitle: 'Software Developer',
      worksFor: { '@type': 'Organization', name: 'Grupo CPS' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Montevideo' },
      knowsAbout: [
        'Software development',
        'Full-stack development',
        'TypeScript',
        'React',
        'Next.js',
        'Python',
        'PostgreSQL',
        'Automation',
        'Local AI',
        'n8n',
      ],
      knowsLanguage: ['Spanish', 'English'],
      address: { '@type': 'PostalAddress', addressLocality: 'Montevideo', addressCountry: 'UY' },
      sameAs: ['https://linkedin.com/in/sebaviglione', 'https://github.com/SebaViglione'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sebaviglione.com/#website',
      name: 'Sebastián Viglione',
      url: 'https://sebaviglione.com',
      inLanguage: ['es', 'en'],
      publisher: { '@id': 'https://sebaviglione.com/#person' },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
