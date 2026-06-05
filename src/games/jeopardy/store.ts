import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JeopardyPack, JeopardyQuestion } from './data/types';
import { findPack, DEFAULT_PACK_ID } from './data/packs';

export type Phase = 'setup' | 'board' | 'question' | 'gameover';

export interface Player {
  id: string;
  name: string;
  color: string;
  score: number;
}

export interface ActiveQuestion {
  themeIdx: number;
  qIdx: number;
  themeName: string;
  themeEmoji: string;
  question: JeopardyQuestion;
  showAnswer: boolean;
  /** Для «Кота в мешке»: кому передан вопрос (id игрока). null = ещё не выбран. */
  forcedPlayerId: string | null;
  /** Для «Аукциона»: победитель и его ставка. null = торги не завершены. */
  auctionWinnerId: string | null;
  auctionBid: number | null;
}

interface JeopardyState {
  /** id выбранного пака (используется при загрузке стартового стейта) */
  selectedPackId: string;
  /** Сам объект пака — кэш для удобства внутри стора. */
  pack: JeopardyPack;
  players: Player[];
  currentRoundIdx: number;
  /** Ключи использованных вопросов: `${roundIdx}:${themeIdx}:${qIdx}` */
  usedKeys: Set<string>;
  activeQuestion: ActiveQuestion | null;
  phase: Phase;

  // actions
  selectPack: (id: string) => void;
  addPlayer: (name?: string) => void;
  removePlayer: (id: string) => void;
  renamePlayer: (id: string, name: string) => void;
  startGame: () => void;
  pickQuestion: (themeIdx: number, qIdx: number) => void;
  showAnswer: () => void;
  awardPoints: (playerId: string, delta: number) => void;
  /** «Кот в мешке»: назначить, кто будет отвечать */
  assignCatTo: (playerId: string) => void;
  /** «Аукцион»: зафиксировать победителя торгов и его ставку */
  setAuctionWinner: (playerId: string, bid: number) => void;
  closeQuestion: () => void;
  goToNextRound: () => void;
  resetAll: () => void;
}

export const PLAYER_COLORS = [
  { id: 'rose', label: 'Розовый', hex: '#C77B5C' },
  { id: 'moss', label: 'Шалфейный', hex: '#7A8F6A' },
  { id: 'lavender', label: 'Лавандовый', hex: '#B59FB8' },
  { id: 'peach', label: 'Персиковый', hex: '#E2A05F' },
  { id: 'honey', label: 'Медовый', hex: '#D9A05B' },
  { id: 'bark', label: 'Коричневый', hex: '#6B4F3A' },
] as const;

const randomId = () => Math.random().toString(36).slice(2, 9);

const defaultPlayers = (): Player[] => [
  { id: randomId(), name: 'Игрок 1', color: 'rose', score: 0 },
  { id: randomId(), name: 'Игрок 2', color: 'moss', score: 0 },
];

const allQuestionsCount = (pack: JeopardyPack, roundIdx: number) =>
  pack.rounds[roundIdx].themes.reduce(
    (sum, t) => sum + t.questions.length,
    0
  );

