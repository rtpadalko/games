import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence } from 'framer-motion';
import { useJeopardyStore } from './store';
import Setup from './screens/Setup';
import Board from './screens/Board';
import Question from './screens/Question';
import GameOver from './screens/GameOver';
/**
 * Маршрут «Своей игры».
 * Текущий экран определяется фазой стора (а не URL).
 */
export default function JeopardyRoute() {
    const phase = useJeopardyStore((s) => s.phase);
    return (_jsxs(AnimatePresence, { mode: "wait", children: [phase === 'setup' && _jsx(Setup, {}, "setup"), phase === 'board' && _jsx(Board, {}, "board"), phase === 'question' && _jsx(Question, {}, "question"), phase === 'gameover' && _jsx(GameOver, {}, "gameover")] }));
}
