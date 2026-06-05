import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type CreatureKind = 'fox' | 'deer' | 'owl';

interface Visible {
  id: number;
  kind: CreatureKind;
  pos: { left: string; top: string };
  mirrored: boolean;
}

/**
 * Случайные «появления» зверьков в листве.
 * Логика:
 *  - спустя 12–28 сек после загрузки появляется первый;
 *  - сидит 5–8 сек, плавно входит/уходит;
 *  - следующий — ещё через 25–60 сек.
 */
export default function Creatures() {
  const [visible, setVisible] = useState<Visible | null>(null);

  useEffect(() => {
    let alive = true;
    let timer: number;

    const schedule = (delayMs: number) => {
      timer = window.setTimeout(() => {
        if (!alive) return;
        const next: Visible = {
          id: Date.now(),
          kind: pick(['fox', 'deer', 'owl']),
          pos: pickHidingSpot(),
          mirrored: Math.random() < 0.5,
        };
        setVisible(next);
        // через 5–8 сек прячется
        const stay = 5000 + Math.random() * 3000;
        window.setTimeout(() => {
          if (!alive) return;
          setVisible(null);
          // через 25–60 сек следующий
          schedule(25_000 + Math.random() * 35_000);
        }, stay);
      }, delayMs);
    };

    // Первое появление — через 12–28 сек
    schedule(12_000 + Math.random() * 16_000);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={visible.id}
          className="absolute"
          style={{ left: visible.pos.left, top: visible.pos.top }}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ transform: visible.mirrored ? 'scaleX(-1)' : undefined }}>
            <CreatureSvg kind={visible.kind} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Возможные точки, где зверь может «выглянуть». */
function pickHidingSpot(): { left: string; top: string } {
  const spots = [
    { left: '8%', top: '62%' },
    { left: '18%', top: '70%' },
    { left: '32%', top: '66%' },
    { left: '58%', top: '64%' },
    { left: '76%', top: '60%' },
    { left: '88%', top: '68%' },
  ];
  return pick(spots);
}

function CreatureSvg({ kind }: { kind: CreatureKind }) {
  // ~70px высотой, простой иллюстративный силуэт + два глазика-точки
  switch (kind) {
    case 'fox':
      return (
        <svg width="78" height="70" viewBox="0 0 78 70" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
          {/* уши */}
          <path d="M14 30 L8 6 L26 18 Z" className="fill-terra" />
          <path d="M62 30 L70 8 L52 18 Z" className="fill-terra" />
          <path d="M14 28 L11 14 L22 22 Z" className="fill-cream/80" />
          <path d="M64 28 L67 14 L56 22 Z" className="fill-cream/80" />
          {/* мордочка */}
          <ellipse cx="39" cy="38" rx="26" ry="22" className="fill-terra" />
          <path d="M22 50 Q39 70 56 50 Q56 40 39 42 Q22 40 22 50 Z" className="fill-cream/95" />
          {/* глаза */}
          <circle cx="29" cy="36" r="2.8" className="fill-ink" />
          <circle cx="49" cy="36" r="2.8" className="fill-ink" />
          <circle cx="29.7" cy="35.3" r="0.9" className="fill-white" />
          <circle cx="49.7" cy="35.3" r="0.9" className="fill-white" />
          {/* носик */}
          <ellipse cx="39" cy="48" rx="3" ry="2.2" className="fill-ink" />
        </svg>
      );
    case 'deer':
      return (
        <svg width="84" height="92" viewBox="0 0 84 92" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
          {/* рога */}
          <path
            d="M22 10 Q14 0 18 -2 M22 10 Q30 6 28 0 M62 10 Q70 0 66 -2 M62 10 Q54 6 56 0"
            className="stroke-bark"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M20 16 L26 0 L34 14 Z" className="fill-bark" />
          <path d="M64 16 L58 0 L50 14 Z" className="fill-bark" />
          {/* голова */}
          <ellipse cx="42" cy="48" rx="26" ry="28" className="fill-honey-dark" />
          <ellipse cx="42" cy="62" rx="14" ry="12" className="fill-cream/85" />
          {/* уши */}
          <ellipse cx="20" cy="34" rx="9" ry="13" className="fill-honey-dark" />
          <ellipse cx="64" cy="34" rx="9" ry="13" className="fill-honey-dark" />
          <ellipse cx="20" cy="34" rx="4" ry="8" className="fill-cream/70" />
          <ellipse cx="64" cy="34" rx="4" ry="8" className="fill-cream/70" />
          {/* глаза */}
          <ellipse cx="32" cy="50" rx="2.6" ry="3.2" className="fill-ink" />
          <ellipse cx="52" cy="50" rx="2.6" ry="3.2" className="fill-ink" />
          <circle cx="32.7" cy="49" r="0.8" className="fill-white" />
          <circle cx="52.7" cy="49" r="0.8" className="fill-white" />
          {/* носик */}
          <ellipse cx="42" cy="64" rx="3.4" ry="2.4" className="fill-ink" />
        </svg>
      );
    case 'owl':
      return (
        <svg width="74" height="76" viewBox="0 0 74 76" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
          {/* тело */}
          <ellipse cx="37" cy="46" rx="28" ry="26" className="fill-bark" />
          {/* грудка */}
          <ellipse cx="37" cy="52" rx="18" ry="20" className="fill-bark-light/85" />
          {/* «брови» */}
          <path d="M10 28 Q24 14 36 22 Q48 14 64 28 L60 36 Q48 24 36 32 Q24 24 14 36 Z" className="fill-bark-dark" />
          {/* большие глаза */}
          <circle cx="26" cy="38" r="10" className="fill-cream" />
          <circle cx="48" cy="38" r="10" className="fill-cream" />
          <circle cx="26" cy="38" r="5" className="fill-ink animate-blink" style={{ transformOrigin: 'center' }} />
          <circle cx="48" cy="38" r="5" className="fill-ink animate-blink" style={{ transformOrigin: 'center' }} />
          <circle cx="27.5" cy="36.5" r="1.5" className="fill-white" />
          <circle cx="49.5" cy="36.5" r="1.5" className="fill-white" />
          {/* клюв */}
          <path d="M37 42 L33 50 L41 50 Z" className="fill-honey-dark" />
        </svg>
      );
  }
}
