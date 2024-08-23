/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Ubuntu'],
        para: ['Raleway', 'Arial', 'sans-serif'],
        primary: ['Montserrat', 'serif'],
        custom: ['CustomFont', 'sans-serif'],
      },

    },
  },
  plugins: [],
}

