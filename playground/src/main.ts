import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import {
  lunarFormsFieldsConfig,
  lunarFormsFieldsPlugin,
} from '@lunar-forms/fields';
import theme from '@lunar-forms/theming/themes/daisyui';
import { esES as messages } from '@lunar-forms/theming/messages';
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
      messages
    })
  )
  .mount('#app');
