/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EF3B33",
        background: "#FFFAFA",
        muted: "#71717A",
        input: "#e4e4e7"
      },
      fontFamily: {
        manrope: ['Manrope', 'ui-sans-serif', 'system-ui',]
      }
    },
  },
  plugins: [],
}

