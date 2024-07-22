/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {},
    extend: {
      animation: {
        "bounce": "bounce 1s infinite",
        "bounce-delay-200": "bounce 1s infinite 200ms",
        "bounce-delay-400": "bounce 1s infinite 400ms",
      },
    },
  },
  plugins: [],
};
