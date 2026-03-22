const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,html}',
  ],
  theme: {
    extend: {
      colors: {
        'ufo-green': '#D7DF21',
        'ufo-green-dark': '#959C16',
        'ufo-green-hover': '#7D8212',
        'ufo-dark': '#1D1D1D',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
