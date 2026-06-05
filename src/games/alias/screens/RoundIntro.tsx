import { motion } from 'framer-motion';
import Screen from '@/shared/components/Screen';
import Button from '@/shared/components/Button';
import { TEAM_COLORS, useAliasStore } from '../store';

export default function RoundIntro() {
  const teams = useAliasStore((s) => s.teams);
  const idx = useAliasStore((s) => s.currentTeamIndex);
  const startRound = useAliasStore((s) => s.startRound);
  const roundSeconds = useAliasStore((s) => s.roundSeconds);

  const team = teams[idx];
  const color = TEAM_COLORS.find((c) => c.id === team.color)!;

  return (
    <Screen>
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className={`mx-auto mb-8 w-32 h-32 rounded-full ${color.bg} shadow-soft flex items-center justify-center`}
        >
          <span className="text-6xl">🎙️</span>
        </motion.div>

        <div className="glass rounded-3xl px-6 py-5 shadow-soft mb-10">
          <p className="text-muted mb-2 text-sm uppercase tracking-wide">Сейчас ходит</p>
          <h1 className="font-display text-5xl font-extrabold mb-3 text-ink">{team.name}</h1>
          <p className="text-ink/75 mb-0">
            У вас <b className="text-ink">{roundSeconds}</b> секунд. Объясняйте слова,
            не используя однокоренные.
          </p>
        </div>

        <Button size="xl" fullWidth onClick={startRound}>
          Старт →
        </Button>

        <ScoreStrip />
      </div>
    </Screen>
  );
}

function ScoreStrip() {
  const teams = useAliasStore((s) => s.teams);
  const currentIdx = useAliasStore((s) => s.currentTeamIndex);
  const target = useAliasStore((s) => s.targetScore);

  return (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {teams.map((t, i) => {
        const color = TEAM_COLORS.find((c) => c.id === t.color)!;
        return (
          <div
            key={t.id}
            className={[
              'rounded-2xl p-3 text-left shadow-soft',
              i === currentIdx ? 'bg-white' : 'glass',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${color.bg}`} />
              <span className="text-xs text-muted truncate">{t.name}</span>
            </div>
            <div className="font-display font-bold text-lg">
              {t.score}<span className="text-muted text-xs font-normal"> / {target}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
