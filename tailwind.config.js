/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        infitex: "#F46A24",
        highlight: "#ff5500",
        background: "#363636"
      },
    },
  },
  plugins: [],
};
