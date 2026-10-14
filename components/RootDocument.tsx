import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import type { Locale } from '@/lib/content';
import '@/app/globals.css';

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

/** Metadata común a los dos idiomas; cada layout suma título, descripción y OG propios. */
export const baseMetadata: Metadata = {
  metadataBase: new URL('https://sebaviglione.com'),
  icons: {
    icon: '/assets/icons/Favicon.ico',
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
      jobTitle: 'Software & Systems Lead',
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

/**
 * Documento HTML de cada root layout. Hay uno por idioma (route groups `(es)` y `(en)`)
 * para que `<html lang>` salga bien en el HTML estático, sin corregirlo en el cliente.
 */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
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
