import type { DeepPartial, PluginOptions } from '@lunar-forms/fields';

const theme: DeepPartial<PluginOptions['theme']> = {
  classes: {
    global: {
      outer: 'm-3 flex flex-col gap-2',
      wrapper: 'flex flex-col gap-2',
      inner: 'flex',
      input: 'lunar-input-icon:pr-12',
      'input-btn': 'btn btn-sm btn-circle btn-ghost z-1 m-2 [&>svg]:w-[1.5em]',
      'input-icon':
        'min-h-8 z-1 pointer-events-none m-2 -ml-10 grid h-8 w-8 place-content-center [&>svg]:w-[1.5em]',
      label:
        'lunar-required:after:text-error lunar-required:after:content-["*"] lunar-error:text-error',
      legend:
        'lunar-required:after:text-error lunar-required:after:content-["*"] lunar-error:text-error',
      help: 'text-xs -mt-2',
      message: 'text-error text-sm',
      fieldset: 'bg-base-300 rounded-[--rounded-btn] px-4 pb-4',
      options: 'flex flex-col gap-4 pt-2',
    },
    groups: {
      inputCheckable: {
        wrapper: 'flex !flex-row w-100 cursor-pointer',
      },
      inputFieldset: {
        label: 'after:!content-none lunar-error:!text-base-content',
        fieldset:
          'relative border border-base-300 rounded-[--rounded-btn] lunar-error:border-error transition-colors lunar-input-btn:pr-12',
        'input-btn': 'absolute top-0 end-2 !m-0'
      },
      inputText: {
        input:
          'input bg-base-300 w-full appearance-none ![isolation:unset] lunar-prefix:rounded-l-none lunar-suffix:rounded-r-none',
        prefix: 'flex items-center bg-base-300 rounded-l-[--rounded-btn]',
        suffix: 'flex items-center bg-base-300 rounded-r-[--rounded-btn]',
        inner:
          'border border-base-300 bg-base-300 rounded-[--rounded-btn] lunar-error:border-error transition-colors items-center',
      },
    },
    fields: {
      checkbox: {
        input: 'checkbox',
        label: 'flex-grow w-full',
        wrapper: 'items-center w-full'
      },
      checkboxes: {
        input: 'checkbox',
      },
      color: {
        input:
          'h-12 cursor-pointer appearance-none overflow-hidden focus:outline focus:outline-2 focus:outline-offset-2 focus:[outline-color:hsl(var(--bc)/0.2)] !p-0 [&::-moz-color-swatch]:[border:none] [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:w-full [&::-webkit-color-swatch]:w-full [&::-moz-color-swatch]:h-full [&::-webkit-color-swatch]:h-full [&::-moz-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch-wrapper]:p-0 w-full rounded-[--rounded-btn] lunar-prefix:rounded-l-none lunar-suffix:rounded-r-none',
        prefix: 'flex items-center bg-base-300 rounded-l-[--rounded-btn]',
        suffix: 'flex items-center bg-base-300 rounded-r-[--rounded-btn]',
        inner:
          'border border-base-300 bg-base-300 rounded-[--rounded-btn] lunar-error:border-error transition-colors',
      },
      file: {
        input:
          'file-input bg-base-300 w-full appearance-none ![isolation:unset] lunar-prefix:rounded-l-none lunar-suffix:rounded-r-none',
        prefix: 'flex items-center bg-base-300 rounded-l-[--rounded-btn]',
        suffix: 'flex items-center bg-base-300 rounded-r-[--rounded-btn]',
        inner:
          'border border-base-300 bg-base-300 rounded-[--rounded-btn] lunar-error:border-error transition-colors',
      },
      radio: {
        input: 'radio',
      },
      range: {
        input: 'range w-full lunar-error:range-error',
        inner: 'items-center',
      },
      select: {
        input:
          'select bg-base-300 w-full appearance-none ![isolation:unset] lunar-prefix:rounded-l-none lunar-suffix:rounded-r-none bg-none',
        prefix: 'flex items-center bg-base-300 rounded-l-[--rounded-btn]',
        suffix: 'flex items-center bg-base-300 rounded-r-[--rounded-btn]',
        inner:
          'border border-base-300 bg-base-300 rounded-[--rounded-btn] lunar-error:border-error transition-colors',
      },
      textarea: {
        input:
          'textarea bg-base-300 w-full appearance-none ![isolation:unset] lunar-prefix:rounded-l-none lunar-suffix:rounded-r-none lunar-input-btn:pr-12',
        prefix: 'flex items-center bg-base-300 rounded-l-[--rounded-btn]',
        suffix: 'flex items-center bg-base-300 rounded-r-[--rounded-btn]',
        inner:
          'border border-base-300 rounded-[--rounded-btn] lunar-error:border-error transition-colors',
        'input-btn': '-ml-10',
      },
    },
  },
  icons: {
    clear:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"/></svg>',
    visibilityOn:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Z"/></svg>',
    visibilityOff:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m19.8 22.6l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 16q.275 0 .513-.025t.512-.1l-5.4-5.4q-.075.275-.1.513T7.5 11.5q0 1.875 1.313 3.188T12 16Zm7.3.45l-3.175-3.15q.175-.425.275-.863t.1-.937q0-1.875-1.313-3.188T12 7q-.5 0-.938.1t-.862.3L7.65 4.85q1.025-.425 2.1-.637T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45Zm-4.625-4.6l-3-3q.7-.125 1.288.113t1.012.687q.425.45.613 1.038t.087 1.162Z"/></svg>',
    select:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4l-6 6Z"/></svg>',
  },
};

export default theme;
