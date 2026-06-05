import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(Screen, { className: "!justify-start", children: _jsxs("div", { className: "w-full max-w-6xl", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [_jsxs("div", { className: "glass rounded-2xl px-5 py-3 shadow-soft", children: [_jsx("div", { className: "text-muted text-xs uppercase tracking-wider", children: pack.title }), _jsx("div", { className: "font-display text-2xl font-bold text-ink", children: round.name })] }), _jsx(Scoreboard, { players: players })] }), _jsxs("div", { className: "grid gap-2.5 sm:gap-3", style: {
                        gridTemplateColumns: `repeat(${themes.length}, minmax(0, 1fr))`,
                    }, children: [themes.map((t) => (_jsxs("div", { className: "rounded-2xl bg-[#3D4F35] text-cream px-3 py-4 shadow-soft text-center", children: [_jsx("div", { className: "text-2xl mb-1", children: t.emoji }), _jsx("div", { className: "font-display font-bold text-sm sm:text-base leading-tight", children: t.name })] }, t.name))), Array.from({ length: themes[0].questions.length }).flatMap((_, qIdx) => themes.map((t, themeIdx) => {
                            const q = t.questions[qIdx];
                            const used = isQuestionUsed(usedKeys, roundIdx, themeIdx, qIdx);
                            return (_jsx(motion.button, { disabled: used, onClick: () => pickQuestion(themeIdx, qIdx), whileHover: used ? undefined : { y: -3, scale: 1.02 }, whileTap: used ? undefined : { scale: 0.98 }, transition: { type: 'spring', stiffness: 300, damping: 22 }, className: [
                                    'rounded-2xl py-7 sm:py-10 shadow-soft font-display font-extrabold transition-colors',
                                    'text-2xl sm:text-4xl',
                                    used
                                        ? 'bg-cream/40 text-ink/20 cursor-default'
                                        : 'bg-[#7A8F6A] text-cream hover:bg-[#566849]',
                                ].join(' '), "aria-label": used ? 'Вопрос использован' : `Открыть вопрос за ${q.value}`, children: used ? '✓' : q.value }, `${themeIdx}-${qIdx}`));
                        }))] }), _jsx("p", { className: "text-center text-ink/60 text-sm mt-8", children: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441. \u041F\u043E\u0441\u043B\u0435 \u043E\u0442\u0432\u0435\u0442\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0433\u0440\u043E\u043A\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u00B1." })] }) }));
}
function Scoreboard({ players }) {
    return (_jsx("div", { className: "flex flex-wrap gap-2", children: players.map((p) => {
            const col = PLAYER_COLORS.find((c) => c.id === p.color);
            return (_jsxs("div", { className: "glass rounded-2xl px-3 py-2 shadow-soft flex items-center gap-2", children: [_jsx("span", { className: "w-2.5 h-2.5 rounded-full shrink-0", style: { backgroundColor: col.hex } }), _jsx("span", { className: "text-xs text-ink/80 truncate max-w-[80px]", children: p.name }), _jsx("span", { className: "font-display font-bold tabular-nums text-ink", children: p.score })] }, p.id));
        }) }));
}
