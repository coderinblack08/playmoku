module.exports = {
  mode: "jit",
  purge: [
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      dm: [
        "DM Sans",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    spinner: (theme) => ({
      default: {
        color: "#f3f4f6",
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
      md: {
        color: "#f3f4f6",
        size: "1.5em",
        border: "2px",
        speed: "500ms",
      },
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-spinner")({
      className: "spinner",
      themeKey: "spinner",
    }),
  ],
};
