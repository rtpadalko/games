import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Screen from '@/shared/components/Screen';
import { useCountdown } from '@/shared/hooks/useCountdown';
import { TEAM_COLORS, useAliasStore } from '../store';
export default function Round() {
    const roundSeconds = useAliasStore((s) => s.roundSeconds);
    const deck = useAliasStore((s) => s.deck);
    const deckIndex = useAliasStore((s) => s.deckIndex);
    const teams = useAliasStore((s) => s.teams);
    const currentTeamIndex = useAliasStore((s) => s.currentTeamIndex);
    const finishRound = useAliasStore((s) => s.finishRound);
    const team = teams[currentTeamIndex];
    const color = TEAM_COLORS.find((c) => c.id === team.color);
    // Локальная очередь слов и результаты — фиксируются в стор в конце.
    const wordsRef = useRef([]);
    const [pointer, setPointer] = useState(0);
    const word = useMemo(() => deck[(deckIndex + pointer) % deck.length] ?? '—', [deck, deckIndex, pointer]);
    const { seconds, progress, pause, resume, running } = useCountdown(roundSeconds, () => finishRound(wordsRef.current));
    // Защита от случайного выхода
    useEffect(() => {
        const onBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }, []);
    const decide = (guessed) => {
        wordsRef.current = [...wordsRef.current, { word, guessed }];
        setPointer((p) => p + 1);
        if (navigator.vibrate)
            navigator.vibrate(guessed ? 30 : 15);
    };
    const onDragEnd = (_, info) => {
        const t = 120;
        if (info.offset.x > t)
            decide(true);
        else if (info.offset.x < -t)
            decide(false);
    };
    const lowTime = seconds <= 10;
    // Подсчёт текущего счёта раунда
    const guessedNow = wordsRef.current.filter((w) => w.guessed).length;
    const missedNow = wordsRef.current.length - guessedNow;
    return (_jsx(Screen, { className: "!justify-start sm:!justify-center", children: _jsxs("div", { className: "w-full max-w-xl", children: [_jsxs("div", { className: "glass rounded-3xl p-4 shadow-soft mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `w-3 h-3 rounded-full ${color.bg}` }), _jsx("span", { className: "font-medium text-ink", children: team.name })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsxs("span", { className: "text-sage-dark font-semibold", children: ["\u2713 ", guessedNow] }), _jsxs("span", { className: "text-rose-dark font-semibold", children: ["\u2715 ", missedNow] })] })] }), _jsxs("div", { className: "flex justify-between items-baseline mb-1.5", children: [_jsx("span", { className: "text-ink/70 text-sm", children: "\u0412\u0440\u0435\u043C\u044F" }), _jsxs("span", { className: [
                                        'font-display font-bold tabular-nums text-2xl',
                                        lowTime ? 'text-rose-dark' : 'text-ink',
                                    ].join(' '), children: [seconds, "s"] })] }), _jsx("div", { className: "h-2 rounded-full bg-ink/10 overflow-hidden", children: _jsx(motion.div, { className: lowTime ? 'h-full bg-rose-dark' : 'h-full bg-sage-dark', animate: { width: `${progress * 100}%` }, transition: { ease: 'linear', duration: 0.1 } }) })] }), _jsxs("div", { className: "relative h-72 sm:h-80 mb-6 select-none", children: [_jsx(AnimatePresence, { mode: "popLayout", children: _jsx(motion.div, { drag: "x", dragConstraints: { left: 0, right: 0 }, dragElastic: 0.6, onDragEnd: onDragEnd, initial: { x: 0, opacity: 0, scale: 0.9 }, animate: { x: 0, opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.85 }, transition: { type: 'spring', stiffness: 280, damping: 26 }, className: "absolute inset-0 bg-white rounded-4xl shadow-soft flex items-center justify-center px-6 cursor-grab active:cursor-grabbing", children: _jsx("span", { className: "font-display text-4xl sm:text-5xl font-bold text-center leading-tight", children: word }) }, pointer) }), _jsx("div", { className: "absolute left-2 top-1/2 -translate-y-1/2 text-rose/60 text-xs hidden sm:block", children: "\u2190 \u043F\u0440\u043E\u043F\u0443\u0441\u043A" }), _jsx("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 text-sage/70 text-xs hidden sm:block", children: "\u0443\u0433\u0430\u0434\u0430\u043D\u043E \u2192" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx("button", { onClick: () => decide(false), className: "rounded-3xl bg-[#C77B5C] text-white py-6 text-xl font-semibold shadow-soft hover:bg-[#8E5238] transition-colors", children: "\u2715 \u041F\u0440\u043E\u043F\u0443\u0441\u043A" }), _jsx("button", { onClick: () => decide(true), className: "rounded-3xl bg-[#7A8F6A] text-white py-6 text-xl font-semibold shadow-soft hover:bg-[#566849] transition-colors", children: "\u2713 \u0423\u0433\u0430\u0434\u0430\u043D\u043E" })] }), _jsx("div", { className: "flex justify-center mt-4", children: _jsx("button", { onClick: running ? pause : resume, className: "glass rounded-full px-5 py-2 text-ink hover:text-bark text-sm font-medium shadow-soft", children: running ? 'Пауза' : 'Продолжить' }) })] }) }));
}
