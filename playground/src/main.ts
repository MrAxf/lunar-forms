import { createApp } from 'vue';
import './style.css';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import App from './App.vue';
import { lunarFormsFieldPlugin } from '@lunar-forms/fields';
import { tw } from './utils';

createApp(App)
  .use(autoAnimatePlugin)
  .use(lunarFormsFieldPlugin, {
    theme: {
      classes: {
        outer: tw`group/input m-3 flex flex-col gap-2 [--input-pr:1rem] [&[data-input-btn]]:[--input-pr:3rem]`,
        wrapper: tw`flex flex-col gap-2`,
        label: tw`group-[[data-required]]/input:after:text-error group-[[data-required]]/input:after:content-*`,
        inner: tw`join flex`,
        prefix: tw`bg-primary flex items-center p-3 `,
        suffix: tw`bg-primary flex items-center p-3`,
        input: tw`[&:is(input):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]):not([type=color])]:input [&:is(textarea)]:textarea [&:is(input)[type=range]]:range !bg-base-300 group-[[data-error]]/input:[&:is(input)[type=range]]:range-error group-[[data-error]]/input:[&:is(input):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]):not([type=color])]:input-error group-[[data-error]]/input:[&:is(textarea)]:textarea-error  join-item w-full !pr-[--input-pr]`,
        'input-btn': tw`btn btn-circle btn-ghost min-h-8 z-1 m-2 -ml-10 h-8 w-8 [&>svg]:w-[1.5em]`,
        help: tw`text-sm italic`,
        message: tw`text-error text-sm`,
      },
      icons: {
        clear: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"/></svg>`,
        visibilityOn: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Z"/></svg>`,
        visibilityOff: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m19.8 22.6l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 16q.275 0 .513-.025t.512-.1l-5.4-5.4q-.075.275-.1.513T7.5 11.5q0 1.875 1.313 3.188T12 16Zm7.3.45l-3.175-3.15q.175-.425.275-.863t.1-.937q0-1.875-1.313-3.188T12 7q-.5 0-.938.1t-.862.3L7.65 4.85q1.025-.425 2.1-.637T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45Zm-4.625-4.6l-3-3q.7-.125 1.288.113t1.012.687q.425.45.613 1.038t.087 1.162Z"/></svg>`,
      },
    },
    messages: {
      required: 'El campo es obligatorio.',
      text: {
        minLenght: 'El campo debe tener como míximo {value} caracteres.',
        maxLenght: 'El campo debe tener como máximo {value} caracteres.',
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
        min: 'El campo debe tener un valor igual o superior a {value}.',
        max: 'El campo debe tener un valor igual o inferior a {value}.',
      },
      actions: {
        clear: 'Limpiar',
        setVisible: 'Mostrar',
        setNotVisible: 'Ocultar',
      },
    },
  })
  .mount('#app');
