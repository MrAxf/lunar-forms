const plugin = require('tailwindcss/plugin');

const outerAttributes = [
  'required',
  'readonly',
  'valid',
  'error',
  'touched',
  'checked',
  'input-btn',
  'input-icon',
  'prefix',
  'suffix',
];

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      content: {
        '*': "' *'",
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(({ matchVariant }) => {
      const attributes = outerAttributes.reduce(
        (a, v) => ({ ...a, [v]: v }),
        {}
      );

      matchVariant(
        'lunar',
        (value = '', { modifier }) => {
          return modifier
            ? [
                `[data-${value}='true']:merge(.group\\/${modifier})&`,
                `[data-${value}='true']:merge(.group\\/${modifier}) &`,
              ]
            : [
                `[data-${value}='true']:not([data-type='repeater'])&`,
                `[data-${value}='true']:not([data-type='repeater']) &`,
              ];
        },
        { values: attributes }
      );
    }),
  ],
  daisyui: {
    logs: false,
  },
};
