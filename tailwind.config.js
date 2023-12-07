/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        body :["DM Sans", "sans-serif"]
      },
      colors:{
        primary :"#00B9AE",
        secondary : "#9028f1"
      }
    },
  },
  plugins: [],
}

