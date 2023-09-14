import { type Plugin } from 'vue';
import type { PluginOptions } from './types';
import { PLUGING_CONTEXT_KEY } from './consts';

export const plugin: Plugin = {
  install(app, options: PluginOptions) {
    app.provide(PLUGING_CONTEXT_KEY, options);
  },
};
