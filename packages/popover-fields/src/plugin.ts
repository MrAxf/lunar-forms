/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DeepPartial, PluginOptions } from '@lunar-forms/fields';

import { LunarPopoverFieldsOptions } from '@/types';

export const plugin =
  (pluginOptions: DeepPartial<LunarPopoverFieldsOptions>) =>
  (options: PluginOptions) => {
    (options as any).theme.classes.fields.selectMenu = {
      ...pluginOptions.theme?.classes?.fields?.selectMenu,
    };
    (options as any).theme.classes.groups.inputSelect = {
      ...pluginOptions.theme?.classes?.groups?.inputSelect,
    };
    (options as any).theme.icons = {
      ...options.theme.icons,
      ...pluginOptions.theme?.icons,
    };
  };
