/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        green: '#138808',
        navy: '#003478',
      }
    },
  },
  plugins: [],
}
