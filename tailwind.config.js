/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "base-100": "#ffffff",
          "primary": "#0cbaba",   // x-green
          "secondary": "#102e44", // x-dark-green
          "accent": "#db2763",    // x-red
          "info": "#01baef",      // x-blue
          "neutral": "#e0f8ff",   // x-white
        }
      }
    ],
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
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};