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

  return (
    <AnimatePresence mode="wait">
      {phase === 'setup' && <Setup key="setup" />}
      {phase === 'intro' && <RoundIntro key="intro" />}
      {phase === 'round' && <Round key="round" />}
      {phase === 'summary' && <RoundSummary key="summary" />}
      {phase === 'scoreboard' && <Scoreboard key="scoreboard" />}
      {phase === 'winner' && <Winner key="winner" />}
    </AnimatePresence>
  );
}
