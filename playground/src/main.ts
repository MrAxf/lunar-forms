import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { dropdownFieldsPlugin } from '@lunar-forms/dropdown-fields';
import {
  defineLunarFormsFieldsConfig,
  lunarFormsFieldsPlugin,
} from '@lunar-forms/fields';
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
        {
          path: '/dropdown-fields',
          component: () => import('./pages/lunarDropdownFields.vue'),
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
        dropdownFieldsPlugin({
          theme: {
            classes: {
              groups: {
                inputSelect: {
                  input:
                    'h-12 flex items-center text-left px-4 overflow-hidden truncate rounded-[--rounded-btn] focus:outline focus:outline-2 focus:outline-offset-2 focus:[outline-color:hsl(var(--bc)/0.2)] bg-base-300 w-full appearance-none ![isolation:unset] lunar-prefix:rounded-l-none lunar-suffix:rounded-r-none bg-none',
                  prefix:
                    'flex items-center bg-base-300 rounded-l-[--rounded-btn]',
                  suffix:
                    'flex items-center bg-base-300 rounded-r-[--rounded-btn]',
                  inner:
                    'border border-base-300 rounded-[--rounded-btn] lunar-error:border-error transition-colors',
                  'dropdown-wrapper':
                    'bg-base-300 z-[1] w-full rounded-[--rounded-btn] overflow-hidden border border-color-[hsl(var(--bc)/0.2)]] flex flex-col',
                  'dropdown-content':
                    'max-h-[15rem] overflow-y-auto flex flex-col',
                  options: 'p-2 flex flex-col !gap-1',
                  option:
                    'flex items-center px-4 text-md py-2 rounded-[--rounded-btn] cursor-pointer transition-colors [&.active]:bg-base-100 [&.selected]:bg-base-100',
                  'option-content': 'truncate overflow-hidden w-full',
                  'option-selected-icon':
                    'w-6 h-6 [&>svg]:w-full [&>svg]:h-full',
                  'input-content': 'flex-grow truncate overflow-hidden',
                  'input-icon': 'relative !m-0',
                  'input-count': 'badge badge-primary',
                  'input-loading':
                    'loading loading-spinner loading-xs text-primary mx-2',
                  'option-loading': 'w-full grid place-items-center py-2',
                  'option-loading-loader':
                    'loading loading-spinner loading-md text-primary',
                  'dropdown-enter-active': 'transition-all',
                  'dropdown-enter-from': 'opacity-0 scale-50',
                  'dropdown-enter-to': 'opacity-100 scale-100',
                  'dropdown-leave-active': 'transition-all',
                  'dropdown-leave-from': 'opacity-100 scale-100',
                  'dropdown-leave-to': 'opacity-0 scale-50',
                },
              },
            },
            icons: {
              optionSelected:
                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"/></svg>',
            },
          },
        }),
      ],
    })
  )
  .mount('#app');
