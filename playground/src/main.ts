import { createApp } from 'vue';
import './style.css';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import App from './App.vue';
import { lunarFormsFieldPlugin } from '@lunar-forms/fields';

createApp(App)
  .use(autoAnimatePlugin)
  .use(lunarFormsFieldPlugin, {
    theme: {
      classes: {
        outer: 'm-3 flex flex-col gap-2 group/input',
        wrapper: 'flex flex-col gap-2',
        label: "group-[data-required]/input:after:content-[' *']",
        inner: 'flex group',
        prefix: 'string',
        suffix: 'string',
        input: 'input bg-base-300 w-full',
        help: 'text-sm italic',
        message: 'string',
      },
      icons: {
        placeholder: 'string',
      },
    },
    messages: {
      placeholder: 'string',
    },
  })
  .mount('#app');
