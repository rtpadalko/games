import { motion } from 'framer-motion';
import Screen from '@/shared/components/Screen';
import { isQuestionUsed, PLAYER_COLORS, useJeopardyStore } from '../store';

export default function Board() {
  const pack = useJeopardyStore((s) => s.pack);
  const roundIdx = useJeopardyStore((s) => s.currentRoundIdx);
  const usedKeys = useJeopardyStore((s) => s.usedKeys);
  const players = useJeopardyStore((s) => s.players);
  const pickQuestion = useJeopardyStore((s) => s.pickQuestion);

  const round = pack.rounds[roundIdx];
  const themes = round.themes;

  return (
    <Screen className="!justify-start">
      <div className="w-full max-w-6xl">
        {/* Шапка: название раунда + табло */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="glass rounded-2xl px-5 py-3 shadow-soft">
            <div className="text-muted text-xs uppercase tracking-wider">
              {pack.title}
            </div>
            <div className="font-display text-2xl font-bold text-ink">
              {round.name}
            </div>
          </div>

          <Scoreboard players={players} />
        </div>

        {/* Доска */}
        <div
          className="grid gap-2.5 sm:gap-3"
          style={{
            gridTemplateColumns: `repeat(${themes.length}, minmax(0, 1fr))`,
          }}
        >
          {/* Заголовки тем */}
          {themes.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-[#3D4F35] text-cream px-3 py-4 shadow-soft text-center"
            >
              <div className="text-2xl mb-1">{t.emoji}</div>
              <div className="font-display font-bold text-sm sm:text-base leading-tight">
                {t.name}
              </div>
            </div>
          ))}

          {/* Ячейки стоимостей. Идём по строкам: для каждого qIdx — все темы. */}
          {Array.from({ length: themes[0].questions.length }).flatMap((_, qIdx) =>
            themes.map((t, themeIdx) => {
              const q = t.questions[qIdx];
              const used = isQuestionUsed(usedKeys, roundIdx, themeIdx, qIdx);
              return (
                <motion.button
                  key={`${themeIdx}-${qIdx}`}
                  disabled={used}
                  onClick={() => pickQuestion(themeIdx, qIdx)}
                  whileHover={used ? undefined : { y: -3, scale: 1.02 }}
                  whileTap={used ? undefined : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className={[
                    'rounded-2xl py-7 sm:py-10 shadow-soft font-display font-extrabold transition-colors',
                    'text-2xl sm:text-4xl',
                    used
                      ? 'bg-cream/40 text-ink/20 cursor-default'
                      : 'bg-[#7A8F6A] text-cream hover:bg-[#566849]',
                  ].join(' ')}
                  aria-label={used ? 'Вопрос использован' : `Открыть вопрос за ${q.value}`}
                >
                  {used ? '✓' : q.value}
                </motion.button>
              );
            })
          )}
        </div>

        {/* Подсказка для ведущего */}
        <p className="text-center text-ink/60 text-sm mt-8">
          Нажмите на стоимость, чтобы открыть вопрос. После ответа выберите игрока и нажмите ±.
        </p>
      </div>
    </Screen>
  );
}

function Scoreboard({ players }: { players: ReturnType<typeof useJeopardyStore.getState>['players'] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {players.map((p) => {
        const col = PLAYER_COLORS.find((c) => c.id === p.color)!;
        return (
          <div
            key={p.id}
            className="glass rounded-2xl px-3 py-2 shadow-soft flex items-center gap-2"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: col.hex }}
            />
            <span className="text-xs text-ink/80 truncate max-w-[80px]">
              {p.name}
            </span>
            <span className="font-display font-bold tabular-nums text-ink">
              {p.score}
            </span>
          </div>
        );
      })}
    </div>
  );
}
