import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [
    'variant',
    [
      '&:is([data-theme="dark"] *)',
      '@media (prefers-color-scheme: dark) { &:not([data-theme="light"] *) }',
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
        'primary-100': '#D8F3DC',
        'primary-200': '#B7E4C7',
        'primary-300': '#95D5B2',
        'primary-400': '#74C69D',
        'primary-500': '#52B788',
        'primary-600': '#40916C',
        'primary-700': '#2D6A4F',
        'primary-800': '#1B4332',
        'primary-900': '#0D1514',
        'background-dark-1': '#111111',
        'background-dark-2': '#191919',
        'background-light-1': '#F8FAF3',
        'background-light-2': '#EEF6D6',
        'border-light': '#ABC978',
        'border-dark': '#484848',
        'solid-light': '#B0E64C',
        'solid-dark': '#D4FF70',
        'title-light': '#5C7C2F',
        'title-dark': '#D4FF70',
      },
    },
  },
  plugins: [],
}
