/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#0F2A2E',
        cream: '#F7F5F0',
        copper: '#C9622A',
        teal: '#2F6F5E',
        stone: '#8A8378',
        ink: '#1A1A18',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
