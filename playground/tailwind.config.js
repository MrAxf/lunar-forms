/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './node_modules/@lunar-forms/theming/dist/themesDaisyui.js',
  ],
  theme: {
    extend: {
      content: {
        '*': "' *'",
      },
    },
  },
  plugins: [require('daisyui'), require('@lunar-forms/theming/tailwindcss')],
  daisyui: {
    logs: false,
  },
};
