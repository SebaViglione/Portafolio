'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Check, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/BrandIcons';
import { contact } from '@/lib/site';

export function ThanksPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const canvas = canvasElement;

    const renderingContext = canvas.getContext('2d');
    if (!renderingContext) return;
    const context = renderingContext;

    const particles = Array.from({ length: 46 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 120,
      size: 3 + Math.random() * 5,
      speed: 1.8 + Math.random() * 3.8,
      drift: -1 + Math.random() * 2,
      color: Math.random() > 0.45 ? '#B8FF2C' : '#F5F7FA',
      rotation: Math.random() * 180,
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    let frame = 0;
    function draw() {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += particle.drift;
        particle.rotation += 4;
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate((particle.rotation * Math.PI) / 180);
        context.fillStyle = particle.color;
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.55);
        context.restore();
      });

      frame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    gsap.from('.thanks-card', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' });

    const timer = window.setTimeout(() => cancelAnimationFrame(frame), 1800);
    window.addEventListener('resize', resize);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-bg-primary px-5 py-12 text-text-primary">
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-10" aria-hidden="true" />
      <section className="thanks-card relative z-20 w-full max-w-xl rounded-md border border-border bg-bg-card p-7 text-center md:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Check size={32} />
        </div>
        <h1 className="mt-7 font-display text-4xl font-semibold tracking-normal text-text-primary">Mensaje enviado.</h1>
        <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary">
          Gracias por escribirme. Recibí tu mensaje y te voy a responder apenas pueda.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-secondary justify-center">
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>
          <Link href={contact.whatsapp} className="btn-primary justify-center" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} />
            WhatsApp
          </Link>
          <Link href={`mailto:${contact.email}`} className="btn-secondary justify-center">
            <Mail size={18} />
            Mail
          </Link>
        </div>
      </section>
    </main>
  );
}
