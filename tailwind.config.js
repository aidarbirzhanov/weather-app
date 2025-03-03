/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        tButtonBg: "#257187",
        tPlaceholder: "#98A2B3",
        tBorder: "#98A2B3",
        tError: "#FF2D2D",
        tCardBg:"#0E2E37"
      }
    },
  },
  plugins: [],
}

