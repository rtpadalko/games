import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Screen from '@/shared/components/Screen';
import MediaView from '../components/MediaView';
import { Special } from '../data/types';
import { PLAYER_COLORS, Player, useJeopardyStore } from '../store';

/**
 * Активный вопрос с тремя возможными сценариями:
 *   1. «Кот в мешке» → сначала экран передачи получателю
 *   2. «Аукцион»     → сначала экран торгов
 *   3. Обычный       → сразу вопрос + ответ
 * А ещё поддерживает «Без риска» — на нём прячется кнопка «−».
 */
export default function Question() {
  const active = useJeopardyStore((s) => s.activeQuestion);
  const players = useJeopardyStore((s) => s.players);

  if (!active) return null;
  const { question, themeName, themeEmoji } = active;
  const special = question.special;

  // 1) «Кот в мешке» — пока не выбрали получателя
  if (special?.kind === 'cat' && !active.forcedPlayerId) {
    return <CatHandover players={players} themeName={themeName} />;
  }

  // 2) «Аукцион» — пока не зафиксирована ставка
  if (special?.kind === 'auction' && !active.auctionWinnerId) {
    return (
      <AuctionStage
        players={players}
        themeName={themeName}
        themeEmoji={themeEmoji}
        baseValue={question.value}
      />
    );
  }

  // 3) Обычный экран вопроса (или после выбора кота / аукциона)
  return <QuestionBody />;
}

/* ─────────────────────────  «Кот в мешке»  ───────────────────────── */

