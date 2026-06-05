import Screen from '@/shared/components/Screen';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import { TEAM_COLORS, useAliasStore } from '../store';

export default function RoundSummary() {
  const words = useAliasStore((s) => s.roundWords);
  const toggle = useAliasStore((s) => s.toggleWordGuessed);
  const apply = useAliasStore((s) => s.applyRoundResult);
  const teams = useAliasStore((s) => s.teams);
  const idx = useAliasStore((s) => s.currentTeamIndex);
  const penalizeSkip = useAliasStore((s) => s.penalizeSkip);

  const team = teams[idx];
  const color = TEAM_COLORS.find((c) => c.id === team.color)!;
  const guessed = words.filter((w) => w.guessed).length;
  const missed = words.length - guessed;
  const delta = guessed - (penalizeSkip ? missed : 0);

  return (
    <Screen>
      <div className="w-full max-w-2xl">
        <div className="glass rounded-3xl px-6 py-5 shadow-soft text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-ink/70 mb-1">
            <span className={`w-2 h-2 rounded-full ${color.bg}`} />
            <span className="text-sm">{team.name}</span>
          </div>
          <h1 className="font-display text-3xl font-bold mb-1 text-ink">Итог раунда</h1>
          <p className="text-ink/70 text-sm">
            Можно переключить любое слово, если ошиблись с решением
          </p>
        </div>

        <Card pad="lg" className="mb-6">
          {words.length === 0 ? (
            <p className="text-center text-muted py-8">
              В этом раунде ни одного слова. Бывает.
            </p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {words.map((w, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <span className="text-lg">{w.word}</span>
                  <button
                    onClick={() => toggle(i)}
                    className={[
                      'rounded-full w-10 h-10 flex items-center justify-center font-bold transition-colors',
                      w.guessed
                        ? 'bg-sage text-white'
                        : 'bg-rose/15 text-rose-dark hover:bg-rose/25',
                    ].join(' ')}
                    aria-label={w.guessed ? 'Угадано' : 'Пропущено'}
                  >
                    {w.guessed ? '✓' : '✕'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card pad="md" className="mb-6">
          <div className="flex items-center justify-around text-center">
            <Stat label="Угадано" value={guessed} tone="sage" />
            <Stat label="Пропусков" value={missed} tone="rose" />
            <Stat
              label="К счёту"
              value={delta > 0 ? `+${delta}` : `${delta}`}
              tone="ink"
            />
          </div>
        </Card>

        <Button size="xl" fullWidth onClick={apply}>
          Продолжить
        </Button>
      </div>
    </Screen>
  );
}

function Stat({
  label, value, tone,
}: { label: string; value: number | string; tone: 'sage' | 'rose' | 'ink' }) {
  const toneClass =
    tone === 'sage' ? 'text-sage-dark' :
    tone === 'rose' ? 'text-rose-dark' : 'text-ink';
  return (
    <div>
      <div className={`font-display font-extrabold text-3xl tabular-nums ${toneClass}`}>
        {value}
      </div>
      <div className="text-muted text-xs mt-1">{label}</div>
    </div>
  );
}
