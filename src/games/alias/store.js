import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { buildDeck } from './data/words';
export const TEAM_COLORS = [
    { id: 'rose', label: 'rose', bg: 'bg-rose', text: 'text-rose-dark' },
    { id: 'sage', label: 'sage', bg: 'bg-sage', text: 'text-sage-dark' },
    { id: 'lavender', label: 'lavender', bg: 'bg-lavender', text: 'text-lavender-dark' },
    { id: 'peach', label: 'peach', bg: 'bg-peach', text: 'text-peach-dark' },
];
const randomId = () => Math.random().toString(36).slice(2, 9);
const defaultTeams = () => [
    { id: randomId(), name: 'Розовые', color: 'rose', score: 0 },
    { id: randomId(), name: 'Шалфейные', color: 'sage', score: 0 },
];
export const useAliasStore = create()(persist((set, get) => ({
    teams: defaultTeams(),
    roundSeconds: 60,
    targetScore: 30,
    categories: ['basic', 'animals'],
    penalizeSkip: false,
    phase: 'setup',
    deck: [],
    deckIndex: 0,
    currentTeamIndex: 0,
    roundWords: [],
    addTeam: (name) => set((s) => {
        if (s.teams.length >= 4)
            return s;
        const used = new Set(s.teams.map((t) => t.color));
        const color = TEAM_COLORS.find((c) => !used.has(c.id))?.id ?? 'rose';
        return {
            teams: [
                ...s.teams,
                { id: randomId(), name: name || `Команда ${s.teams.length + 1}`, color, score: 0 },
            ],
        };
    }),
    removeTeam: (id) => set((s) => ({
        teams: s.teams.length > 2 ? s.teams.filter((t) => t.id !== id) : s.teams,
    })),
    renameTeam: (id, name) => set((s) => ({
        teams: s.teams.map((t) => (t.id === id ? { ...t, name } : t)),
    })),
    setRoundSeconds: (roundSeconds) => set({ roundSeconds }),
    setTargetScore: (targetScore) => set({ targetScore }),
    toggleCategory: (c) => set((s) => {
        const has = s.categories.includes(c);
        const next = has ? s.categories.filter((x) => x !== c) : [...s.categories, c];
        return { categories: next.length ? next : s.categories }; // минимум одна
    }),
    setPenalizeSkip: (v) => set({ penalizeSkip: v }),
    startGame: () => {
        const { categories, teams } = get();
        const deck = buildDeck(categories);
        set({
            phase: 'intro',
            deck,
            deckIndex: 0,
            currentTeamIndex: 0,
            teams: teams.map((t) => ({ ...t, score: 0 })),
            roundWords: [],
        });
    },
    startRound: () => set({ phase: 'round', roundWords: [] }),
    finishRound: (words) => {
        // обновляем колоду — двигаем индекс на количество показанных слов
        set((s) => ({
            phase: 'summary',
            roundWords: words,
            deckIndex: s.deckIndex + words.length,
        }));
    },
    toggleWordGuessed: (index) => set((s) => ({
        roundWords: s.roundWords.map((w, i) => i === index ? { ...w, guessed: !w.guessed } : w),
    })),
    applyRoundResult: () => {
        const { teams, currentTeamIndex, roundWords, penalizeSkip, targetScore } = get();
        const guessed = roundWords.filter((w) => w.guessed).length;
        const missed = roundWords.length - guessed;
        const delta = guessed - (penalizeSkip ? missed : 0);
        const newTeams = teams.map((t, i) => i === currentTeamIndex ? { ...t, score: t.score + delta } : t);
        // победитель: достигнут target, и все остальные имели равное число попыток
        // упрощённо: если по итогам этого раунда команда вышла в target и
        // currentTeamIndex === teams.length-1 (круг завершён) — конец игры.
        const someoneWon = newTeams.some((t) => t.score >= targetScore);
        const isLastInRound = currentTeamIndex === teams.length - 1;
        if (someoneWon && isLastInRound) {
            set({ teams: newTeams, phase: 'winner' });
        }
        else {
            set({ teams: newTeams, phase: 'scoreboard' });
        }
    },
    nextTeam: () => {
        const { currentTeamIndex, teams, deck, deckIndex, categories } = get();
        // если колода кончается — перемешиваем заново
        const left = deck.length - deckIndex;
        const refreshed = left < 20 ? buildDeck(categories) : deck;
        const newDeckIndex = left < 20 ? 0 : deckIndex;
        set({
            phase: 'intro',
            currentTeamIndex: (currentTeamIndex + 1) % teams.length,
            deck: refreshed,
            deckIndex: newDeckIndex,
        });
    },
    resetAll: () => set({
        teams: defaultTeams(),
        phase: 'setup',
        deck: [],
        deckIndex: 0,
        currentTeamIndex: 0,
        roundWords: [],
    }),
}), {
    name: 'alias-state',
    // не сохраняем активный раунд (чтобы не залипнуть на нём после перезагрузки)
    partialize: (s) => ({
        teams: s.teams,
        roundSeconds: s.roundSeconds,
        targetScore: s.targetScore,
        categories: s.categories,
        penalizeSkip: s.penalizeSkip,
    }),
}));
