/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B2C',
          dark: '#FF4785',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          card: '#171717',
          border: '#27272A',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #FF6B2C, #FF4785)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};