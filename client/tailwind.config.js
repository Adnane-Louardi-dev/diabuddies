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
        sourceCode: ["Source Code Pro", "monospace"],
        tajawal: ["Tajawal", "sans-serif"],
      },
      colors: {
        diaDarkBlue: "#1e293b",
        diaBlue: "#3AB0FF",
        diaLightBlue: "#98D6FF",
        diaGray: "#666666",
        diaOrange: "#FFB562",
        diaLightOrange: "#FFD7AA",
        diaRed: "#F87474",
        diaGreen: "#44D29F",
        diaLightGreen: "#B0EAD5",
      },
      blur: {
        xs: "2px",
      },
      fontSize: {
        "2xs": ["0.6rem", "0.5rem"],
      },
    },
  },
};
