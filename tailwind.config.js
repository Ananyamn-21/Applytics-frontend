/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#171e19",
        sage: "#b7c6c2",
        taupe: "#9f8d8b",
        cyan: "#d5f4f9",
        "soft-blue": "#bbe2f5",
        charcoal: "#302b2f",
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
