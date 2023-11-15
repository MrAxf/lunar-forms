import {
  addComponent,
  addImports,
  addPluginTemplate,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import { isPackageExists } from 'local-pkg';

// Module options TypeScript interface definition
export interface ModuleOptions {
  autoImports?: boolean;
  fieldsConfigFile: string;
}

const components = ['LunarField', 'LunarForm', 'LunarFieldArray'];
const autoImports = [
  // Composables
  'useField',
  'useForm',
  'useFieldArray',
  'useFieldBase',

  // Validators
  'accept',
  'confirm',
  'custom',
  'date',
  'email',
  'max',
  'maxDate',
  'maxLength',
  'maxSize',
  'maxTime',
  'min',
  'minDate',
  'minLength',
  'minTime',
  'pattern',
  'required',
  'time',
  'url',

  // Validators UTILS
  'KB',
  'MB',

  // Transformers
  'toCase',
  'toCustom',
  'toNumber',

];

const fieldsComponents = [
  'CheckboxesField',
  'CheckboxField',
  'ColorField',
  'DateField',
  'DatetimeLocalField',
  'EmailField',
  'FielsetInput',
  'FileField',
  'HiddenField',
  'NumberField',
  'PasswordField',
  'RadioField',
  'RangeField',
  'SearchField',
  'SelectField',
  'TelField',
  'TextareaField',
  'TextField',
  'TimeField',
  'UrlField',
  'FieldsetInput',
];

const dropDownFieldsComponents = [
  'AutocompleteField',
  'SelectMenuField',
];

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'lunar-forms',
    configKey: 'lunarForms',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    autoImports: true,
    fieldsConfigFile: 'lunarFormsFields.config.js'
  },
  setup(options) {
    if (options.autoImports) {
      autoImports.forEach((autoImport) => {
        addImports({
          name: autoImport,
          as: autoImport,
          from: '@lunar-forms/core',
        });
      });

      components.forEach((component) => {
        addComponent({
          name: component,
          export: component,
          filePath: '@lunar-forms/core',
        });
      });
    }

    checkLunarFormFields(options);
  },
});

function checkLunarFormFields(options: ModuleOptions) {
  const resolver = createResolver(import.meta.url)
  if (isPackageExists('@lunar-forms/fields')) {
    if (options.autoImports) {
      fieldsComponents.forEach((component) => {
        addComponent({
          name: component,
          export: component,
          filePath: '@lunar-forms/fields',
        });
      });
    }

    checkLunarFormDropdownFields(options);

    addPluginTemplate({
      src: resolver.resolve('runtime/plugin.js'),
      options: {
        config: options.fieldsConfigFile
      },
    })

    return true;
  }

  return false;
}

function checkLunarFormDropdownFields(options: ModuleOptions) {
  if (isPackageExists('@lunar-forms/dropdown-fields')) {
    if (options.autoImports) {
      dropDownFieldsComponents.forEach((component) => {
        addComponent({
          name: component,
          export: component,
          filePath: '@lunar-forms/dropdown-fields',
        });
      });
    }
    return true;
  }

  return false;
}
