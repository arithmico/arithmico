const plugin = require("tailwindcss/plugin");

const themes = ["light", "dark"];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: themes,
      borderColor: themes,
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      themes.forEach((theme) => {
        addVariant(`theme-${theme}`, `.theme-${theme} &`);
      });
    }),
  ],
};
