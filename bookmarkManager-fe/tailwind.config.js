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
        background: "#FFFAFA"
      }
    },
  },
  plugins: [],
}

