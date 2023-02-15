/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px",
        tablet: "640px",
        laptopmini: "750px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/aspect-ratio"),
  ],
};
