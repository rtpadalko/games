import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Универсальный рендер медиа в вопросе: image / video / audio.
 * Растягивается по ширине родителя, ограничивает высоту,
 * использует мягкие скруглённые рамки в стиле игры.
 */
export default function MediaView({ media }) {
    switch (media.kind) {
        case 'image':
            return (_jsxs("figure", { className: "mb-5", children: [_jsx("img", { src: media.src, alt: media.alt ?? '', className: "w-full max-h-[44vh] object-cover rounded-3xl shadow-soft" }), media.caption && (_jsx("figcaption", { className: "text-center text-ink/60 text-sm mt-2", children: media.caption }))] }));
        case 'video':
            return (_jsx("div", { className: "mb-5 rounded-3xl overflow-hidden shadow-soft bg-ink/5", children: _jsx("video", { src: media.src, poster: media.poster, controls: true, preload: "metadata", className: "w-full max-h-[44vh]" }) }));
        case 'audio':
            return (_jsxs("div", { className: "mb-5 glass rounded-3xl px-5 py-4 shadow-soft flex items-center gap-3", children: [_jsx("span", { className: "text-3xl", children: "\uD83C\uDFA7" }), _jsx("audio", { src: media.src, controls: true, preload: "metadata", className: "flex-1" })] }));
    }
}
