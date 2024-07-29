import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [
    'variant',
    [
      '&:is([data-theme="dark"] *)',
      '@media (prefers-color-scheme: dark) { &:not([data-theme="dark"] *) }',
    ],
  ],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        'accent-green': '#58dd68',
        'accent-red': '#ff364d',
      },
    },
  },
  plugins: [],
}
