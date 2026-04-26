/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // MoWizz Design System — Cosmic Slate background
        "slate-deep": "#09090E",
      },
    },
  },
  plugins: [],
};
