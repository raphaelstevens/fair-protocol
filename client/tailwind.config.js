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
      // On garde uniquement les configurations pour la mise en page
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxWidth: {
        '6xl': '72rem',
        '7xl': '80rem',
      },
      height: {
        'chart': '500px',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',    // Pour les titres h1
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
      },
      padding: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
      },
      margin: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
      },
      gap: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
      }
    },
  },
  // On garde le mode sombre car il sera géré via les variables CSS
  darkMode: 'class',
}