/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
          50: "#f5f5f5",
          100: "#e5e5e5",
          200: "#cccccc",
          300: "#999999",
          400: "#666666",
          500: "#333333",
          600: "#1a1a1a",
          700: "#0d0d0d",
          800: "#080808",
          900: "#040404",
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#f9f9f9",
          200: "#f2f2f2",
          300: "#e6e6e6",
        },
        orange: {
          DEFAULT: "#ff8800",
          50: "#fff3e0",
          100: "#ffddb3",
          200: "#ffc680",
          300: "#ffaf4d",
          400: "#ff9800",
          500: "#ff8800",
          600: "#e67a00",
          700: "#b36100",
          800: "#804700",
          900: "#4d2c00",
        },
      },
      fontFamily: {
        sans: [
          "Montserrat_400Regular",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        thin: ["Montserrat_100Thin"],
        extralight: ["Montserrat_200ExtraLight"],
        light: ["Montserrat_300Light"],
        regular: ["Montserrat_400Regular"],
        medium: ["Montserrat_500Medium"],
        semibold: ["Montserrat_600SemiBold"],
        bold: ["Montserrat_700Bold"],
        extrabold: ["Montserrat_800ExtraBold"],
        black: ["Montserrat_900Black"],
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
