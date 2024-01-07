/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["col-span-1", "col-span-2", "md:col-span-1", "md:col-span-2"],
  theme: {
    extend: {
      fontFamily: {
        title: "Franie",
      },
      colors: {
        subtitle: "rgb(98, 202, 242)",
        semiTransparent: "rgba(255, 255, 255, 0.1)",
      },
    },
  },

  darkMode: "class",
  plugins: [
    nextui(),
    require("tailwindcss-animated"),
    ({ addComponents }) => {
      addComponents({
        ".container": {
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1rem",
        },
      });
    },
  ],
};
