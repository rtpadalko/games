import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import forestBg from '@/assets/forest-bg.jpg';

interface ScreenProps {
  children: ReactNode;
  className?: string;
}

/**
 * Полноэкранная обёртка для игровых экранов.
 * Фон — та же лесная фотография, что в лобби, с тёплой кремовой завесой,
 * чтобы карточки оставались чёткими, но воздух «лесной».
 */
export default function Screen({ children, className = '' }: ScreenProps) {
  return (
    <>
      {/* Атмосферный лесной фон (фиксированный, не прокручивается) */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 overflow-hidden bg-cream"
      >
        <img
          src={forestBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Тёплая кремовая завеса — лес чувствуется, но не отвлекает */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(250,246,241,0.65) 0%, rgba(250,246,241,0.55) 50%, rgba(250,246,241,0.65) 100%)',
          }}
        />
      </div>

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'min-h-dvh w-full flex flex-col items-center justify-center',
          'px-4 py-6 sm:px-8 sm:py-10',
          'text-ink relative',
          className,
        ].join(' ')}
      >
        {children}
      </motion.main>
    </>
  );
}
