/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "x-green": "#0cbaba",
        "x-dark-green": "#102e44",
        "x-red": "#db2763",
        "x-blue": "#01baef",
        "x-white": "#e0f8ff",
      },
      fontSize: {
        xxs: ["0.5rem", "0.666rem"],
      },
    },
  },
  corePlugins:{
    aspectRatio: false
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
    require('@tailwindcss/aspect-ratio')
  ]
};