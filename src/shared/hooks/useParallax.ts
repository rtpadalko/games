import { useEffect, useState } from 'react';

/**
 * Возвращает нормализованную позицию мыши: { x, y } ∈ [-1, 1].
 * (0, 0) — центр окна.
 * На устройствах без мыши (touch) хук возвращает плавное движение
 * близко к нулю, так что эффект всё равно выглядит «дышаще».
 */
export function useParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches;

    if (hasMouse) {
      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setPos({ x, y });
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMove);
    }

    // Touch-устройства: лёгкое автодвижение по синусу (живая сцена)
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      setPos({
        x: Math.sin(t * 0.35) * 0.3,
        y: Math.cos(t * 0.27) * 0.18,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return pos;
}
