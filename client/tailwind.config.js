/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../layouts/**/*.{html,js}",
    "../content/**/*.{html,md}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F8F9FA',
          100: '#E6EEF4',
          600: '#718096',
          700: '#4A5568',
          800: '#1B365D',
        },
        blue: {
          50: '#EBF8FF',
          500: '#4A90E2',
          600: '#1B365D',
          700: '#1B365D',
        }
      }
    }
  }
}