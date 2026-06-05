import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence } from 'framer-motion';
import { useAliasStore } from './store';
import Setup from './screens/Setup';
import RoundIntro from './screens/RoundIntro';
import Round from './screens/Round';
import RoundSummary from './screens/RoundSummary';
import Scoreboard from './screens/Scoreboard';
import Winner from './screens/Winner';
/**
 * Хост-маршрут для Алиаса: рендерит экран по текущей фазе из стора.
 * Внутренние маршруты вложенных URL не используем — фаза диктует UI.
 */
export default function AliasRoute() {
    const phase = useAliasStore((s) => s.phase);
    return (_jsxs(AnimatePresence, { mode: "wait", children: [phase === 'setup' && _jsx(Setup, {}, "setup"), phase === 'intro' && _jsx(RoundIntro, {}, "intro"), phase === 'round' && _jsx(Round, {}, "round"), phase === 'summary' && _jsx(RoundSummary, {}, "summary"), phase === 'scoreboard' && _jsx(Scoreboard, {}, "scoreboard"), phase === 'winner' && _jsx(Winner, {}, "winner")] }));
}
