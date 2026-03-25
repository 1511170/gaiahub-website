/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    // Skills activas añaden sus paths aquí
  ],
  theme: {
    extend: {
      // Gaia Hub Solar Color Palette
      colors: {
        // Primary - Solar Gold
        primary: {
          DEFAULT: '#776300',
          dim: '#695700',
          container: '#ffd709',
          fixed: '#ffd709',
          'fixed-dim': '#efc900',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#5b4b00',
          fixed: '#453900',
          'fixed-variant': '#665500',
        },
        
        // Secondary - Regenerative Green
        secondary: {
          DEFAULT: '#00743a',
          dim: '#006632',
          container: '#86fea7',
          fixed: '#86fea7',
          'fixed-dim': '#78ef9a',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#00612f',
          fixed: '#004c23',
          'fixed-variant': '#006c35',
        },
        
        // Tertiary - Wisdom Purple
        tertiary: {
          DEFAULT: '#8e00fd',
          dim: '#7d00e1',
          container: '#d0a7ff',
          fixed: '#d0a7ff',
          'fixed-dim': '#c695ff',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#500092',
          fixed: '#31005e',
          'fixed-variant': '#5c00a7',
        },
        
        // Surface Colors
        background: '#fefee5',
        'on-background': '#363b10',
        surface: {
          DEFAULT: '#fefee5',
          variant: '#e7edb1',
          dim: '#e1e8a2',
          bright: '#fefee5',
        },
        'on-surface': {
          DEFAULT: '#363b10',
          variant: '#626838',
        },
        'inverse-surface': '#0e0f03',
        'inverse-on-surface': '#9e9e88',
        
        // Surface Containers
        'surface-container': {
          lowest: '#ffffff',
          low: '#fafcda',
          DEFAULT: '#f4f7ce',
          high: '#eef2bf',
          highest: '#e7edb1',
        },
        
        // Outline
        outline: {
          DEFAULT: '#7f8452',
          variant: '#b8be86',
        },
        
        // Error
        error: {
          DEFAULT: '#b23d21',
          dim: '#821a01',
          container: '#fa7150',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#671200',
        },
        
        // Brand aliases
        brand: {
          50: '#fefee5',
          100: '#fafcda',
          200: '#f4f7ce',
          300: '#eef2bf',
          400: '#e7edb1',
          500: '#776300',
          600: '#695700',
          700: '#5b4b00',
          800: '#453900',
          900: '#363b10',
        },
      },
      
      // Typography
      fontFamily: {
        headline: ['Epilogue', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        label: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Epilogue', 'system-ui', 'sans-serif'],
      },
      
      // Border Radius (Material 3 style)
      borderRadius: {
        'none': '0',
        'sm': '0.5rem',
        DEFAULT: '1rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '2.5rem',
        'full': '9999px',
      },
      
      // Box Shadow
      boxShadow: {
        'ethereal': '0 40px 60px -20px rgba(54, 59, 16, 0.06)',
        'glass': '0 8px 32px rgba(54, 59, 16, 0.08)',
      },
      
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
