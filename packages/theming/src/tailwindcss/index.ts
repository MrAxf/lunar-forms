import plugin from 'tailwindcss/plugin';

const dataAttributes = [
  'required',
  'disabled',
  'readonly',
  'valid',
  'error',
  'touched',
  'checked',
  'input-btn',
  'input-icon',
  'prefix',
  'suffix',
  'loading',
];

export default plugin(({ matchVariant }) => {
  const attributes = dataAttributes.reduce((a, v) => ({ ...a, [v]: v }), {});

  matchVariant(
    'lunar',
    (value = '', { modifier }) => {
      return modifier
        ? [
            `[data-${value}='true']:merge(.group\\/${modifier})&`,
            `[data-${value}='true']:merge(.group\\/${modifier}) &`,
          ]
        : [`[data-${value}='true']&`, `[data-${value}='true'] &`];
    },
    { values: attributes }
  );
});
