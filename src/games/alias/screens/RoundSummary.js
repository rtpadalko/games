import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const color = TEAM_COLORS.find((c) => c.id === team.color);
    const guessed = words.filter((w) => w.guessed).length;
    const missed = words.length - guessed;
    const delta = guessed - (penalizeSkip ? missed : 0);
    return (_jsx(Screen, { children: _jsxs("div", { className: "w-full max-w-2xl", children: [_jsxs("div", { className: "glass rounded-3xl px-6 py-5 shadow-soft text-center mb-6", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-ink/70 mb-1", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${color.bg}` }), _jsx("span", { className: "text-sm", children: team.name })] }), _jsx("h1", { className: "font-display text-3xl font-bold mb-1 text-ink", children: "\u0418\u0442\u043E\u0433 \u0440\u0430\u0443\u043D\u0434\u0430" }), _jsx("p", { className: "text-ink/70 text-sm", children: "\u041C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043B\u044E\u0431\u043E\u0435 \u0441\u043B\u043E\u0432\u043E, \u0435\u0441\u043B\u0438 \u043E\u0448\u0438\u0431\u043B\u0438\u0441\u044C \u0441 \u0440\u0435\u0448\u0435\u043D\u0438\u0435\u043C" })] }), _jsx(Card, { pad: "lg", className: "mb-6", children: words.length === 0 ? (_jsx("p", { className: "text-center text-muted py-8", children: "\u0412 \u044D\u0442\u043E\u043C \u0440\u0430\u0443\u043D\u0434\u0435 \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0441\u043B\u043E\u0432\u0430. \u0411\u044B\u0432\u0430\u0435\u0442." })) : (_jsx("ul", { className: "divide-y divide-ink/5", children: words.map((w, i) => (_jsxs("li", { className: "flex items-center justify-between py-3", children: [_jsx("span", { className: "text-lg", children: w.word }), _jsx("button", { onClick: () => toggle(i), className: [
                                        'rounded-full w-10 h-10 flex items-center justify-center font-bold transition-colors',
                                        w.guessed
                                            ? 'bg-sage text-white'
                                            : 'bg-rose/15 text-rose-dark hover:bg-rose/25',
                                    ].join(' '), "aria-label": w.guessed ? 'Угадано' : 'Пропущено', children: w.guessed ? '✓' : '✕' })] }, i))) })) }), _jsx(Card, { pad: "md", className: "mb-6", children: _jsxs("div", { className: "flex items-center justify-around text-center", children: [_jsx(Stat, { label: "\u0423\u0433\u0430\u0434\u0430\u043D\u043E", value: guessed, tone: "sage" }), _jsx(Stat, { label: "\u041F\u0440\u043E\u043F\u0443\u0441\u043A\u043E\u0432", value: missed, tone: "rose" }), _jsx(Stat, { label: "\u041A \u0441\u0447\u0451\u0442\u0443", value: delta > 0 ? `+${delta}` : `${delta}`, tone: "ink" })] }) }), _jsx(Button, { size: "xl", fullWidth: true, onClick: apply, children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" })] }) }));
}
function Stat({ label, value, tone, }) {
    const toneClass = tone === 'sage' ? 'text-sage-dark' :
        tone === 'rose' ? 'text-rose-dark' : 'text-ink';
    return (_jsxs("div", { children: [_jsx("div", { className: `font-display font-extrabold text-3xl tabular-nums ${toneClass}`, children: value }), _jsx("div", { className: "text-muted text-xs mt-1", children: label })] }));
}
