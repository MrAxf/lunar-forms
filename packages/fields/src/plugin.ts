import { type Plugin } from 'vue';

import { PLUGING_CONTEXT_KEY } from './consts';
import type { DeepPartial, PluginOptions } from './types';
import { deepAssign } from './utils';

interface defineLunarFormsFieldsConfigParams
  extends DeepPartial<PluginOptions> {
  plugins?: (<T extends PluginOptions>(options: T) => T)[];
}

export const plugin: Plugin = {
  install(app, options) {
    app.provide(PLUGING_CONTEXT_KEY, options);
  },
};

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

const fieldsetClasses = [
  ['fieldset', 'lunar-fieldset'],
  ['legend', 'lunar-legend'],
  ['options', 'lunar-options'],
  ['option', 'lunar-option'],
];

const defaultConfig: PluginOptions = {
  theme: {
    classes: {
      global: Object.fromEntries([
        ...commonClasses,
        ...fieldsetClasses,
        ['input-btn', 'lunar-input-btn'],
        ['input-icon', 'lunar-input-icon'],
      ]),
      groups: {
        inputText: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [
              key,
              val.replace('lunar-', 'lunar-group-input-text-'),
            ]
          )
        ),
        inputCheckable: Object.fromEntries(
          [...commonClasses].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-group-input-checkable-'),
          ])
        ),
        inputFieldset: Object.fromEntries(
          [...commonClasses, ...fieldsetClasses].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-group-input-checkable-'),
          ])
        ),
      },
      fields: {
        checkboxes: Object.fromEntries(
          [...commonClasses, ...fieldsetClasses].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-input-checkboxes-'),
          ])
        ),
        checkbox: Object.fromEntries(
          [...commonClasses].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-input-checkbox-'),
          ])
        ),
        color: Object.fromEntries(
          [...commonClasses].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-input-color-'),
          ])
        ),
        date: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-date-')]
          )
        ),
        datetimeLocal: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-date-')]
          )
        ),
        email: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-email-')]
          )
        ),
        file: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-file-')]
          )
        ),
        number: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-number-')]
          )
        ),
        password: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [
              key,
              val.replace('lunar-', 'lunar-input-password-'),
            ]
          )
        ),
        radio: Object.fromEntries(
          [...commonClasses, ...fieldsetClasses].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-input-radio-'),
          ])
        ),
        range: Object.fromEntries(
          [...commonClasses].map(([key, val]) => [
            key,
            val.replace('lunar-', 'lunar-input-range-'),
          ])
        ),
        search: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-search-')]
          )
        ),
        select: Object.fromEntries(
          [...commonClasses, ['input-icon', 'lunar-input-icon']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-select-')]
          )
        ),
        tel: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-tel-')]
          )
        ),
        textarea: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [
              key,
              val.replace('lunar-', 'lunar-input-textarea-'),
            ]
          )
        ),
        text: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-text-')]
          )
        ),
        time: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-time-')]
          )
        ),
        url: Object.fromEntries(
          [...commonClasses, ['input-btn', 'lunar-input-btn']].map(
            ([key, val]) => [key, val.replace('lunar-', 'lunar-input-url-')]
          )
        ),
      },
    },
    icons: {
      clear: 'icon-clear',
      visibilityOn: 'icon-visibility-on',
      visibilityOff: 'icon-visibility-off',
      select: 'icon-visibility-select',
    },
  },
  messages: {
    required: 'message-required',
    text: {
      minLength: 'message-text-min-length',
      maxLength: 'message-text-max-length',
      pattern: 'message-text-pattern',
    },
    password: {
      confirm: 'message-password-confirm',
    },
    email: {
      valid: 'message-email-valid',
    },
    url: {
      valid: 'message-url-valid',
    },
    number: {
      min: 'message-number-min',
      max: 'message-number-max',
    },
    file: {
      accept: 'message-file-accept',
      maxSize: 'message-file-max-size',
    },
    date: {
      valid: 'message-date-valid',
      min: 'message-date-min',
      max: 'message-date-max',
    },
    datetime: {
      valid: 'message-datetime-valid',
      min: 'message-datetime-min',
      max: 'message-datetime-max',
    },
    time: {
      valid: 'message-time-valid',
      min: 'message-time-min',
      max: 'message-time-max',
    },
    actions: {
      clear: 'message-actions-clear',
      setVisible: 'message-actions-set-visible',
      setNotVisible: 'message-actions-set-not-visible',
    },
  },
};

export const defineLunarFormsFieldsConfig = <T extends PluginOptions>(
  config: defineLunarFormsFieldsConfigParams
) => {
  let pluginConf = deepAssign(config, defaultConfig);
  delete pluginConf['plugins'];

  config.plugins?.forEach((plugin) => {
    pluginConf = plugin(pluginConf as PluginOptions);
  });

  return pluginConf as T;
};
