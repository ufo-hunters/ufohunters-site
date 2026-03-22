const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,html}',
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian Archive — Surface hierarchy
        'surface-dim': '#10141a',
        'surface': '#10141a',
        'surface-container-lowest': '#0a0e14',
        'surface-container-low': '#181c22',
        'surface-container': '#1c2026',
        'surface-container-high': '#262a31',
        'surface-container-highest': '#31353c',
        'surface-bright': '#353940',
        'surface-variant': '#31353c',
        'background': '#10141a',

        // Primary — UFO Green
        'primary': '#D7DF21',
        'primary-container': '#d7df21',
        'primary-fixed': '#e3eb31',
        'primary-fixed-dim': '#c7cf00',
        'on-primary': '#313300',
        'on-primary-container': '#5d6100',
        'on-primary-fixed': '#1c1d00',

        // Secondary — Cyan
        'secondary': '#bdf4ff',
        'secondary-container': '#00e3fd',
        'secondary-fixed': '#9cf0ff',
        'secondary-fixed-dim': '#00daf3',
        'on-secondary': '#00363d',
        'on-secondary-container': '#00616d',

        // Tertiary — Yellow
        'tertiary': '#f3fb70',
        'tertiary-container': '#d6de57',
        'tertiary-fixed': '#e3eb62',

        // Text
        'on-surface': '#dfe2eb',
        'on-surface-variant': '#c9c8ad',
        'on-background': '#dfe2eb',

        // Outline
        'outline': '#929279',
        'outline-variant': '#484833',

        // Error
        'error': '#ffb4ab',
        'error-container': '#93000a',
        'on-error': '#690005',

        // Inverse
        'inverse-surface': '#dfe2eb',
        'inverse-primary': '#5f6300',
        'inverse-on-surface': '#2d3137',

        // Legacy aliases
        'ufo-green': '#D7DF21',
        'ufo-green-dark': '#959C16',
        'ufo-green-hover': '#7D8212',
        'ufo-dark': '#1D1D1D',
      },
      fontFamily: {
        'headline': ['Space Grotesk', ...defaultTheme.fontFamily.sans],
        'body': ['Inter', ...defaultTheme.fontFamily.sans],
        'label': ['Space Grotesk', ...defaultTheme.fontFamily.sans],
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        '2xl': '0.75rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
