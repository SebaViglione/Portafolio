'use client';

import { useEffect, useRef } from 'react';

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const canvas = canvasElement;

    const renderingContext = canvas.getContext('2d');
    if (!renderingContext) return;
    const context = renderingContext;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const pointer = { x: -1000, y: -1000 };
    const spacing = 30;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(43, 48, 56, 0.78)';

      for (let x = 0; x <= width + spacing; x += spacing) {
        for (let y = 0; y <= height + spacing; y += spacing) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 1 - distance / 170);
          const offsetX = force * dx * -0.035;
          const offsetY = force * dy * -0.035;
          const radius = 1 + force * 1.15;

          context.beginPath();
          context.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
          context.fill();
        }
      }

      animationFrame = requestAnimationFrame(draw);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    }

    function onPointerLeave() {
      pointer.x = -1000;
      pointer.y = -1000;
    }

    resize();
    draw();

    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
