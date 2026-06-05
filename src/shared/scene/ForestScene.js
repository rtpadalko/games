import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useParallax } from '@/shared/hooks/useParallax';
import Creatures from './Creatures';
/**
 * Полноэкранный фон с пятью параллакс-слоями.
 * Слои сдвигаются по координатам мыши через spring — мягко, без рывков.
 * Все цвета — из CSS-переменных, так что смена темы происходит сама.
 */
export default function ForestScene({ tod }) {
    const { x, y } = useParallax();
    // Spring-обёртки превращают «прыгающие» mouse-координаты в плавное движение
    const sx = useSpring(useMv(x), { stiffness: 60, damping: 18 });
    const sy = useSpring(useMv(y), { stiffness: 60, damping: 18 });
    return (_jsxs("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-sky-top to-sky-bottom" }), _jsx(SunMoon, { tod: tod }), _jsx(Layer, { depthX: sx, depthY: sy, strength: 6, children: _jsx("svg", { viewBox: "0 0 1600 900", preserveAspectRatio: "xMidYMax slice", className: "w-full h-full", children: _jsx("path", { d: "M0 620 Q200 540 420 580 T780 590 T1200 560 T1600 600 L1600 900 L0 900 Z", className: "fill-hills/70" }) }) }), _jsx(Layer, { depthX: sx, depthY: sy, strength: 14, children: _jsx("svg", { viewBox: "0 0 1600 900", preserveAspectRatio: "xMidYMax slice", className: "w-full h-full", children: _jsx(FarTrees, {}) }) }), _jsx(Layer, { depthX: sx, depthY: sy, strength: 24, children: _jsx("svg", { viewBox: "0 0 1600 900", preserveAspectRatio: "xMidYMax slice", className: "w-full h-full", children: _jsx(MidTrees, {}) }) }), tod === 'night' && _jsx(Fireflies, {}), _jsx(Layer, { depthX: sx, depthY: sy, strength: 42, children: _jsx("svg", { viewBox: "0 0 1600 900", preserveAspectRatio: "xMidYMax slice", className: "w-full h-full", children: _jsx(NearFoliage, {}) }) }), _jsx("div", { className: "absolute inset-x-0 bottom-0 h-1/3 pointer-events-none", style: {
                    background: 'linear-gradient(to top, rgb(var(--ground) / 0.55), transparent)',
                } }), _jsx(Creatures, {})] }));
}
/* ---------- Утилиты ---------- */
function useMv(v) {
    const mv = useMotionValue(v);
    mv.set(v);
    return mv;
}
function Layer({ children, depthX, depthY, strength, }) {
    const tx = useTransform(depthX, (v) => v * -strength);
    const ty = useTransform(depthY, (v) => v * -strength);
    const transform = useMotionTemplate `translate3d(${tx}px, ${ty}px, 0)`;
    return (_jsx(motion.div, { className: "absolute inset-0 will-change-transform", style: { transform }, children: children }));
}
/* ---------- Солнце / Луна ---------- */
function SunMoon({ tod }) {
    // Позиция орбиты «прокручивается» от рассвета к ночи
    const pos = useMemo(() => {
        switch (tod) {
            case 'dawn':
                return { left: '15%', top: '55%', size: 220, opacity: 0.5 };
            case 'day':
                return { left: '70%', top: '12%', size: 180, opacity: 0.45 };
            case 'sunset':
                return { left: '78%', top: '52%', size: 260, opacity: 0.85 };
            case 'night':
                return { left: '78%', top: '14%', size: 140, opacity: 0.7 };
        }
    }, [tod]);
    return (_jsx(motion.div, { className: "absolute rounded-full", animate: { left: pos.left, top: pos.top, width: pos.size, height: pos.size, opacity: pos.opacity }, transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1] }, style: {
            translate: '-50% -50%',
            background: 'radial-gradient(circle, rgb(var(--glow) / 0.95) 0%, rgb(var(--glow) / 0.4) 35%, transparent 70%)',
            filter: 'blur(2px)',
        } }));
}
/* ---------- Деревья (SVG) ---------- */
/** Простое стилизованное дерево-силуэт, можно масштабировать. */
function Tree({ x, y, scale = 1, className = 'fill-trees-mid', variant = 0, }) {
    // 3 формы кроны — для разнообразия
    const crowns = [
        'M0 -130 Q42 -110 38 -60 Q52 -38 38 -12 Q22 6 0 0 Q-22 6 -38 -12 Q-52 -38 -38 -60 Q-42 -110 0 -130 Z',
        'M0 -150 Q50 -130 44 -85 Q60 -50 42 -22 Q22 -6 0 -8 Q-22 -6 -42 -22 Q-60 -50 -44 -85 Q-50 -130 0 -150 Z',
        'M0 -120 Q35 -105 32 -65 Q45 -45 28 -22 Q14 -6 0 -8 Q-14 -6 -28 -22 Q-45 -45 -32 -65 Q-35 -105 0 -120 Z',
    ];
    const trunk = 'M-4 0 L-4 22 L4 22 L4 0 Z';
    return (_jsxs("g", { transform: `translate(${x} ${y}) scale(${scale})`, children: [_jsx("path", { d: trunk, className: "fill-bark" }), _jsx("path", { d: crowns[variant % crowns.length], className: className })] }));
}
function FarTrees() {
    // Случайно расставленные мелкие силуэты — фиксированные сидом
    const trees = useMemo(() => seedTrees(28, 1600, [560, 640], [0.5, 0.85], 7), []);
    return (_jsx(_Fragment, { children: trees.map((t, i) => (_jsx(Tree, { ...t, className: "fill-trees-far" }, i))) }));
}
function MidTrees() {
    const trees = useMemo(() => seedTrees(14, 1600, [620, 720], [0.85, 1.4], 13), []);
    return (_jsx(_Fragment, { children: trees.map((t, i) => (_jsx(Tree, { ...t, className: "fill-trees-mid" }, i))) }));
}
/* ---------- Передний план: листья и ветви ---------- */
function NearFoliage() {
    return (_jsxs(_Fragment, { children: [_jsxs("g", { className: "origin-top-left", style: { transformOrigin: 'top left' }, children: [_jsx("path", { d: "M-40 -20 Q150 60 230 240 Q150 200 60 240 Q20 140 -40 120 Z", className: "fill-trees-near/95" }), _jsx(Leaf, { cx: 170, cy: 130, r: 48, rot: -15 }), _jsx(Leaf, { cx: 250, cy: 210, r: 42, rot: 20 }), _jsx(Leaf, { cx: 90, cy: 90, r: 36, rot: 35 })] }), _jsxs("g", { style: { transformOrigin: 'top right' }, children: [_jsx("path", { d: "M1640 -10 Q1480 80 1380 220 Q1500 240 1580 200 Q1640 120 1660 80 Z", className: "fill-trees-near/95" }), _jsx(Leaf, { cx: 1470, cy: 130, r: 52, rot: 20 }), _jsx(Leaf, { cx: 1390, cy: 210, r: 42, rot: -25 })] }), _jsx("path", { d: "M-20 880 Q160 760 320 820 Q480 770 640 820 Q820 760 980 820 Q1140 770 1320 820 Q1480 770 1620 820 L1620 900 L-20 900 Z", className: "fill-ground" })] }));
}
function Leaf({ cx, cy, r, rot }) {
    return (_jsxs("g", { transform: `translate(${cx} ${cy}) rotate(${rot})`, className: "origin-center", children: [_jsx("path", { d: `M0 ${-r} Q${r * 0.7} ${-r * 0.2} 0 ${r} Q${-r * 0.7} ${-r * 0.2} 0 ${-r} Z`, className: "fill-trees-near" }), _jsx("path", { d: `M0 ${-r} L0 ${r}`, className: "stroke-bark/40", strokeWidth: 1.5, fill: "none" })] }));
}
/* ---------- Светлячки (только ночью) ---------- */
function Fireflies() {
    const flies = useMemo(() => {
        const arr = [];
        let s = 7;
        const rnd = () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
        for (let i = 0; i < 28; i++) {
            arr.push({
                left: `${rnd() * 100}%`,
                top: `${30 + rnd() * 55}%`,
                delay: rnd() * 6,
                dur: 4 + rnd() * 5,
                size: 3 + rnd() * 4,
            });
        }
        return arr;
    }, []);
    return (_jsx("div", { className: "absolute inset-0", children: flies.map((f, i) => (_jsx(motion.span, { className: "absolute rounded-full bg-glow", style: {
                left: f.left,
                top: f.top,
                width: f.size,
                height: f.size,
                boxShadow: '0 0 12px rgb(var(--glow) / 0.8), 0 0 24px rgb(var(--glow) / 0.4)',
            }, animate: {
                opacity: [0.15, 1, 0.25, 0.9, 0.15],
                x: [0, 12, -6, 8, 0],
                y: [0, -10, 4, -8, 0],
            }, transition: {
                duration: f.dur,
                delay: f.delay,
                repeat: Infinity,
                ease: 'easeInOut',
            } }, i))) }));
}
/* ---------- Помощник: «детерминированный» рандом ---------- */
function seedTrees(count, width, yRange, scaleRange, seed) {
    let s = seed;
    const rnd = () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
    return Array.from({ length: count }).map(() => {
        const x = rnd() * width;
        const y = yRange[0] + rnd() * (yRange[1] - yRange[0]);
        const scale = scaleRange[0] + rnd() * (scaleRange[1] - scaleRange[0]);
        return { x, y, scale, variant: Math.floor(rnd() * 3) };
    });
}
