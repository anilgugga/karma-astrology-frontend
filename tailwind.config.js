/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        deepblue: "#2B3990",     // Fixed to match your HTML
        cardblue: "#454FBF",     // Fixed to match your HTML  
        gold: "#F5A623",         // Fixed to match your HTML
        white: "#FFFFFF",
        accentred: "#FF0000",
        cosmicwhite: "#FFFFFF",
      },
      boxShadow: {
        gold: "0 0 20px #F5A62344",
        'gold-glow': "0 8px 32px rgba(245, 166, 35, 0.2)",
      },
      fontFamily: {
        cosmic: ['"Montserrat"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};