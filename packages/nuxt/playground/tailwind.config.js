/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@lunar-forms/theming/dist/themesDaisyui.js',
    './lunarFormsFields.config.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "dark",
    logs: false,
  },
}

