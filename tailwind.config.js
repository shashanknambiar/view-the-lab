module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      "card-grey": "#f5f5f540",
      utilities: {
        '.overflow-touch': {
          '-webkit-overflow-scrolling': 'touch',
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.overflow-touch': { '-webkit-overflow-scrolling': 'touch' }
      })
    }
  ],
}