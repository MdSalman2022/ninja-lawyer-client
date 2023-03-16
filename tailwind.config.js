/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F5F7F9',
        accent: '#ef233c',
        neutral: '#25222A',
        'base-100': '#161A1D',
        info: '#7AC1F0',
        success: '#49cd56',
        warning: '#ffd60a',
        error: '#F24A6E',
      }
    }
  },
  variants: {},
  plugins: [require("daisyui")],
}