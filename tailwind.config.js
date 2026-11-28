/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // Brand accent: the logo's orange (#ea6613) sits at brand-600.
      // Use 600 for buttons and accents, 700 for small text on white.
      colors: { brand: colors.orange },
    },
  },
  // typography: styles the Markdown in blog posts (the `prose` classes)
  plugins: [require('@tailwindcss/typography')],
}