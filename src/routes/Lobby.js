import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import forestBg from '@/assets/forest-bg.jpg';
const games = [
    {
        to: '/alias',
        title: 'Алиас',
        description: 'Объясняй слова за минуту. Команды соревнуются на скорость и фантазию.',
        emoji: '🦊',
        ready: true,
    },
    {
        to: '/jeopardy',
        title: 'Своя игра',
        description: 'Темы, стоимости, табло. Классика интеллектуальных шоу — в уюте.',
        emoji: '🍂',
        ready: true,
    },
    {
        to: '/quiz',
        title: 'Викторина',
        description: 'Игроки заходят с телефонов, очки за скорость ответа.',
        emoji: '🍄',
        ready: false,
    },
];
export default function Lobby() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { "aria-hidden": true, className: "fixed inset-0 -z-10 overflow-hidden", children: [_jsx("img", { src: forestBg, alt: "", className: "w-full h-full object-cover scale-105" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" }), _jsx("div", { className: "absolute inset-0 mix-blend-soft-light", style: {
                            background: 'radial-gradient(ellipse at center, rgba(255,236,200,0.25) 0%, transparent 70%)',
                        } })] }), _jsx("main", { className: "relative min-h-dvh w-full flex flex-col items-center justify-center px-4 py-12 sm:py-16", children: _jsxs("div", { className: "w-full max-w-5xl", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.9 }, className: "text-center mb-14", style: { textShadow: '0 2px 24px rgba(20, 30, 20, 0.55)' }, children: [_jsx("p", { className: "uppercase tracking-[0.35em] text-xs mb-3 text-cream/80", children: "\u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u0433\u0440\u044B" }), _jsxs("h1", { className: "font-display text-6xl sm:text-7xl font-extrabold tracking-tight leading-none text-cream", children: [_jsx("span", { className: "inline-block", children: "\u0418\u0433\u0440\u043E\u0442\u0435\u043A\u0430" }), _jsx("span", { className: "inline-block ml-3", children: "\uD83C\uDF3F" })] }), _jsx("p", { className: "mt-5 text-cream/85 text-lg max-w-md mx-auto leading-relaxed", children: "\u0423\u044E\u0442\u043D\u0430\u044F \u0440\u043E\u0449\u0430, \u0433\u0434\u0435 \u0436\u0438\u0432\u0443\u0442 \u043D\u0430\u0448\u0438 \u043B\u044E\u0431\u0438\u043C\u044B\u0435 \u0438\u0433\u0440\u044B. \u0412\u043E\u0437\u044C\u043C\u0438\u0442\u0435 \u0447\u0430\u0439, \u043F\u043E\u0437\u043E\u0432\u0438\u0442\u0435 \u0434\u0440\u0443\u0437\u0435\u0439." })] }), _jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: games.map((g, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 + i * 0.12, duration: 0.8 }, children: _jsx(Lantern, { tile: g, index: i }) }, g.to))) })] }) })] }));
}
function Lantern({ tile }) {
    const inner = (_jsxs(motion.div, { whileHover: tile.ready ? { y: -6, scale: 1.015 } : undefined, whileTap: tile.ready ? { scale: 0.99 } : undefined, transition: { type: 'spring', stiffness: 260, damping: 22 }, className: [
            'group relative h-full rounded-4xl p-7 sm:p-8',
            // полупрозрачная карточка с blur — «фонарик сквозь листву»
            'bg-cream/85 backdrop-blur-md border border-white/40',
            'shadow-soft',
            tile.ready ? 'cursor-pointer' : 'opacity-80 cursor-not-allowed',
        ].join(' '), children: [_jsx("div", { className: [
                    'absolute -inset-px rounded-4xl pointer-events-none transition-opacity duration-500',
                    tile.ready ? 'opacity-70 group-hover:opacity-100' : 'opacity-40',
                ].join(' '), style: {
                    boxShadow: '0 0 50px rgba(240, 201, 136, 0.5), inset 0 0 35px rgba(245, 200, 147, 0.25)',
                } }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "text-5xl mb-4", children: tile.emoji }), _jsx("h2", { className: "font-display text-2xl sm:text-3xl font-bold text-ink", children: tile.title }), _jsx("p", { className: "mt-2 text-muted text-sm leading-relaxed", children: tile.description }), _jsx("div", { className: "mt-6", children: tile.ready ? (_jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-medium text-ink", children: ["\u0412\u043E\u0439\u0442\u0438 \u0432 \u043A\u0440\u0443\u0433", _jsx(motion.span, { "aria-hidden": true, className: "inline-block", animate: { x: [0, 4, 0] }, transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }, children: "\u2192" })] })) : (_jsx("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium bg-cream rounded-full px-3 py-1 text-muted border border-bark/10", children: "\u0421\u043A\u043E\u0440\u043E" })) })] })] }));
    return tile.ready ? _jsx(Link, { to: tile.to, children: inner }) : inner;
}
