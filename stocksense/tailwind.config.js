/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9ebff',
          500: '#2170e4',
          600: '#0058be',
          700: '#004396',
          900: '#081c3c'
        },
        ai: {
          50: '#f5f0ff',
          100: '#ebe0ff',
          500: '#8a4cfc',
          600: '#712ae2',
          700: '#5c17cb'
        },
        status: {
          success: '#00855b',
          warning: '#e65100',
          danger: '#ba1a1a',
          info: '#0058be'
        }
      }
    },
  },
  plugins: [],
}
