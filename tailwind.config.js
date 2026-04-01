/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          tulku: '#f97316', // Лисий оранжевый
        }
      },
    },
    plugins: [],
  }