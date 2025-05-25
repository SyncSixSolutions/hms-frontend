/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        parisienne: ["'Parisienne'", "cursive"],
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-ring': 'var(--color-primary-ring)',
        text: 'var(--color-text)',
        bg: 'var(--color-bg)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        'success-hover': 'var(--color-success-hover)',
        'success-ring': 'var(--color-success-ring)',
      },
    },
  },
  plugins: [],
}
