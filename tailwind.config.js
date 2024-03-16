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
        custom: "0 1px 8px 0 rgba(102,102,102,0.1)",
      },
      backgroundColor: {
        primary: "#10487A",
        secondary: "#406D95",
        "dark-metallic": "#ACBCCF",
        sky: "#DAEDFF",
        "sky-05": "#44A7FF",
        "sky-06": "#69B9FF",
        draft: "#FFCCCC",
        "red-06": "#FF3333",
        green: "#23B900",
        "green-09": "#D5FACC",
        "green-06": "#56EC33",
      },
      colors: {
        primary: "#333333",
        secondary: "#666666",
        "secondary-200": "#eee",
        "red-09": "#CC0000",
        sky: "#DAEDFF",
        "sky-05": "#44A7FF",
        "sky-06": "#69B9FF",
        "dark-09": "#444F5C",
        "dark-80": "#65768B",
        "black-07": "#666666",
        "blue-primary": "#10487A",
        "blue-09": "#CFDAE4",
        "blue-04": "#0D3A62",
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