function CatHandover({ players, themeName }: { players: Player[]; themeName: string }) {
  const assignCatTo = useJeopardyStore((s) => s.assignCatTo);
  return (
    <Screen>
      <div className="w-full max-w-xl text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="text-8xl mb-6"
        >
          🎁
        </motion.div>
        <div className="glass rounded-3xl px-6 py-5 shadow-soft mb-8">
          <p className="text-ink/70 mb-1 text-sm uppercase tracking-wide">
            {themeName}
          </p>
          <h1 className="font-display text-4xl font-extrabold text-ink mb-2">
            Кот в мешке!
          </h1>
          <p className="text-ink/80">
            Выберите, кому передать вопрос. Этот игрок обязан отвечать —
            отказаться нельзя.
          </p>
        </div>

        <div className="space-y-2.5">
          {players.map((p) => {
            const col = PLAYER_COLORS.find((c) => c.id === p.color)!;
            return (
              <button
                key={p.id}
                onClick={() => assignCatTo(p.id)}
                className="w-full glass rounded-2xl px-4 py-4 shadow-soft flex items-center gap-3 hover:bg-cream/95 transition-colors"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: col.hex }}
                />
                <span className="flex-1 text-left font-medium text-ink">
                  {p.name}
                </span>
                <span className="text-ink/60 text-sm">отдать →</span>
              </button>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}

/* ─────────────────────────  Аукцион  ───────────────────────── */

function AuctionStage({
  players,
  themeName,
  themeEmoji,
  baseValue,
}: {
  players: Player[];
  themeName: string;
  themeEmoji: string;
  baseValue: number;
}) {
  const setAuctionWinner = useJeopardyStore((s) => s.setAuctionWinner);
  const [bids, setBids] = useState<Record<string, number>>(
    () => Object.fromEntries(players.map((p) => [p.id, baseValue]))
  );

  // Минимальная ставка — номинал вопроса. Можно поставить «пас» через 0.
  const adjust = (playerId: string, delta: number) =>
    setBids((b) => ({
      ...b,
      [playerId]: Math.max(0, (b[playerId] ?? baseValue) + delta),
    }));

  const handleWin = (playerId: string) => {
    const bid = bids[playerId];
    if (bid < baseValue) return;
    setAuctionWinner(playerId, bid);
  };

  return (
    <Screen>
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl mb-3"
          >
            💰
          </motion.div>
          <div className="glass rounded-3xl px-6 py-5 shadow-soft inline-block">
            <p className="text-ink/70 mb-1 text-sm uppercase tracking-wide">
              {themeEmoji} {themeName} · номинал {baseValue}
            </p>
            <h1 className="font-display text-3xl font-extrabold text-ink mb-1">
              Аукцион
            </h1>
            <p className="text-ink/80 text-sm">
              Каждый игрок ставит, сколько готов поставить.
              Кто больше — тот и играет.
            </p>
          </div>
        </div>

        <div className="space-y-2.5 mb-6">
          {players.map((p) => {
            const col = PLAYER_COLORS.find((c) => c.id === p.color)!;
            const bid = bids[p.id] ?? baseValue;
            const tooLow = bid < baseValue;
            return (
              <div
                key={p.id}
                className="glass rounded-2xl px-4 py-3 shadow-soft flex items-center gap-3"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: col.hex }}
                />
                <span className="flex-1 font-medium text-ink truncate">
                  {p.name}
                  <span className="text-ink/55 text-xs ml-2">
                    в банке {p.score}
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  <BidStep onClick={() => adjust(p.id, -100)}>−100</BidStep>
                  <span
                    className={[
                      'font-display font-bold tabular-nums text-lg w-16 text-center',
                      tooLow ? 'text-ink/40' : 'text-ink',
                    ].join(' ')}
                  >
                    {bid}
                  </span>
                  <BidStep onClick={() => adjust(p.id, 100)}>+100</BidStep>
                  <button
                    onClick={() => handleWin(p.id)}
                    disabled={tooLow}
                    className="ml-2 rounded-2xl bg-[#7A8F6A] text-white px-4 py-2 text-sm font-semibold shadow-soft hover:bg-[#566849] disabled:bg-[#7A8F6A]/40 disabled:cursor-not-allowed transition-colors"
                  >
                    Играет
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-ink/55 text-sm">
          Минимальная ставка — номинал вопроса ({baseValue}). Нажмите «Играет» у того,
          кто выиграл торги.
        </p>
      </div>
    </Screen>
  );
}

function BidStep({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-9 rounded-xl bg-cream/80 text-ink text-xs font-semibold hover:bg-cream transition-colors"
    >
      {children}
    </button>
  );
}

/* ─────────────────────────  Обычный экран вопроса  ───────────────────────── */

function QuestionBody() {
  const active = useJeopardyStore((s) => s.activeQuestion)!;
  const players = useJeopardyStore((s) => s.players);
  const showAnswer = useJeopardyStore((s) => s.showAnswer);
  const awardPoints = useJeopardyStore((s) => s.awardPoints);
  const closeQuestion = useJeopardyStore((s) => s.closeQuestion);

  const { question, themeName, themeEmoji, showAnswer: revealed } = active;
  const special = question.special;

  // Реальная стоимость для начисления очков:
  //  - «Кот»: либо overrideValue, либо номинал
  //  - «Аукцион»: ставка победителя
  //  - иначе: номинал
  const effectiveValue =
    special?.kind === 'cat'
      ? special.overrideValue ?? question.value
      : special?.kind === 'auction' && active.auctionBid != null
      ? active.auctionBid
      : question.value;

  // Кому разрешено отвечать?
  //  - «Кот»: только тот, кому передали
  //  - «Аукцион»: только победитель торгов
  //  - иначе: все
  const restrictedPlayerId =
    active.forcedPlayerId ?? active.auctionWinnerId ?? null;
  const eligiblePlayers = restrictedPlayerId
    ? players.filter((p) => p.id === restrictedPlayerId)
    : players;

  const noRisk = special?.kind === 'noRisk';

  return (
    <Screen className="!justify-start sm:!justify-center">
      <div className="w-full max-w-4xl">
        {/* Шапка */}
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div className="glass rounded-2xl px-4 py-2 shadow-soft flex items-center gap-2">
            <span className="text-2xl">{themeEmoji}</span>
            <span className="font-medium text-ink">{themeName}</span>
          </div>
          <SpecialBadges special={special} />
          <div className="glass rounded-2xl px-5 py-2 shadow-soft font-display font-extrabold text-2xl text-ink tabular-nums">
            {effectiveValue}
          </div>
        </div>

        {/* Бейдж получателя «кота» / победителя аукциона */}
        {restrictedPlayerId && (
          <ForcedPlayerBadge players={players} playerId={restrictedPlayerId} />
        )}

        {/* Карточка вопроса */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="bg-white rounded-4xl shadow-soft p-6 sm:p-8 mb-6"
        >
          {question.media && <MediaView media={question.media} />}
          <p className="font-display text-2xl sm:text-4xl font-bold text-ink text-center leading-tight">
            {question.text}
          </p>
        </motion.div>

        {/* Ответ */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#7A8F6A] text-cream rounded-3xl p-6 sm:p-7 shadow-soft mb-6"
            >
              <div className="text-cream/80 text-xs uppercase tracking-wider mb-2">
                Правильный ответ
              </div>
              {question.answerMedia && (
                <div className="mb-3">
                  <MediaView media={question.answerMedia} />
                </div>
              )}
              <p className="font-display text-2xl sm:text-3xl font-bold">
                {question.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Управление */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {!revealed && (
            <button
              onClick={showAnswer}
              className="flex-1 rounded-3xl bg-[#7A8F6A] text-white py-5 text-xl font-semibold shadow-soft hover:bg-[#566849] transition-colors"
            >
              Показать ответ
            </button>
          )}
          <button
            onClick={closeQuestion}
            className="flex-1 rounded-3xl bg-cream text-ink border border-ink/15 py-5 text-xl font-semibold shadow-soft hover:border-ink/35 transition-colors"
          >
            Закрыть вопрос
          </button>
        </div>

        {/* Начисление очков */}
        <div className="space-y-2.5">
          <div className="text-ink/70 text-sm">
            {noRisk
              ? `Только +${effectiveValue} — за неверный ответ очки не снимаются.`
              : restrictedPlayerId
              ? `Отвечает один игрок: + или − ${effectiveValue} очков.`
              : `Кто ответил? Нажмите + или − — игрок получит ${effectiveValue} очков (или потеряет).`}
          </div>
          {eligiblePlayers.map((p) => {
            const col = PLAYER_COLORS.find((c) => c.id === p.color)!;
            return (
              <div
                key={p.id}
                className="glass rounded-2xl px-4 py-3 shadow-soft flex items-center gap-3"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
                <span className="flex-1 font-medium text-ink truncate">
                  {p.name}
                </span>
                <span className="font-display font-bold tabular-nums text-ink w-14 text-right">
                  {p.score}
                </span>
                <div className="flex gap-2">
                  {!noRisk && (
                    <button
                      onClick={() => awardPoints(p.id, -effectiveValue)}
                      className="w-11 h-11 rounded-2xl bg-[#C77B5C] text-white text-xl font-bold shadow-soft hover:bg-[#8E5238] transition-colors"
                      aria-label={`Снять ${effectiveValue} у ${p.name}`}
                    >
                      −
                    </button>
                  )}
                  <button
                    onClick={() => awardPoints(p.id, effectiveValue)}
                    className="w-11 h-11 rounded-2xl bg-[#7A8F6A] text-white text-xl font-bold shadow-soft hover:bg-[#566849] transition-colors"
                    aria-label={`Дать ${effectiveValue} ${p.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}

/* ─────────────────────────  Вспомогательное  ───────────────────────── */

function SpecialBadges({ special }: { special?: Special }) {
  if (!special) return null;
  if (special.kind === 'cat')
    return <Badge bg="#B59FB8" emoji="🎁" text="Кот в мешке" />;
  if (special.kind === 'auction')
    return <Badge bg="#D9A05B" emoji="💰" text="Аукцион" />;
  if (special.kind === 'noRisk')
    return <Badge bg="#7A8F6A" emoji="🛡" text="Без риска" />;
  return null;
}

function Badge({ bg, emoji, text }: { bg: string; emoji: string; text: string }) {
  return (
    <span
      className="rounded-2xl px-3 py-1.5 text-white text-sm font-semibold shadow-soft flex items-center gap-1.5"
      style={{ backgroundColor: bg }}
    >
      <span>{emoji}</span>
      {text}
    </span>
  );
}

function ForcedPlayerBadge({
  players,
  playerId,
}: {
  players: Player[];
  playerId: string;
}) {
  const p = players.find((x) => x.id === playerId);
  if (!p) return null;
  const col = PLAYER_COLORS.find((c) => c.id === p.color)!;
  return (
    <div className="glass rounded-2xl px-4 py-3 shadow-soft mb-4 flex items-center gap-3">
      <span className="text-sm text-ink/70">Отвечает</span>
      <span
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: col.hex }}
      />
      <span className="font-display font-bold text-lg text-ink">{p.name}</span>
    </div>
  );
}
