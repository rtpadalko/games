import { jsx as _jsx } from "react/jsx-runtime";
const padStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 sm:p-10',
};
export default function Card({ children, pad = 'md', className = '', ...rest }) {
    return (_jsx("div", { className: [
            'bg-white rounded-3xl shadow-soft',
            padStyles[pad],
            className,
        ].join(' '), ...rest, children: children }));
}
