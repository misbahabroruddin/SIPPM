/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        custom: "0 2px 8px 0 rgba(102,102,102,0.1)",
      },
      backgroundColor: {
        primary: "#10487A",
        secondary: "#406D95",
        "dark-metallic": "#ACBCCF",
        sky: "#DAEDFF",
        draft: "#FFCCCC",
        "red-06": "#FF3333",
        green: "#23B900",
      },
      colors: {
        primary: "#333333",
        secondary: "#666666",
        "secondary-200": "#eee",
        "red-09": "#CC0000",
        "dark-09": "#444F5C",
      },
      outline: {
        primary: "1px solid #10487A",
        "red-09": "#CC0000",
      },
      fontFamily: {
        poppins: ["var(--poppins)"],
      },
    },
  },
  plugins: [],
});
