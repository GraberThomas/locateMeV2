/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        contacts_shadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
        btn_shadow: ' 0 0 0 2px rgba(0,0,0,.2), 0 3px 8px 0 rgba(0,0,0,.15);'
      }
    },
    colors:{
      button: '#292522',
      button_hover: '#4d6160',
      card_bg: '#CFB997'
    },
    fontFamily: {
      'barlow': ['Barlow Semi Condensed', 'sans-serif']
    }
  },
  plugins: [],
}
