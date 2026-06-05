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

  return (
    <AnimatePresence mode="wait">
      {phase === 'setup' && <Setup key="setup" />}
      {phase === 'board' && <Board key="board" />}
      {phase === 'question' && <Question key="question" />}
      {phase === 'gameover' && <GameOver key="gameover" />}
    </AnimatePresence>
  );
}
