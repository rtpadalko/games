import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Screen from '@/shared/components/Screen';
import MediaView from '../components/MediaView';
import { PLAYER_COLORS, useJeopardyStore } from '../store';
/**
 * Активный вопрос с тремя возможными сценариями:
 *   1. «Кот в мешке» → сначала экран передачи получателю
 *   2. «Аукцион»     → сначала экран торгов
 *   3. Обычный       → сразу вопрос + ответ
 * А ещё поддерживает «Без риска» — на нём прячется кнопка «−».
 */
export default function Question() {
    const active = useJeopardyStore((s) => s.activeQuestion);
    const players = useJeopardyStore((s) => s.players);
    if (!active)
        return null;
    const { question, themeName, themeEmoji } = active;
    const special = question.special;
    // 1) «Кот в мешке» — пока не выбрали получателя
    if (special?.kind === 'cat' && !active.forcedPlayerId) {
        return _jsx(CatHandover, { players: players, themeName: themeName });
    }
    // 2) «Аукцион» — пока не зафиксирована ставка
    if (special?.kind === 'auction' && !active.auctionWinnerId) {
        return (_jsx(AuctionStage, { players: players, themeName: themeName, themeEmoji: themeEmoji, baseValue: question.value }));
    }
    // 3) Обычный экран вопроса (или после выбора кота / аукциона)
    return _jsx(QuestionBody, {});
}
/* ─────────────────────────  «Кот в мешке»  ───────────────────────── */
function CatHandover({ players, themeName }) {
    const assignCatTo = useJeopardyStore((s) => s.assignCatTo);
    return (_jsx(Screen, { children: _jsxs("div", { className: "w-full max-w-xl text-center", children: [_jsx(motion.div, { initial: { scale: 0.6, opacity: 0, rotate: -8 }, animate: { scale: 1, opacity: 1, rotate: 0 }, transition: { type: 'spring', stiffness: 200, damping: 16 }, className: "text-8xl mb-6", children: "\uD83C\uDF81" }), _jsxs("div", { className: "glass rounded-3xl px-6 py-5 shadow-soft mb-8", children: [_jsx("p", { className: "text-ink/70 mb-1 text-sm uppercase tracking-wide", children: themeName }), _jsx("h1", { className: "font-display text-4xl font-extrabold text-ink mb-2", children: "\u041A\u043E\u0442 \u0432 \u043C\u0435\u0448\u043A\u0435!" }), _jsx("p", { className: "text-ink/80", children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435, \u043A\u043E\u043C\u0443 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441. \u042D\u0442\u043E\u0442 \u0438\u0433\u0440\u043E\u043A \u043E\u0431\u044F\u0437\u0430\u043D \u043E\u0442\u0432\u0435\u0447\u0430\u0442\u044C \u2014 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u043D\u0435\u043B\u044C\u0437\u044F." })] }), _jsx("div", { className: "space-y-2.5", children: players.map((p) => {
                        const col = PLAYER_COLORS.find((c) => c.id === p.color);
                        return (_jsxs("button", { onClick: () => assignCatTo(p.id), className: "w-full glass rounded-2xl px-4 py-4 shadow-soft flex items-center gap-3 hover:bg-cream/95 transition-colors", children: [_jsx("span", { className: "w-3.5 h-3.5 rounded-full", style: { backgroundColor: col.hex } }), _jsx("span", { className: "flex-1 text-left font-medium text-ink", children: p.name }), _jsx("span", { className: "text-ink/60 text-sm", children: "\u043E\u0442\u0434\u0430\u0442\u044C \u2192" })] }, p.id));
                    }) })] }) }));
}
/* ─────────────────────────  Аукцион  ───────────────────────── */
function AuctionStage({ players, themeName, themeEmoji, baseValue, }) {
    const setAuctionWinner = useJeopardyStore((s) => s.setAuctionWinner);
    const [bids, setBids] = useState(() => Object.fromEntries(players.map((p) => [p.id, baseValue])));
    // Минимальная ставка — номинал вопроса. Можно поставить «пас» через 0.
    const adjust = (playerId, delta) => setBids((b) => ({
        ...b,
        [playerId]: Math.max(0, (b[playerId] ?? baseValue) + delta),
    }));
    const handleWin = (playerId) => {
        const bid = bids[playerId];
        if (bid < baseValue)
            return;
        setAuctionWinner(playerId, bid);
    };
    return (_jsx(Screen, { children: _jsxs("div", { className: "w-full max-w-2xl", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx(motion.div, { initial: { scale: 0.7, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "text-7xl mb-3", children: "\uD83D\uDCB0" }), _jsxs("div", { className: "glass rounded-3xl px-6 py-5 shadow-soft inline-block", children: [_jsxs("p", { className: "text-ink/70 mb-1 text-sm uppercase tracking-wide", children: [themeEmoji, " ", themeName, " \u00B7 \u043D\u043E\u043C\u0438\u043D\u0430\u043B ", baseValue] }), _jsx("h1", { className: "font-display text-3xl font-extrabold text-ink mb-1", children: "\u0410\u0443\u043A\u0446\u0438\u043E\u043D" }), _jsx("p", { className: "text-ink/80 text-sm", children: "\u041A\u0430\u0436\u0434\u044B\u0439 \u0438\u0433\u0440\u043E\u043A \u0441\u0442\u0430\u0432\u0438\u0442, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0433\u043E\u0442\u043E\u0432 \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C. \u041A\u0442\u043E \u0431\u043E\u043B\u044C\u0448\u0435 \u2014 \u0442\u043E\u0442 \u0438 \u0438\u0433\u0440\u0430\u0435\u0442." })] })] }), _jsx("div", { className: "space-y-2.5 mb-6", children: players.map((p) => {
                        const col = PLAYER_COLORS.find((c) => c.id === p.color);
                        const bid = bids[p.id] ?? baseValue;
                        const tooLow = bid < baseValue;
                        return (_jsxs("div", { className: "glass rounded-2xl px-4 py-3 shadow-soft flex items-center gap-3", children: [_jsx("span", { className: "w-3 h-3 rounded-full", style: { backgroundColor: col.hex } }), _jsxs("span", { className: "flex-1 font-medium text-ink truncate", children: [p.name, _jsxs("span", { className: "text-ink/55 text-xs ml-2", children: ["\u0432 \u0431\u0430\u043D\u043A\u0435 ", p.score] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(BidStep, { onClick: () => adjust(p.id, -100), children: "\u2212100" }), _jsx("span", { className: [
                                                'font-display font-bold tabular-nums text-lg w-16 text-center',
                                                tooLow ? 'text-ink/40' : 'text-ink',
                                            ].join(' '), children: bid }), _jsx(BidStep, { onClick: () => adjust(p.id, 100), children: "+100" }), _jsx("button", { onClick: () => handleWin(p.id), disabled: tooLow, className: "ml-2 rounded-2xl bg-[#7A8F6A] text-white px-4 py-2 text-sm font-semibold shadow-soft hover:bg-[#566849] disabled:bg-[#7A8F6A]/40 disabled:cursor-not-allowed transition-colors", children: "\u0418\u0433\u0440\u0430\u0435\u0442" })] })] }, p.id));
                    }) }), _jsxs("p", { className: "text-center text-ink/55 text-sm", children: ["\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0430\u0432\u043A\u0430 \u2014 \u043D\u043E\u043C\u0438\u043D\u0430\u043B \u0432\u043E\u043F\u0440\u043E\u0441\u0430 (", baseValue, "). \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u00AB\u0418\u0433\u0440\u0430\u0435\u0442\u00BB \u0443 \u0442\u043E\u0433\u043E, \u043A\u0442\u043E \u0432\u044B\u0438\u0433\u0440\u0430\u043B \u0442\u043E\u0440\u0433\u0438."] })] }) }));
}
function BidStep({ children, onClick }) {
    return (_jsx("button", { onClick: onClick, className: "w-12 h-9 rounded-xl bg-cream/80 text-ink text-xs font-semibold hover:bg-cream transition-colors", children: children }));
}
/* ─────────────────────────  Обычный экран вопроса  ───────────────────────── */
function QuestionBody() {
    const active = useJeopardyStore((s) => s.activeQuestion);
    const players = useJeopardyStore((s) => s.players);
    const showAnswer = useJeopardyStore((s) => s.showAnswer);
    const awardPoints = useJeopardyStore((s) => s.awardPoints);
    const closeQuestion = useJeopardyStore((s) => s.closeQuestion);
    const { question, themeName, themeEmoji, showAnswer: revealed } = active;
    const special = question.special;
    // Реальная стоимость для начисления очков:
    //  - «Кот»: либо overrideValue, либо номинал
    //  - «Аукцион»: ставка победителя
    //  - иначе: номинал
    const effectiveValue = special?.kind === 'cat'
        ? special.overrideValue ?? question.value
        : special?.kind === 'auction' && active.auctionBid != null
            ? active.auctionBid
            : question.value;
    // Кому разрешено отвечать?
    //  - «Кот»: только тот, кому передали
    //  - «Аукцион»: только победитель торгов
    //  - иначе: все
    const restrictedPlayerId = active.forcedPlayerId ?? active.auctionWinnerId ?? null;
    const eligiblePlayers = restrictedPlayerId
        ? players.filter((p) => p.id === restrictedPlayerId)
        : players;
    const noRisk = special?.kind === 'noRisk';
    return (_jsx(Screen, { className: "!justify-start sm:!justify-center", children: _jsxs("div", { className: "w-full max-w-4xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 gap-3 flex-wrap", children: [_jsxs("div", { className: "glass rounded-2xl px-4 py-2 shadow-soft flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: themeEmoji }), _jsx("span", { className: "font-medium text-ink", children: themeName })] }), _jsx(SpecialBadges, { special: special }), _jsx("div", { className: "glass rounded-2xl px-5 py-2 shadow-soft font-display font-extrabold text-2xl text-ink tabular-nums", children: effectiveValue })] }), restrictedPlayerId && (_jsx(ForcedPlayerBadge, { players: players, playerId: restrictedPlayerId })), _jsxs(motion.div, { initial: { scale: 0.96, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { type: 'spring', stiffness: 220, damping: 22 }, className: "bg-white rounded-4xl shadow-soft p-6 sm:p-8 mb-6", children: [question.media && _jsx(MediaView, { media: question.media }), _jsx("p", { className: "font-display text-2xl sm:text-4xl font-bold text-ink text-center leading-tight", children: question.text })] }), _jsx(AnimatePresence, { children: revealed && (_jsxs(motion.div, { initial: { y: 16, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 16, opacity: 0 }, transition: { duration: 0.4 }, className: "bg-[#7A8F6A] text-cream rounded-3xl p-6 sm:p-7 shadow-soft mb-6", children: [_jsx("div", { className: "text-cream/80 text-xs uppercase tracking-wider mb-2", children: "\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442" }), question.answerMedia && (_jsx("div", { className: "mb-3", children: _jsx(MediaView, { media: question.answerMedia }) })), _jsx("p", { className: "font-display text-2xl sm:text-3xl font-bold", children: question.answer })] })) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [!revealed && (_jsx("button", { onClick: showAnswer, className: "flex-1 rounded-3xl bg-[#7A8F6A] text-white py-5 text-xl font-semibold shadow-soft hover:bg-[#566849] transition-colors", children: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0442\u0432\u0435\u0442" })), _jsx("button", { onClick: closeQuestion, className: "flex-1 rounded-3xl bg-cream text-ink border border-ink/15 py-5 text-xl font-semibold shadow-soft hover:border-ink/35 transition-colors", children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441" })] }), _jsxs("div", { className: "space-y-2.5", children: [_jsx("div", { className: "text-ink/70 text-sm", children: noRisk
                                ? `Только +${effectiveValue} — за неверный ответ очки не снимаются.`
                                : restrictedPlayerId
                                    ? `Отвечает один игрок: + или − ${effectiveValue} очков.`
                                    : `Кто ответил? Нажмите + или − — игрок получит ${effectiveValue} очков (или потеряет).` }), eligiblePlayers.map((p) => {
                            const col = PLAYER_COLORS.find((c) => c.id === p.color);
                            return (_jsxs("div", { className: "glass rounded-2xl px-4 py-3 shadow-soft flex items-center gap-3", children: [_jsx("span", { className: "w-3 h-3 rounded-full shrink-0", style: { backgroundColor: col.hex } }), _jsx("span", { className: "flex-1 font-medium text-ink truncate", children: p.name }), _jsx("span", { className: "font-display font-bold tabular-nums text-ink w-14 text-right", children: p.score }), _jsxs("div", { className: "flex gap-2", children: [!noRisk && (_jsx("button", { onClick: () => awardPoints(p.id, -effectiveValue), className: "w-11 h-11 rounded-2xl bg-[#C77B5C] text-white text-xl font-bold shadow-soft hover:bg-[#8E5238] transition-colors", "aria-label": `Снять ${effectiveValue} у ${p.name}`, children: "\u2212" })), _jsx("button", { onClick: () => awardPoints(p.id, effectiveValue), className: "w-11 h-11 rounded-2xl bg-[#7A8F6A] text-white text-xl font-bold shadow-soft hover:bg-[#566849] transition-colors", "aria-label": `Дать ${effectiveValue} ${p.name}`, children: "+" })] })] }, p.id));
                        })] })] }) }));
}
/* ─────────────────────────  Вспомогательное  ───────────────────────── */
function SpecialBadges({ special }) {
    if (!special)
        return null;
    if (special.kind === 'cat')
        return _jsx(Badge, { bg: "#B59FB8", emoji: "\uD83C\uDF81", text: "\u041A\u043E\u0442 \u0432 \u043C\u0435\u0448\u043A\u0435" });
    if (special.kind === 'auction')
        return _jsx(Badge, { bg: "#D9A05B", emoji: "\uD83D\uDCB0", text: "\u0410\u0443\u043A\u0446\u0438\u043E\u043D" });
    if (special.kind === 'noRisk')
        return _jsx(Badge, { bg: "#7A8F6A", emoji: "\uD83D\uDEE1", text: "\u0411\u0435\u0437 \u0440\u0438\u0441\u043A\u0430" });
    return null;
}
function Badge({ bg, emoji, text }) {
    return (_jsxs("span", { className: "rounded-2xl px-3 py-1.5 text-white text-sm font-semibold shadow-soft flex items-center gap-1.5", style: { backgroundColor: bg }, children: [_jsx("span", { children: emoji }), text] }));
}
function ForcedPlayerBadge({ players, playerId, }) {
    const p = players.find((x) => x.id === playerId);
    if (!p)
        return null;
    const col = PLAYER_COLORS.find((c) => c.id === p.color);
    return (_jsxs("div", { className: "glass rounded-2xl px-4 py-3 shadow-soft mb-4 flex items-center gap-3", children: [_jsx("span", { className: "text-sm text-ink/70", children: "\u041E\u0442\u0432\u0435\u0447\u0430\u0435\u0442" }), _jsx("span", { className: "w-3 h-3 rounded-full", style: { backgroundColor: col.hex } }), _jsx("span", { className: "font-display font-bold text-lg text-ink", children: p.name })] }));
}
