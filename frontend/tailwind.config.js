/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: { DEFAULT: '#7C3AED', light: '#A78BFA', dark: '#6D28D9' },
        cyan: { DEFAULT: '#06B6D4', light: '#67E8F9' },
        pink: { DEFAULT: '#EC4899' },
        bg: { DEFAULT: '#030014', secondary: '#0d0d2b' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
      transitionDuration: { 400: '400ms' },
    },
  },
  plugins: [],
};
