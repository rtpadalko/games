import { motion } from 'framer-motion';
import Screen from '@/shared/components/Screen';
import Button from '@/shared/components/Button';
import Card from '@/shared/components/Card';
import { TEAM_COLORS, useAliasStore } from '../store';

export default function Scoreboard() {
  const teams = useAliasStore((s) => s.teams);
  const target = useAliasStore((s) => s.targetScore);
  const nextTeam = useAliasStore((s) => s.nextTeam);
  const currentTeamIndex = useAliasStore((s) => s.currentTeamIndex);

  const nextIdx = (currentTeamIndex + 1) % teams.length;
  const nextTeamName = teams[nextIdx].name;

  return (
    <Screen>
      <div className="w-full max-w-xl">
        <div className="glass rounded-3xl px-6 py-4 shadow-soft text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-ink">
            Табло
          </h1>
        </div>

        <Card pad="lg" className="mb-6">
          <div className="space-y-4">
            {teams.map((t, i) => {
              const color = TEAM_COLORS.find((c) => c.id === t.color)!;
              const progress = Math.min(1, t.score / target);
              const justPlayed = i === currentTeamIndex;
              return (
                <div key={t.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${color.bg}`} />
                      <span className="font-medium">{t.name}</span>
                      {justPlayed && (
                        <span className="text-xs text-muted">(только что)</span>
                      )}
                    </div>
                    <span className="font-display font-bold tabular-nums">
                      {t.score}
                      <span className="text-muted text-sm font-normal"> / {target}</span>
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-ink/5 overflow-hidden">
                    <motion.div
                      className={`h-full ${color.bg}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex justify-center mb-4">
          <p className="glass rounded-full px-5 py-2 text-ink/80 shadow-soft text-sm">
            Следующая команда: <b className="text-ink">{nextTeamName}</b>
          </p>
        </div>

        <Button size="xl" fullWidth onClick={nextTeam}>
          Дальше →
        </Button>
      </div>
    </Screen>
  );
}
