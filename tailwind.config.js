/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 50s linear infinite',
        'spin-slow-reverse': 'spin 60s linear infinite reverse',
      },
      spacing: {
        '150vw': '150vw',
        '150vh': '150vh',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}