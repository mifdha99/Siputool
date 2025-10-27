/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#60A5FA',
        accent: '#7C3AED',
        neutral: '#F8FAFC'
      }
    },
  },
  plugins: [],
}
