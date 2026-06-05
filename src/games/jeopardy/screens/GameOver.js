import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Screen from '@/shared/components/Screen';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import { PLAYER_COLORS, useJeopardyStore } from '../store';
export default function GameOver() {
    const players = useJeopardyStore((s) => s.players);
    const startGame = useJeopardyStore((s) => s.startGame);
    const resetAll = useJeopardyStore((s) => s.resetAll);
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const winner = sorted[0];
    const winnerColor = PLAYER_COLORS.find((c) => c.id === winner.color);
    return (_jsx(Screen, { children: _jsxs("div", { className: "w-full max-w-xl text-center", children: [_jsx(motion.div, { initial: { scale: 0.4, rotate: -10, opacity: 0 }, animate: { scale: 1, rotate: 0, opacity: 1 }, transition: { type: 'spring', stiffness: 200, damping: 16 }, className: "mx-auto mb-6 w-40 h-40 rounded-full shadow-soft flex items-center justify-center", style: { backgroundColor: winnerColor.hex }, children: _jsx("span", { className: "text-7xl", children: "\uD83C\uDFC6" }) }), _jsxs("div", { className: "glass rounded-3xl px-6 py-5 shadow-soft inline-block mb-8", children: [_jsx("p", { className: "text-ink/70 mb-1 text-sm uppercase tracking-wide", children: "\u041F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u044C" }), _jsx("h1", { className: "font-display text-5xl font-extrabold text-ink", children: winner.name })] }), _jsxs(Card, { pad: "lg", className: "mb-8 text-left", children: [_jsx("h2", { className: "font-display text-lg font-semibold mb-4 text-center", children: "\u0424\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B" }), _jsx("ol", { className: "space-y-3", children: sorted.map((p, i) => {
                                const c = PLAYER_COLORS.find((x) => x.id === p.color);
                                return (_jsxs("li", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-muted w-5 tabular-nums", children: [i + 1, "."] }), _jsx("span", { className: "w-2.5 h-2.5 rounded-full", style: { backgroundColor: c.hex } }), _jsx("span", { className: "flex-1", children: p.name }), _jsx("span", { className: "font-display font-bold tabular-nums", children: p.score })] }, p.id));
                            }) })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsx(Button, { size: "lg", fullWidth: true, onClick: startGame, children: "\u0420\u0435\u0432\u0430\u043D\u0448" }), _jsx(Button, { size: "lg", variant: "secondary", fullWidth: true, onClick: resetAll, children: "\u041D\u043E\u0432\u0430\u044F \u043F\u0430\u0440\u0442\u0438\u044F" })] }), _jsx(Link, { to: "/", className: "inline-block mt-6 glass rounded-full px-4 py-2 text-ink hover:text-bark text-sm font-medium shadow-soft", children: "\u2190 \u0412 \u043B\u043E\u0431\u0431\u0438" })] }) }));
}
