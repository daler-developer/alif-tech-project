module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      screens: {
        tablet: { max: "769px" },
        mobile: { max: "480px" },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
