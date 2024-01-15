/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["pastel", "dark", "retro"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
