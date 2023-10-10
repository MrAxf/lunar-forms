import { type Plugin } from 'vue';

import { PLUGING_CONTEXT_KEY } from './consts';
import type { PluginOptions } from './types';

export const plugin: Plugin = {
  install(app, options: PluginOptions) {
    app.provide(PLUGING_CONTEXT_KEY, options);
  },
};
