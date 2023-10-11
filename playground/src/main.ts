import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { lunarFormsFieldPlugin } from '@lunar-forms/fields';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import './style.css';
import { tw } from './utils';

createApp(App)
  .use(
    createRouter({
      history: createWebHashHistory(),
      routes: [
        {
          path: '/',
          component: () => import('./pages/index.vue'),
        },
        {
          path: '/fields',
          component: () => import('./pages/lunarFields.vue'),
        },
      ],
    })
  )
  .use(autoAnimatePlugin)
  .use(lunarFormsFieldPlugin, {
    theme: {
      classes: {
        outer: tw`group/input m-3 flex flex-col gap-2 [--input-pr:1rem] [&[data-input-btn]]:[--input-pr:3rem] [&[data-input-icon]]:[--input-pr:3rem]`,
        wrapper: [
          tw`flex flex-col gap-2`,
          tw`group-[[data-field=CheckboxField]]/input:flex-row group-[[data-field=CheckboxField]]/input:items-center`,
          tw`group-[[data-field=CheckboxesField]]/input:flex-row group-[[data-field=CheckboxesField]]/input:items-center`,
          tw`group-[[data-field=RadioField]]/input:flex-row group-[[data-field=RadioField]]/input:items-center`,
        ].join(' '),
        label: tw`group-[[data-required]]/input:after:text-error group-[[data-required]]/input:after:content-* group-[[data-required][data-field=CheckboxesField]]/input:after:content-none group-[[data-required][data-field=RadioField]]/input:after:content-none`,
        inner: tw`join flex`,
        prefix: tw`bg-primary flex items-center p-3 `,
        suffix: tw`bg-primary flex items-center p-3`,
        input: [
          tw`[&:is(input):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]):not([type=color])]:input`,
          tw`[&:is(input):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]):not([type=color])]:bg-base-300`,
          tw`[&:is(textarea)]:textarea [&:is(textarea)]:bg-base-300`,
          tw`[&:is(select)]:select [&:is(select)]:bg-base-300 [&:is(select)]:bg-none`,
          tw`[&:is(input)[type=checkbox]]:checkbox [&:is(input)[type=checkbox]]:my-3`,
          tw`[&:is(input)[type=radio]]:radio [&:is(input)[type=radio]]:my-3`,
          tw`[&:is(input)[type=range]]:range [&:is(input)[type=range]]:my-3`,
          tw`[&:is(input)[type=file]]:file-input [&:is(input)[type=file]]:bg-base-300`,
          tw`[&:is(input)[type=search]::-webkit-search-decoration]:appearance-none`,
          tw`[&:is(input)[type=search]::-webkit-search-cancel-button]:appearance-none`,
          tw`[&:is(input)[type=search]::-webkit-search-results-button]:appearance-none`,
          tw`[&:is(input)[type=file]]:file-input [&:is(input)[type=file]]:bg-base-300`,
          tw`[&:is(input)[type=color]]:h-12 [&:is(input)[type=color]]:cursor-pointer [&:is(input)[type=color]]:appearance-none [&:is(input)[type=color]]:overflow-hidden [&:is(input)[type=color]]:rounded-md [&:is(input)[type=color]]:!p-0`,
          tw`[&:is(input)[type=color]]:focus:border-primary [&:is(input)[type=color]]:border-base-300 [&:is(input)[type=color]]:border-2`,
          tw`[&:is(input)[type=color]::-moz-color-swatch]:[border:none] [&:is(input)[type=color]::-webkit-color-swatch]:border-none`,
          tw`[&:is(input)[type=color]::-moz-color-swatch]:w-full [&:is(input)[type=color]::-webkit-color-swatch]:w-full`,
          tw`[&:is(input)[type=color]::-moz-color-swatch]:h-full [&:is(input)[type=color]::-webkit-color-swatch]:h-full`,
          tw`[&:is(input)[type=color]::-moz-color-swatch-wrapper]:p-0 [&:is(input)[type=color]::-webkit-color-swatch-wrapper]:p-0`,
          tw`group-[[data-error]]/input:[&:is(input)[type=checkbox]]:checkbox-error`,
          tw`group-[[data-error]]/input:[&:is(input)[type=radio]]:radio-error`,
          tw`group-[[data-error]]/input:[&:is(input)[type=range]]:range-error`,
          tw`group-[[data-error]]/input:[&:is(input)[type=file]]:file-input-error`,
          tw`group-[[data-error]]/input:[&:is(input):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]):not([type=color])]:input-error`,
          tw`group-[[data-error]]/input:[&:is(textarea)]:textarea-error`,
          tw`group-[[data-error]]/input:[&:is(select)]:select-error`,
          tw`join-item w-full appearance-none !pr-[--input-pr] ![isolation:unset]`,
        ].join(' '),
        'input-btn': tw`btn btn-sm btn-circle btn-ghost z-1 m-2 -ml-10 [&>svg]:w-[1.5em]`,
        'input-icon': tw`min-h-8 z-1 pointer-events-none m-2 -ml-10 grid h-8 w-8 place-content-center [&>svg]:w-[1.5em]`,
        help: tw`text-sm italic`,
        message: tw`text-error text-sm`,
        fieldset: tw`bg-base-300 rounded-box group-[[data-error]]/input:border-error flex flex-col gap-2 p-4 group-[[data-error]]/input:border`,
        legend: tw`group-[[data-required]]/input:after:text-error group-[[data-required]]/input:after:content-*`,
        options: tw`flex flex-col gap-3`,
        option: tw``,
      },
      icons: {
        clear: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"/></svg>`,
        visibilityOn: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Z"/></svg>`,
        visibilityOff: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m19.8 22.6l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 16q.275 0 .513-.025t.512-.1l-5.4-5.4q-.075.275-.1.513T7.5 11.5q0 1.875 1.313 3.188T12 16Zm7.3.45l-3.175-3.15q.175-.425.275-.863t.1-.937q0-1.875-1.313-3.188T12 7q-.5 0-.938.1t-.862.3L7.65 4.85q1.025-.425 2.1-.637T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45Zm-4.625-4.6l-3-3q.7-.125 1.288.113t1.012.687q.425.45.613 1.038t.087 1.162Z"/></svg>`,
        select: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4l-6 6Z"/></svg>`,
      },
    },
    messages: {
      required: 'El campo es obligatorio.',
      text: {
        minLength: 'El campo debe tener como míximo {requirement} caracteres.',
        maxLength: 'El campo debe tener como máximo {requirement} caracteres.',
        pattern: 'El campo no tiene el formato solicitado.',
      },
      password: {
        confirm: 'Las contraseñas no coinciden.',
      },
      email: {
        valid: 'El campo no es una dirección de correo válida.',
      },
      url: {
        valid: 'El campo no es una dirección URL válida.',
      },
      number: {
        min: 'El campo debe tener un valor igual o superior a {requirement}.',
        max: 'El campo debe tener un valor igual o inferior a {requirement}.',
      },
      file: {
        accept: 'El formato del archivo no es valido',
        maxSize:
          'El tamaño del archivo no puede pasar de los {kb:requirement}.',
      },
      date: {
        valid: 'La fecha no tiene un formato válido',
        min: 'La fecha debe ser superior a {date:requirement}.',
        max: 'La fecha debe ser inferior a {date:requirement}.',
      },
      datetime: {
        valid: 'La fecha y la hora no tiene un formato válido',
        min: 'La fecha y la hora debe ser superior a {datetime:requirement}.',
        max: 'La fecha y la hora debe ser inferior a {datetime:requirement}.',
      },
      time: {
        valid: 'La hora no tiene un formato válido',
        min: 'La hora debe ser superior a {time:requirement}.',
        max: 'La hora debe ser inferior a {time:requirement}.',
      },
      actions: {
        clear: 'Limpiar',
        setVisible: 'Mostrar',
        setNotVisible: 'Ocultar',
      },
    },
  })
  .mount('#app');
