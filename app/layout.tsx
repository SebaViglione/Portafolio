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
        url: '/assets/img/profile_pic_transparent.png',
        width: 1200,
        height: 1200,
        alt: 'Sebastián Viglione',
      },
    ],
    locale: 'es_UY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastián Viglione | Software a medida para empresas',
    description: 'Software a medida para ordenar operaciones y automatizar procesos manuales.',
    images: ['/assets/img/profile_pic_transparent.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
