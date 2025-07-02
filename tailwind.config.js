/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fef7f4',
          100: '#fdeee8',
          200: '#fad5c5',
          300: '#f7bca2',
          400: '#f1895c',
          500: '#eb5616',
          600: '#d44d14',
          700: '#b04011',
          800: '#8d330e',
          900: '#73290c',
        },
        orange: {
          50: '#fff8f1',
          100: '#feecdc',
          200: '#fcd9bd',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        forest: {
          50: '#f0f9f4',
          100: '#dcf4e3',
          200: '#bbe8cc',
          300: '#86d5a7',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
    },
  },
  plugins: [],
};