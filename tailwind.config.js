/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Базовые «лесные» оттенки (тёплые)
        cream: '#FAF6F1',
        moss: {
          DEFAULT: '#7A8F6A',
          dark: '#566849',
          light: '#A8BC97',
        },
        bark: {
          DEFAULT: '#6B4F3A',
          dark: '#6B4F3A',
          light: '#9B7B5E',
        },
        honey: {
          DEFAULT: '#D9A05B',
          light: '#F0C988',
          dark: '#A87437',
        },
        amber: {
          DEFAULT: '#E2A05F',
          light: '#F5C893',
          dark: '#B07534',
        },
        terra: {
          DEFAULT: '#C77B5C',
          light: '#E0A589',
          dark: '#8E5238',
        },
        ink: '#3B342E',
        muted: '#8C8278',

        // Legacy команды Алиаса (приведены к тёплой палитре)
        sage: {
          DEFAULT: '#7A8F6A',
          light: '#A8BC97',
          dark: '#566849',
        },
        rose: {
          DEFAULT: '#C77B5C',   // терракотовая «роза»
          light: '#E0A589',
          dark: '#8E5238',
        },
        lavender: {
          DEFAULT: '#B59FB8',
          light: '#D5C5D7',
          dark: '#8A7290',
        },
        peach: {
          DEFAULT: '#E2A05F',
          light: '#F5C893',
          dark: '#B07534',
        },

        // Семантические токены — берутся из CSS-переменных,
        // меняются в зависимости от времени суток
        sky: {
          top: 'rgb(var(--sky-top) / <alpha-value>)',
          bottom: 'rgb(var(--sky-bottom) / <alpha-value>)',
        },
        hills: 'rgb(var(--hills) / <alpha-value>)',
        'trees-far': 'rgb(var(--trees-far) / <alpha-value>)',
        'trees-mid': 'rgb(var(--trees-mid) / <alpha-value>)',
        'trees-near': 'rgb(var(--trees-near) / <alpha-value>)',
        ground: 'rgb(var(--ground) / <alpha-value>)',
        glow: 'rgb(var(--glow) / <alpha-value>)',
        'text-main': 'rgb(var(--text-main) / <alpha-value>)',
        'text-soft': 'rgb(var(--text-soft) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        // Заголовки используют тот же Inter, только в самых тяжёлых весах —
        // получается чисто, современно, без «прыжков» после загрузки.
        display: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(59, 52, 46, 0.18)',
        glow: '0 0 24px rgba(226, 160, 95, 0.35)',
        lantern: '0 0 40px rgba(240, 201, 136, 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'sway-slow': 'sway 8s ease-in-out infinite',
        'sway': 'sway 5s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'blink': 'blink 5s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-1.2deg)' },
          '50%': { transform: 'rotate(1.2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        breathe: {
          '0%, 100%': { opacity: 0.85, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
        blink: {
          '0%, 92%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.1)' },
        },
      },
    },
  },
  plugins: [],
};
