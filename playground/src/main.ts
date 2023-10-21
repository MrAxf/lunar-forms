import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import {
  lunarFormsFieldsConfig,
  lunarFormsFieldsPlugin,
} from '@lunar-forms/fields';
import theme from '@lunar-forms/theming/themes/daisyui';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import './style.css';

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
  .use(
    lunarFormsFieldsPlugin,
    lunarFormsFieldsConfig({
      theme,
      messages: {
        required: 'El campo es obligatorio.',
        text: {
          minLength:
            'El campo debe tener como míximo {requirement} caracteres.',
          maxLength:
            'El campo debe tener como máximo {requirement} caracteres.',
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
  )
  .mount('#app');
