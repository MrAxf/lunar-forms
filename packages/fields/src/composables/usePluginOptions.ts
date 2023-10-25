import { inject } from 'vue';

import { PLUGING_CONTEXT_KEY } from '@/consts';
import type { PluginOptions } from '@/types';

export function usePluginOptions<T extends PluginOptions>() {
  const pluginOptions = inject<T>(PLUGING_CONTEXT_KEY);

  if (!pluginOptions)
    throw new Error('Lunar Forms Fields plugin is not setted.');

  return pluginOptions;
}
