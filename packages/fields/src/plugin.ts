import { type Plugin } from 'vue';
import { PLUGING_CONTEXT_KEY } from './consts';

export const plugin: Plugin = {
  install(app, options) {
    app.provide(PLUGING_CONTEXT_KEY, options);
  },
};
