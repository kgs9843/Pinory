/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito_400Regular', 'Nunito_600SemiBold', 'Nunito_700Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
