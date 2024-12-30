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
        // Thème global
        theme: {
          light: '#F8F9FA', // Fond clair
          dark: '#111827',  // Fond sombre
        },
        // Surface des cartes
        entry: {
          light: '#E6EEF4', // Surface carte claire
          dark: '#1F2937',  // Surface carte sombre
        },
        // Couleurs principales
        primary: {
          light: '#1B365D', // Texte principal clair
          dark: '#F9FAFB',  // Texte principal sombre
        },
        secondary: {
          light: '#4A5568', // Texte secondaire clair
          dark: '#9CA3AF',  // Texte secondaire sombre
        },
        tertiary: {
          light: '#E6EEF4', // Accent clair
          dark: '#374151',  // Accent sombre
        },
        content: {
          light: '#1B365D', // Contenu clair
          dark: '#F9FAFB',  // Contenu sombre
        },
        // Couleurs sémantiques des icônes
        icon: {
          info: {
            light: '#4A90E2', // Bleu information clair
            dark: '#5BA4D8',  // Bleu information sombre
          },
          challenge: {
            light: '#D43C3C', // Rouge challenge clair
            dark: '#E57373',  // Rouge challenge sombre
          },
          solution: {
            light: '#5BAE6E', // Vert solution clair
            dark: '#69C17C',  // Vert solution sombre
          },
          implementation: {
            light: '#4A90E2', // Bleu process clair
            dark: '#5BA4D8',  // Bleu process sombre
          },
          technical: {
            light: '#DAC04A', // Jaune technique clair
            dark: '#E2C94D',  // Jaune technique sombre
          },
          indigo: {
            light: '#6473B3', // Indigo clair
            dark: '#7681C7',  // Indigo sombre
          },
          violet: {
            light: '#9967C4', // Violet clair
            dark: '#A47DCB',  // Violet sombre
          },
        },
      },
    },
  },
  darkMode: 'class', // Active le mode sombre basé sur la classe .dark
};
