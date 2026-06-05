import { Link } from 'react-router-dom';
import Screen from '@/shared/components/Screen';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import { PLAYER_COLORS, useJeopardyStore } from '../store';
import { ALL_PACKS } from '../data/packs';

export default function Setup() {
  const {
    pack,
    selectedPackId,
    selectPack,
    players,
    addPlayer,
    removePlayer,
    renamePlayer,
    startGame,
  } = useJeopardyStore();

  const canStart = players.length >= 2 && players.every((p) => p.name.trim());
  const hasMultiplePacks = ALL_PACKS.length > 1;

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
            Своя игра
          </h1>
          <div className="w-24 hidden sm:block" />
        </header>

        {/* Игроки */}
        <Card pad="lg" className="mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-display text-xl font-semibold">Игроки</h2>
            <span className="text-muted text-sm">от 2 до 6</span>
          </div>

          <div className="space-y-3">
            {players.map((p) => {
              const col = PLAYER_COLORS.find((c) => c.id === p.color)!;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: col.hex }}
                  />
                  <input
                    value={p.name}
                    onChange={(e) => renamePlayer(p.id, e.target.value)}
                    className="flex-1 bg-cream/60 rounded-xl px-4 py-2.5 outline-none focus:bg-cream"
                    placeholder="Имя игрока"
                  />
                  {players.length > 2 && (
                    <button
                      onClick={() => removePlayer(p.id)}
                      className="text-muted hover:text-rose-dark text-sm px-2"
                      aria-label="Удалить игрока"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {players.length < 6 && (
            <button
              onClick={() => addPlayer()}
              className="mt-4 text-[#566849] hover:text-[#7A8F6A] text-sm font-medium"
            >
              + Добавить игрока
            </button>
          )}
        </Card>

        {/* Выбор пака */}
        <Card pad="lg" className="mb-6">
          {hasMultiplePacks ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {ALL_PACKS.map((p) => {
                const active = p.id === selectedPackId;
                const totalQ = p.rounds.reduce(
                  (s, r) => s + r.themes.reduce((a, t) => a + t.questions.length, 0),
                  0
                );
                return (
                  <button
                    key={p.id}
                    onClick={() => selectPack(p.id)}
                    className={[
                      'text-left rounded-2xl p-4 border-2 transition-all',
                      active
                        ? 'border-[#566849] bg-[#7A8F6A]/10'
                        : 'border-ink/5 bg-cream/40 hover:border-ink/15',
                    ].join(' ')}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      {p.emoji && <span className="text-xl">{p.emoji}</span>}
                      <span className="font-display font-bold">{p.title}</span>
                    </div>
                    {p.description && (
                      <div className="text-muted text-sm leading-snug mb-2">
                        {p.description}
                      </div>
                    )}
                    <div className="text-muted text-xs">
                      {p.rounds.length} раунд
                      {p.rounds.length === 1 ? '' : p.rounds.length < 5 ? 'а' : 'ов'} ·{' '}
                      {p.rounds[0].themes.length} тем · {totalQ} вопросов
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-baseline gap-2 mb-1">
              {pack.emoji && <span className="text-xl">{pack.emoji}</span>}
              <span className="font-display text-2xl font-bold">{pack.title}</span>
            </div>
          )}

          {/* Темы текущего раунда выбранного пака */}
          <div className="mt-4">
            <div className="text-muted text-xs uppercase tracking-wider mb-2">
              Темы первого раунда
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {pack.rounds[0].themes.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-2 bg-cream/60 rounded-xl px-3 py-2"
                >
                  <span className="text-xl">{t.emoji}</span>
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-muted text-xs ml-auto">
                    {t.questions.length} вопр.
                  </span>
                </div>
              ))}
            </div>
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
