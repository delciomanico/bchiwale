/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // B-CHIWALE design tokens — sourced from brief
        cyan: '#00AEEF',
        yellow: '#F5C200',
        charcoal: '#1A1A2E',
        'gray-light': '#F4F6F8',
        'gray-mid': '#E0E0E0',
        'gray-text': '#6B7280',
      },
      fontFamily: {
        heading: ['Hanken Grotesk', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.12em',
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '2px',
      },
      boxShadow: {
        'card-hover': '0 8px 32px rgba(0, 174, 239, 0.12)',
        'nav': '0 2px 20px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.7' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'width-grow': {
          '0%': { width: '0' },
          '100%': { width: '3rem' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'width-grow': 'width-grow 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

