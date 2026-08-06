/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
        card: '#141414',
        accent: '#3b82f6', // İsteğe bağlı vurgu rengi
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Minimalist ve okunaklı
      },
    },
  },
  plugins: [],
};