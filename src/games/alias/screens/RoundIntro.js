import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const color = TEAM_COLORS.find((c) => c.id === team.color);
    return (_jsx(Screen, { children: _jsxs("div", { className: "text-center max-w-md", children: [_jsx(motion.div, { initial: { scale: 0.6, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { type: 'spring', stiffness: 200, damping: 18 }, className: `mx-auto mb-8 w-32 h-32 rounded-full ${color.bg} shadow-soft flex items-center justify-center`, children: _jsx("span", { className: "text-6xl", children: "\uD83C\uDF99\uFE0F" }) }), _jsxs("div", { className: "glass rounded-3xl px-6 py-5 shadow-soft mb-10", children: [_jsx("p", { className: "text-muted mb-2 text-sm uppercase tracking-wide", children: "\u0421\u0435\u0439\u0447\u0430\u0441 \u0445\u043E\u0434\u0438\u0442" }), _jsx("h1", { className: "font-display text-5xl font-extrabold mb-3 text-ink", children: team.name }), _jsxs("p", { className: "text-ink/75 mb-0", children: ["\u0423 \u0432\u0430\u0441 ", _jsx("b", { className: "text-ink", children: roundSeconds }), " \u0441\u0435\u043A\u0443\u043D\u0434. \u041E\u0431\u044A\u044F\u0441\u043D\u044F\u0439\u0442\u0435 \u0441\u043B\u043E\u0432\u0430, \u043D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u043E\u0434\u043D\u043E\u043A\u043E\u0440\u0435\u043D\u043D\u044B\u0435."] })] }), _jsx(Button, { size: "xl", fullWidth: true, onClick: startRound, children: "\u0421\u0442\u0430\u0440\u0442 \u2192" }), _jsx(ScoreStrip, {})] }) }));
}
function ScoreStrip() {
    const teams = useAliasStore((s) => s.teams);
    const currentIdx = useAliasStore((s) => s.currentTeamIndex);
    const target = useAliasStore((s) => s.targetScore);
    return (_jsx("div", { className: "mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2", children: teams.map((t, i) => {
            const color = TEAM_COLORS.find((c) => c.id === t.color);
            return (_jsxs("div", { className: [
                    'rounded-2xl p-3 text-left shadow-soft',
                    i === currentIdx ? 'bg-white' : 'glass',
                ].join(' '), children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${color.bg}` }), _jsx("span", { className: "text-xs text-muted truncate", children: t.name })] }), _jsxs("div", { className: "font-display font-bold text-lg", children: [t.score, _jsxs("span", { className: "text-muted text-xs font-normal", children: [" / ", target] })] })] }, t.id));
        }) }));
}
