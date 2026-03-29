import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#060606',
        ink: '#0F0F0F',
        lift: '#171717',
        edge: 'rgba(255,255,255,0.07)',
        'edge-hover': 'rgba(255,255,255,0.13)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display sizes for hero headlines
        'display-2xl': ['clamp(3.5rem,8vw,6rem)', { lineHeight: '1.0', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-xl': ['clamp(2.75rem,6vw,4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-lg': ['clamp(2rem,4vw,3rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
      },
      backgroundImage: {
        'brand': 'linear-gradient(135deg, #5B8EFF 0%, #7B61FF 100%)',
        'brand-reverse': 'linear-gradient(135deg, #7B61FF 0%, #5B8EFF 100%)',
        'dot-grid': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.06)'/%3E%3C/svg%3E")`,
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'in-up': 'in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
