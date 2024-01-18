/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "retro"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
