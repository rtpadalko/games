import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
const variantStyles = {
    // Однотонная заливка #7A8F6A (явный hex, чтобы не зависеть от Tailwind-токенов)
    primary: 'bg-[#7A8F6A] text-white hover:bg-[#566849] disabled:bg-[#7A8F6A]/40',
    secondary: 'bg-white text-ink border border-ink/15 hover:border-ink/30 shadow-soft',
    ghost: 'bg-transparent text-ink hover:bg-ink/5',
    danger: 'bg-rose-dark text-white hover:bg-ink disabled:bg-rose/40',
};
const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-xl',
    md: 'px-5 py-2.5 text-base rounded-2xl',
    lg: 'px-7 py-3.5 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-2xl rounded-3xl font-semibold',
};
const Button = forwardRef(({ variant = 'primary', size = 'md', fullWidth, className = '', children, ...props }, ref) => (_jsx(motion.button, { ref: ref, whileHover: { y: -1 }, whileTap: { scale: 0.97 }, transition: { type: 'spring', stiffness: 400, damping: 28 }, className: [
        'inline-flex items-center justify-center gap-2 font-medium',
        'transition-colors disabled:cursor-not-allowed disabled:opacity-70',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className,
    ].join(' '), ...props, children: children })));
Button.displayName = 'Button';
export default Button;
