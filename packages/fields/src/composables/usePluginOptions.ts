import { inject } from 'vue';

import { PLUGING_CONTEXT_KEY } from '@/consts';
import type { PluginOptions } from '@/types';

export function usePluginOptions() {
  const pluginOptions = inject<PluginOptions>(PLUGING_CONTEXT_KEY);

  if (!pluginOptions)
    throw new Error('Lunar Forms Fields plugin is not setted.');

  return pluginOptions;
}
