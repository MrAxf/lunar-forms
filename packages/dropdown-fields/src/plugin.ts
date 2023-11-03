/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DeepPartial, PluginOptions } from '@lunar-forms/fields';
import { deepAssign } from '@lunar-forms/fields';

import { LunarDropdownFieldsOptions } from '@/types';

const commonClasses = [
  ['outer', 'lunar-outer'],
  ['wrapper', 'lunar-wrapper'],
  ['label', 'lunar-label'],
  ['inner', 'lunar-inner'],
  ['prefix', 'lunar-prefix'],
  ['suffix', 'lunar-suffix'],
  ['input', 'lunar-input'],
  ['help', 'lunar-help'],
  ['message', 'lunar-message'],
];

const selectClasses = [
  ['options', 'lunar-options'],
  ['option', 'lunar-option'],
  ['option-selected-icon', 'lunar-option-selected-icon'],
  ['option-content', 'lunar-option-content'],
  ['option-loading', 'lunar-option-loading'],
  ['option-loading-loader', 'lunar-option-loading-loader'],
  ['input-content', 'lunar-input-content'],
  ['input-count', 'lunar-input-count'],
  ['input-loading', 'lunar-input-loading'],
  ['dropdown-wrapper', 'lunar-dropdown-wrapper'],
  ['dropdown-content', 'lunar-dropdown-content'],
  ['dropdown-enter', 'lunar-dropdown-enter'],
  ['dropdown-enter-active', 'lunar-dropdown-enter-active'],
  ['dropdown-enter-from', 'lunar-dropdown-enter-from'],
  ['dropdown-enter-to', 'lunar-dropdown-enter-to'],
  ['dropdown-leave', 'lunar-dropdown-leave'],
  ['dropdown-leave-active', 'lunar-dropdown-leave-active'],
  ['dropdown-leave-from', 'lunar-dropdown-leave-from'],
  ['dropdown-leave-to', 'lunar-dropdown-leave-to'],
  ['dropdown-message', 'lunar-dropdown-message'],
];

const defaultConfig: LunarDropdownFieldsOptions = {
  theme: {
    classes: {
      global: Object.fromEntries([
        ...selectClasses.slice(2),
        ['search-input', 'lunar-search-input'],
      ]),
      fields: {
        selectMenu: Object.fromEntries(
          [
            ...commonClasses,
            ...selectClasses,
            ['input-icon', 'lunar-input-icon'],
          ].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-field-select-menu-'),
          ])
        ),
        autocomplete: Object.fromEntries(
          [
            ...commonClasses,
            ...selectClasses,
            ['input-icon', 'lunar-input-icon'],
            ['search-input', 'lunar-search-input'],
          ].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-field-autocomplete-'),
          ])
        ),
      },
      groups: {
        inputSelect: Object.fromEntries(
          [
            ...commonClasses,
            ...selectClasses,
            ['input-icon', 'lunar-input-icon'],
          ].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-group-input-select-'),
          ])
        ),
      },
    },
    icons: {
      optionSelected: 'icon-option-selected',
    },
  },
  messages: {
    notFoundResults: 'message-not-found-results',
    minSearchType: 'message-min-search-type',
  },
};

export const plugin =
  (pluginOptions: DeepPartial<LunarDropdownFieldsOptions>) =>
  <T extends PluginOptions>(options: T) =>
    deepAssign(deepAssign(pluginOptions, defaultConfig), options) as T;
