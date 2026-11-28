/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  // typography: styles the Markdown in blog posts (the `prose` classes)
  plugins: [require('@tailwindcss/typography')],
}