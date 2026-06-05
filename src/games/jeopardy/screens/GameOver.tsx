import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Screen from '@/shared/components/Screen';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import { PLAYER_COLORS, useJeopardyStore } from '../store';

export default function GameOver() {
  const players = useJeopardyStore((s) => s.players);
  const startGame = useJeopardyStore((s) => s.startGame);
  const resetAll = useJeopardyStore((s) => s.resetAll);

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];
  const winnerColor = PLAYER_COLORS.find((c) => c.id === winner.color)!;

  return (
    <Screen>
      <div className="w-full max-w-xl text-center">
        <motion.div
          initial={{ scale: 0.4, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="mx-auto mb-6 w-40 h-40 rounded-full shadow-soft flex items-center justify-center"
          style={{ backgroundColor: winnerColor.hex }}
        >
          <span className="text-7xl">🏆</span>
        </motion.div>

        <div className="glass rounded-3xl px-6 py-5 shadow-soft inline-block mb-8">
          <p className="text-ink/70 mb-1 text-sm uppercase tracking-wide">
            Победитель
          </p>
          <h1 className="font-display text-5xl font-extrabold text-ink">
            {winner.name}
          </h1>
        </div>

        <Card pad="lg" className="mb-8 text-left">
          <h2 className="font-display text-lg font-semibold mb-4 text-center">
            Финальные результаты
          </h2>
          <ol className="space-y-3">
            {sorted.map((p, i) => {
              const c = PLAYER_COLORS.find((x) => x.id === p.color)!;
              return (
                <li key={p.id} className="flex items-center gap-3">
                  <span className="text-muted w-5 tabular-nums">{i + 1}.</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="flex-1">{p.name}</span>
                  <span className="font-display font-bold tabular-nums">
                    {p.score}
                  </span>
                </li>
              );
            })}
          </ol>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" fullWidth onClick={startGame}>
            Реванш
          </Button>
          <Button size="lg" variant="secondary" fullWidth onClick={resetAll}>
            Новая партия
          </Button>
        </div>

        <Link
          to="/"
          className="inline-block mt-6 glass rounded-full px-4 py-2 text-ink hover:text-bark text-sm font-medium shadow-soft"
        >
          ← В лобби
        </Link>
      </div>
    </Screen>
  );
}
