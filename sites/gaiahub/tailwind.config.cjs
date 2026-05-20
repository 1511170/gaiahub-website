/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Solar Gold
        'primary': '#776300',
        'primary-dim': '#695700',
        'primary-container': '#ffd709',
        'primary-fixed': '#ffd709',
        'primary-fixed-dim': '#efc900',
        'on-primary': '#ffffff',
        'on-primary-container': '#5b4b00',
        'on-primary-fixed': '#453900',
        'on-primary-fixed-variant': '#665500',
        'inverse-primary': '#ffd709',
        
        // Secondary - Regenerative Green
        'secondary': '#00743a',
        'secondary-dim': '#006632',
        'secondary-container': '#86fea7',
        'secondary-fixed': '#86fea7',
        'secondary-fixed-dim': '#78ef9a',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#00612f',
        'on-secondary-fixed': '#004c23',
        'on-secondary-fixed-variant': '#006c35',
        
        // Tertiary - Wisdom Purple
        'tertiary': '#8e00fd',
        'tertiary-dim': '#7d00e1',
        'tertiary-container': '#d0a7ff',
        'tertiary-fixed': '#d0a7ff',
        'tertiary-fixed-dim': '#c695ff',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#500092',
        'on-tertiary-fixed': '#31005e',
        'on-tertiary-fixed-variant': '#5c00a7',
        
        // Surface
        'background': '#fefee5',
        'on-background': '#363b10',
        'surface': '#fefee5',
        'surface-variant': '#e7edb1',
        'surface-dim': '#e1e8a2',
        'surface-bright': '#fefee5',
        'on-surface': '#363b10',
        'on-surface-variant': '#626838',
        'inverse-surface': '#0e0f03',
        'inverse-on-surface': '#9e9e88',
        
        // Surface Containers
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fafcda',
        'surface-container': '#f4f7ce',
        'surface-container-high': '#eef2bf',
        'surface-container-highest': '#e7edb1',
        
        // Outline
        'outline': '#7f8452',
        'outline-variant': '#b8be86',
        
        // Error
        'error': '#b23d21',
        'error-dim': '#821a01',
        'error-container': '#fa7150',
        'on-error': '#ffffff',
        'on-error-container': '#671200',
        
        // Surface tint
        'surface-tint': '#776300',
      },
      fontFamily: {
        'headline': ['Epilogue', 'system-ui', 'sans-serif'],
        'body': ['Manrope', 'system-ui', 'sans-serif'],
        'label': ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '1rem',
        'lg': '2rem',
        'xl': '3rem',
        'full': '9999px',
      },
      boxShadow: {
        'ethereal': '0 40px 60px -20px rgba(54, 59, 16, 0.06)',
        '[0_20px_40px_-15px_rgba(54,59,16,0.05)]': '0 20px 40px -15px rgba(54,59,16,0.05)',
      },
    },
  },
  plugins: [],
}
