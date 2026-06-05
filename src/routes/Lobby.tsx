import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import forestBg from '@/assets/forest-bg.jpg';

interface GameTile {
  to: string;
  title: string;
  description: string;
  emoji: string;
  ready: boolean;
}

const games: GameTile[] = [
  {
    to: '/alias',
    title: 'Алиас',
    description: 'Объясняй слова за минуту. Команды соревнуются на скорость и фантазию.',
    emoji: '🦊',
    ready: true,
  },
  {
    to: '/jeopardy',
    title: 'Своя игра',
    description: 'Темы, стоимости, табло. Классика интеллектуальных шоу — в уюте.',
    emoji: '🍂',
    ready: true,
  },
  {
    to: '/quiz',
    title: 'Викторина',
    description: 'Игроки заходят с телефонов, очки за скорость ответа.',
    emoji: '🍄',
    ready: false,
  },
];

export default function Lobby() {
  return (
    <>
      {/* Фон: фотография леса с лучами */}
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src={forestBg}
          alt=""
          className="w-full h-full object-cover scale-105"
        />
        {/* Лёгкая тёплая виньетка сверху и снизу — чтобы текст читался */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,236,200,0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      <main className="relative min-h-dvh w-full flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-5xl">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="text-center mb-14"
            style={{ textShadow: '0 2px 24px rgba(20, 30, 20, 0.55)' }}
          >
            <p className="uppercase tracking-[0.35em] text-xs mb-3 text-cream/80">
              интеллектуальные игры
            </p>
            <h1 className="font-display text-6xl sm:text-7xl font-extrabold tracking-tight leading-none text-cream">
              <span className="inline-block">Игротека</span>
              <span className="inline-block ml-3">🌿</span>
            </h1>
            <p className="mt-5 text-cream/85 text-lg max-w-md mx-auto leading-relaxed">
              Уютная роща, где живут наши любимые игры.
              Возьмите чай, позовите друзей.
            </p>
          </motion.div>

          {/* Плитки-фонарики */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((g, i) => (
              <motion.div
                key={g.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8 }}
              >
                <Lantern tile={g} index={i} />
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}

function Lantern({ tile }: { tile: GameTile; index: number }) {
  const inner = (
    <motion.div
      whileHover={tile.ready ? { y: -6, scale: 1.015 } : undefined}
      whileTap={tile.ready ? { scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={[
        'group relative h-full rounded-4xl p-7 sm:p-8',
        // полупрозрачная карточка с blur — «фонарик сквозь листву»
        'bg-cream/85 backdrop-blur-md border border-white/40',
        'shadow-soft',
        tile.ready ? 'cursor-pointer' : 'opacity-80 cursor-not-allowed',
      ].join(' ')}
    >
      {/* Тёплое свечение «лампы» */}
      <div
        className={[
          'absolute -inset-px rounded-4xl pointer-events-none transition-opacity duration-500',
          tile.ready ? 'opacity-70 group-hover:opacity-100' : 'opacity-40',
        ].join(' ')}
        style={{
          boxShadow:
            '0 0 50px rgba(240, 201, 136, 0.5), inset 0 0 35px rgba(245, 200, 147, 0.25)',
        }}
      />

      <div className="relative">
        <div className="text-5xl mb-4">{tile.emoji}</div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
          {tile.title}
        </h2>
        <p className="mt-2 text-muted text-sm leading-relaxed">
          {tile.description}
        </p>
        <div className="mt-6">
          {tile.ready ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              Войти в круг
              <motion.span
                aria-hidden
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-cream rounded-full px-3 py-1 text-muted border border-bark/10">
              Скоро
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return tile.ready ? <Link to={tile.to}>{inner}</Link> : inner;
}
