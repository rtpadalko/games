import { Routes, Route, Navigate } from 'react-router-dom';
import Lobby from './routes/Lobby';
import AliasRoute from './games/alias/AliasRoute';
import JeopardyRoute from './games/jeopardy/JeopardyRoute';
import QuizPlaceholder from './games/quiz/Placeholder';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/alias/*" element={<AliasRoute />} />
      <Route path="/jeopardy/*" element={<JeopardyRoute />} />
      <Route path="/quiz" element={<QuizPlaceholder />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
