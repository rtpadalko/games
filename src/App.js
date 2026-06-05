import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import Lobby from './routes/Lobby';
import AliasRoute from './games/alias/AliasRoute';
import JeopardyRoute from './games/jeopardy/JeopardyRoute';
import QuizPlaceholder from './games/quiz/Placeholder';
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Lobby, {}) }), _jsx(Route, { path: "/alias/*", element: _jsx(AliasRoute, {}) }), _jsx(Route, { path: "/jeopardy/*", element: _jsx(JeopardyRoute, {}) }), _jsx(Route, { path: "/quiz", element: _jsx(QuizPlaceholder, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
}
