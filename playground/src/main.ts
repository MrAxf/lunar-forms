import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import {
  defineLunarFormsFieldsConfig,
  lunarFormsFieldsPlugin,
} from '@lunar-forms/fields';
import { popoverFieldsPlugin } from '@lunar-forms/popover-fields';
import { esES as messages } from '@lunar-forms/theming/messages';
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
    defineLunarFormsFieldsConfig({
      theme,
      messages,
      plugins: [
        popoverFieldsPlugin({
          theme: {
            classes: {
              groups: {
                inputSelect: {
                  input:
                    'text-left px-4 rounded-[--rounded-btn] focus:outline focus:outline-2 focus:outline-offset-2 focus:[outline-color:hsl(var(--bc)/0.2)] bg-base-300 w-full appearance-none ![isolation:unset] lunar-prefix:rounded-l-none lunar-suffix:rounded-r-none bg-none',
                  prefix:
                    'flex items-center bg-base-300 rounded-l-[--rounded-btn]',
                  suffix:
                    'flex items-center bg-base-300 rounded-r-[--rounded-btn]',
                  inner:
                    'border border-base-300 rounded-[--rounded-btn] lunar-error:border-error transition-colors',
                  options:
                    'menu dropdown-content z-[1] bg-base-300 w-full rounded-[--rounded-btn] border border-color-[hsl(var(--bc)/0.2)]] max-h-[15rem] overflow-y-auto',
                  option:
                    'px-4 py-2 rounded-[--rounded-btn] cursor-pointer transition-colors [&.active]:bg-base-100 [&.selected]:bg-base-100',
                },
              },
            },
          },
        }),
      ],
    })
  )
  .mount('#app');
