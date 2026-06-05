import { Link } from 'react-router-dom';
import Screen from '@/shared/components/Screen';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import { TEAM_COLORS, useAliasStore } from '../store';
import { CATEGORIES } from '../data/words';

export default function Setup() {
  const {
    teams, addTeam, removeTeam, renameTeam,
    roundSeconds, setRoundSeconds,
    targetScore, setTargetScore,
    categories, toggleCategory,
    penalizeSkip, setPenalizeSkip,
    startGame,
  } = useAliasStore();

  const canStart = teams.length >= 2 && categories.length >= 1;

  return (
    <Screen>
      <div className="w-full max-w-3xl">
        <header className="flex items-center justify-between mb-8 gap-3">
          <Link
            to="/"
            className="glass rounded-full px-4 py-2 text-ink hover:text-bark text-sm font-medium shadow-soft"
          >
            ← В лобби
          </Link>
          <h1 className="glass rounded-2xl px-6 py-2 font-display text-2xl sm:text-3xl font-bold text-ink shadow-soft">
            Алиас
          </h1>
          <div className="w-24 hidden sm:block" />
        </header>

        {/* Команды */}
        <Card pad="lg" className="mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-display text-xl font-semibold">Команды</h2>
            <span className="text-muted text-sm">от 2 до 4</span>
          </div>

          <div className="space-y-3">
            {teams.map((t) => {
              const color = TEAM_COLORS.find((c) => c.id === t.color)!;
              return (
                <div key={t.id} className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${color.bg}`} />
                  <input
                    value={t.name}
                    onChange={(e) => renameTeam(t.id, e.target.value)}
                    className="flex-1 bg-cream/60 rounded-xl px-4 py-2.5 outline-none focus:bg-cream"
                    placeholder="Название команды"
                  />
                  {teams.length > 2 && (
                    <button
                      onClick={() => removeTeam(t.id)}
                      className="text-muted hover:text-rose-dark text-sm px-2"
                      aria-label="Удалить команду"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {teams.length < 4 && (
            <button
              onClick={() => addTeam(`Команда ${teams.length + 1}`)}
              className="mt-4 text-sage-dark hover:text-sage text-sm font-medium"
            >
              + Добавить команду
            </button>
          )}
        </Card>

        {/* Настройки */}
        <Card pad="lg" className="mb-6">
          <h2 className="font-display text-xl font-semibold mb-4">Настройки раунда</h2>

          <Slider
            label="Длительность раунда"
            value={roundSeconds}
            min={30} max={120} step={10}
            unit="сек"
            onChange={setRoundSeconds}
          />

          <Slider
            label="Очков до победы"
            value={targetScore}
            min={10} max={60} step={5}
            unit="очк"
            onChange={setTargetScore}
          />

          <label className="flex items-center gap-3 mt-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={penalizeSkip}
              onChange={(e) => setPenalizeSkip(e.target.checked)}
              className="w-5 h-5 accent-sage rounded"
            />
            <span className="text-sm">
              Штраф за пропуск <span className="text-muted">(−1 за каждый ✕)</span>
            </span>
          </label>
        </Card>

        {/* Категории */}
        <Card pad="lg" className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">Категории слов</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {CATEGORIES.map((c) => {
              const on = categories.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCategory(c.id)}
                  className={[
                    'text-left rounded-2xl p-4 border-2 transition-all',
                    on
                      ? 'border-sage bg-sage/5'
                      : 'border-ink/5 bg-cream/40 hover:border-ink/15',
                  ].join(' ')}
                >
                  <div className="text-2xl mb-1">{c.emoji}</div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-muted text-sm">{c.description}</div>
                </button>
              );
            })}
          </div>
        </Card>

        <Button
          variant="primary"
          size="xl"
          fullWidth
          disabled={!canStart}
          onClick={startGame}
        >
          Начать игру
        </Button>
      </div>
    </Screen>
  );
}

function Slider({
  label, value, min, max, step, unit, onChange,
}: {
  label: string;
  value: number;
  min: number; max: number; step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-semibold tabular-nums">
          {value} <span className="text-muted text-xs font-normal">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-sage"
      />
    </div>
  );
}
