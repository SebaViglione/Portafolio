import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sebaviglione.com'),
  title: 'Sebastián Viglione — Desarrollador backend | Montevideo',
  description:
    'Desarrollador backend en Montevideo. Construyo sistemas de gestión para operaciones reales: stock, costeo, compras, cotización e integraciones, con PostgreSQL, TypeScript y Node.js.',
  icons: {
    icon: '/assets/icons/Favicon.ico',
  },
  openGraph: {
    title: 'Sebastián Viglione — Desarrollador backend | Montevideo',
    description:
      'Sistemas de gestión para operaciones reales: stock, costeo, compras, cotización e integraciones. Tres sistemas en producción, construidos de punta a punta.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://sebaviglione.com/#person',
      name: 'Sebastián Viglione',
      url: 'https://sebaviglione.com',
      image: 'https://sebaviglione.com/assets/img/profile.webp',
      jobTitle: 'Backend Developer',
      worksFor: { '@type': 'Organization', name: 'Grupo CPS' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Montevideo' },
      knowsAbout: [
        'Backend development',
        'TypeScript',
        'Node.js',
        'Next.js',
        'React',
        'PostgreSQL',
        'SQL',
        'Supabase',
        'REST APIs',
        'Python',
        'n8n',
        'Docker',
        'Linux',
        'Ollama',
        'Automation',
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
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
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
