/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  options: {
    safelist: ["fr"],
  },
  theme: {
    extend: {
      fontFamily: {
        'earlyGameboy': ['Early Gameboy', 'cursive'],
        'flippsRegular': ['Flipps Regular', 'cursive']
      }
    },
  },
  plugins: [],
};