export const useJeopardyStore = create<JeopardyState>()(
  persist(
    (set, get) => ({
      selectedPackId: DEFAULT_PACK_ID,
      pack: findPack(DEFAULT_PACK_ID),
      players: defaultPlayers(),
      currentRoundIdx: 0,
      usedKeys: new Set<string>(),
      activeQuestion: null,
      phase: 'setup',

      selectPack: (id) =>
        set({
          selectedPackId: id,
          pack: findPack(id),
          // переключение пака сбрасывает текущую партию
          currentRoundIdx: 0,
          usedKeys: new Set(),
          activeQuestion: null,
          phase: 'setup',
        }),

      addPlayer: (name) =>
        set((s) => {
          if (s.players.length >= 6) return s;
          const used = new Set(s.players.map((p) => p.color));
          const color =
            PLAYER_COLORS.find((c) => !used.has(c.id))?.id ?? 'rose';
          return {
            players: [
              ...s.players,
              {
                id: randomId(),
                name: name || `Игрок ${s.players.length + 1}`,
                color,
                score: 0,
              },
            ],
          };
        }),

      removePlayer: (id) =>
        set((s) => ({
          players:
            s.players.length > 2
              ? s.players.filter((p) => p.id !== id)
              : s.players,
        })),

      renamePlayer: (id, name) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id ? { ...p, name } : p
          ),
        })),

      startGame: () =>
        set((s) => ({
          phase: 'board',
          currentRoundIdx: 0,
          usedKeys: new Set(),
          activeQuestion: null,
          players: s.players.map((p) => ({ ...p, score: 0 })),
        })),

      pickQuestion: (themeIdx, qIdx) => {
        const { pack, currentRoundIdx, usedKeys } = get();
        const key = `${currentRoundIdx}:${themeIdx}:${qIdx}`;
        if (usedKeys.has(key)) return;
        const theme = pack.rounds[currentRoundIdx].themes[themeIdx];
        const question = theme.questions[qIdx];
        set({
          activeQuestion: {
            themeIdx,
            qIdx,
            themeName: theme.name,
            themeEmoji: theme.emoji,
            question,
            showAnswer: false,
            forcedPlayerId: null,
            auctionWinnerId: null,
            auctionBid: null,
          },
          phase: 'question',
        });
      },

      showAnswer: () =>
        set((s) =>
          s.activeQuestion
            ? { activeQuestion: { ...s.activeQuestion, showAnswer: true } }
            : s
        ),

      awardPoints: (playerId, delta) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === playerId ? { ...p, score: p.score + delta } : p
          ),
        })),

      assignCatTo: (playerId) =>
        set((s) =>
          s.activeQuestion
            ? { activeQuestion: { ...s.activeQuestion, forcedPlayerId: playerId } }
            : s
        ),

      setAuctionWinner: (playerId, bid) =>
        set((s) =>
          s.activeQuestion
            ? {
                activeQuestion: {
                  ...s.activeQuestion,
                  auctionWinnerId: playerId,
                  auctionBid: bid,
                },
              }
            : s
        ),

      closeQuestion: () => {
        const { activeQuestion, currentRoundIdx, usedKeys, pack } = get();
        if (!activeQuestion) {
          set({ phase: 'board' });
          return;
        }
        const key = `${currentRoundIdx}:${activeQuestion.themeIdx}:${activeQuestion.qIdx}`;
        const next = new Set(usedKeys);
        next.add(key);

        // Сколько вопросов в раунде использовано
        const roundQuestions = allQuestionsCount(pack, currentRoundIdx);
        const usedInRound = [...next].filter((k) =>
          k.startsWith(`${currentRoundIdx}:`)
        ).length;
        const roundFinished = usedInRound >= roundQuestions;

        const isLastRound = currentRoundIdx >= pack.rounds.length - 1;

        set({
          usedKeys: next,
          activeQuestion: null,
          phase: roundFinished && isLastRound ? 'gameover' : 'board',
        });
      },

      goToNextRound: () =>
        set((s) => {
          const next = s.currentRoundIdx + 1;
          if (next >= s.pack.rounds.length) {
            return { phase: 'gameover' };
          }
          return { currentRoundIdx: next, phase: 'board' };
        }),

      resetAll: () =>
        set({
          players: defaultPlayers(),
          currentRoundIdx: 0,
          usedKeys: new Set(),
          activeQuestion: null,
          phase: 'setup',
        }),
    }),
    {
      name: 'jeopardy-state',
      // Сохраняем настройки между сессиями: игроков и выбранный пак
      partialize: (s) => ({
        players: s.players,
        selectedPackId: s.selectedPackId,
      }),
      // После загрузки из localStorage восстанавливаем сам объект пака по id
      onRehydrateStorage: () => (state) => {
        if (state) state.pack = findPack(state.selectedPackId);
      },
    }
  )
);

/**
 * Хелпер: использован ли вопрос?
 * Удобно для рендера доски.
 */
export function isQuestionUsed(
  usedKeys: Set<string>,
  roundIdx: number,
  themeIdx: number,
  qIdx: number
): boolean {
  return usedKeys.has(`${roundIdx}:${themeIdx}:${qIdx}`);
}
