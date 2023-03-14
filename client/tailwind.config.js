/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        diaBlue: "#3AB0FF",
        diaLightBlue: "#61C0FF",
        diaGray: "#666666",
        diaOrange: "#FFB562",
        diaRed: "#F87474",
        diaGreen: "#44D29F",
      },
      blur: {
        xs: "2px",
      },
    },
  },
};
