/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "md": "0 10px 10px white",
        "lg": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "2xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
