import type { Metadata } from 'next';
import Link from 'next/link';
import { RootDocument, baseMetadata } from '@/components/RootDocument';

// Con dos root layouts (`(es)` y `(en)`) no hay uno común para el 404: este archivo
// arma el documento completo. Es estático y no sabe de qué idioma venía la URL, así que va en los dos.
export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Página no encontrada | Sebastián Viglione',
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootDocument locale="es">
      <main className="grid min-h-screen place-items-center bg-bg-primary px-5 py-12 text-text-primary">
        <section className="w-full max-w-xl rounded-md border border-border bg-bg-card p-7 text-center md:p-10">
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">Esta página no existe.</h1>
          <p className="mt-3 text-text-secondary" lang="en">
            This page doesn’t exist.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary inline-flex min-h-11 items-center rounded-md px-5 font-semibold">
              Ir al inicio
            </Link>
            <Link href="/en" lang="en" className="btn-secondary inline-flex min-h-11 items-center rounded-md px-5 font-semibold">
              Go to home
            </Link>
          </div>
        </section>
      </main>
    </RootDocument>
  );
}
