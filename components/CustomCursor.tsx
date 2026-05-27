'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursorElement = cursorRef.current;
    const labelElement = labelRef.current;
    if (!cursorElement || !labelElement || window.matchMedia('(pointer: coarse)').matches) return;
    const cursor = cursorElement;
    const label = labelElement;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.26, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.26, ease: 'power3.out' });

    function onPointerMove(event: PointerEvent) {
      xTo(event.clientX);
      yTo(event.clientY);
    }

    function onPointerOver(event: PointerEvent) {
      const target = event.target as HTMLElement;
      const cursorTarget = target.closest<HTMLElement>('a, button, [data-cursor]');
      const text = cursorTarget?.dataset.cursor ?? '';

      if (cursorTarget) {
        cursor.classList.add('is-active');
        label.textContent = text;
      }
    }

    function onPointerOut(event: PointerEvent) {
      const target = event.target as HTMLElement;
      if (target.closest('a, button, [data-cursor]')) {
        cursor.classList.remove('is-active');
        label.textContent = '';
      }
    }

    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
}
