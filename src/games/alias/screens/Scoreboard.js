import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(Screen, { children: _jsxs("div", { className: "w-full max-w-xl", children: [_jsx("div", { className: "glass rounded-3xl px-6 py-4 shadow-soft text-center mb-8", children: _jsx("h1", { className: "font-display text-3xl font-bold text-ink", children: "\u0422\u0430\u0431\u043B\u043E" }) }), _jsx(Card, { pad: "lg", className: "mb-6", children: _jsx("div", { className: "space-y-4", children: teams.map((t, i) => {
                            const color = TEAM_COLORS.find((c) => c.id === t.color);
                            const progress = Math.min(1, t.score / target);
                            const justPlayed = i === currentTeamIndex;
                            return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `w-2.5 h-2.5 rounded-full ${color.bg}` }), _jsx("span", { className: "font-medium", children: t.name }), justPlayed && (_jsx("span", { className: "text-xs text-muted", children: "(\u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E)" }))] }), _jsxs("span", { className: "font-display font-bold tabular-nums", children: [t.score, _jsxs("span", { className: "text-muted text-sm font-normal", children: [" / ", target] })] })] }), _jsx("div", { className: "h-2.5 rounded-full bg-ink/5 overflow-hidden", children: _jsx(motion.div, { className: `h-full ${color.bg}`, initial: { width: 0 }, animate: { width: `${progress * 100}%` }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }) })] }, t.id));
                        }) }) }), _jsx("div", { className: "flex justify-center mb-4", children: _jsxs("p", { className: "glass rounded-full px-5 py-2 text-ink/80 shadow-soft text-sm", children: ["\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430: ", _jsx("b", { className: "text-ink", children: nextTeamName })] }) }), _jsx(Button, { size: "xl", fullWidth: true, onClick: nextTeam, children: "\u0414\u0430\u043B\u044C\u0448\u0435 \u2192" })] }) }));
}
