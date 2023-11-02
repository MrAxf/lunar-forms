import { type Plugin } from 'vue';

import { PLUGING_CONTEXT_KEY } from './consts';
import type { DeepPartial, PluginOptions } from './types';

export const plugin: Plugin = {
  install(app, options) {
    app.provide(PLUGING_CONTEXT_KEY, options);
  },
};

interface defineLunarFormsFieldsConfigParams
  extends DeepPartial<PluginOptions> {
  plugins?: ((options: PluginOptions) => void)[];
}

export const defineLunarFormsFieldsConfig = (
  config: defineLunarFormsFieldsConfigParams
) => {
  const baseConfig = {
    theme: {
      classes: {
        fields: {
          checkbox: {
            ...config.theme?.classes?.fields?.checkbox,
          },
          checkboxes: {
            ...config.theme?.classes?.fields?.checkboxes,
          },
          color: {
            ...config.theme?.classes?.fields?.color,
          },
          date: {
            ...config.theme?.classes?.fields?.date,
          },
          datetimeLocal: {
            ...config.theme?.classes?.fields?.datetimeLocal,
          },
          email: {
            ...config.theme?.classes?.fields?.email,
          },
          file: {
            ...config.theme?.classes?.fields?.file,
          },
          number: {
            ...config.theme?.classes?.fields?.number,
          },
          password: {
            ...config.theme?.classes?.fields?.password,
          },
          radio: {
            ...config.theme?.classes?.fields?.radio,
          },
          range: {
            ...config.theme?.classes?.fields?.range,
          },
          search: {
            ...config.theme?.classes?.fields?.search,
          },
          select: {
            ...config.theme?.classes?.fields?.select,
          },
          tel: {
            ...config.theme?.classes?.fields?.tel,
          },
          text: {
            ...config.theme?.classes?.fields?.text,
          },
          textarea: {
            ...config.theme?.classes?.fields?.textarea,
          },
          time: {
            ...config.theme?.classes?.fields?.time,
          },
          url: {
            ...config.theme?.classes?.fields?.url,
          },
        },
        global: {
          ...config.theme?.classes?.global,
        },
        groups: {
          inputCheckable: {
            ...config.theme?.classes?.groups?.inputCheckable,
          },
          inputFieldset: {
            ...config.theme?.classes?.groups?.inputFieldset,
          },
          inputText: {
            ...config.theme?.classes?.groups?.inputText,
          },
        },
      },
      icons: {
        clear: '',
        visibilityOn: '',
        visibilityOff: '',
        select: '',
        ...config.theme?.icons,
      },
    },
    messages: {
      required: config.messages?.required ?? '',
      text: {
        minLength: '',
        maxLength: '',
        pattern: '',
        ...config.messages?.text,
      },
      password: {
        confirm: '',
        ...config.messages?.password,
      },
      email: {
        valid: '',
        ...config.messages?.email,
      },
      url: {
        valid: '',
        ...config.messages?.url,
      },
      number: {
        min: '',
        max: '',
        ...config.messages?.number,
      },
      file: {
        accept: '',
        maxSize: '',
        ...config.messages?.file,
      },
      date: {
        valid: '',
        min: '',
        max: '',
        ...config.messages?.date,
      },
      datetime: {
        valid: '',
        min: '',
        max: '',
        ...config.messages?.datetime,
      },
      time: {
        valid: '',
        min: '',
        max: '',
        ...config.messages?.time,
      },
      actions: {
        clear: '',
        setVisible: '',
        setNotVisible: '',
        ...config.messages?.actions,
      },
    },
  };

  config.plugins?.forEach((plugin) => plugin(baseConfig));

  return baseConfig;
};
