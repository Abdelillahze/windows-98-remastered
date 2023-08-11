/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      priority: "0px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      white: "white",
      black: "black",
      transparent: "transparent",
      bck: "#008181",
      tBck: "#c1c1c1",
      selected: "rgb(0, 0, 128)",
      "light-blue": "rgb(16, 132, 208) ",
      sbord: "rgb(128, 128, 128)",
    },
  },
  plugins: [],
  important: true,
};
