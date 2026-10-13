'use client';

import DotGrid from '@/components/ui/DotGrid';

// Fondo de puntos de los heros (case studies y /servicios). Usa DotGrid de React Bits:
// WebGL, reacciona al puntero, se pausa fuera de pantalla y respeta prefers-reduced-motion.
export function BackgroundGrid() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <DotGrid
        dotSize={3}
        gap={30}
        baseColor="#2B3038"
        activeColor="#B8FF2C"
        proximity={150}
        shockStrength={2.5}
        glow={0.35}
        swell={0.6}
        clickShock={false}
      />
    </div>
  );
}
