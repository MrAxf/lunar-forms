import {
  addComponent,
  addImports,
  defineNuxtModule,
  logger,
} from '@nuxt/kit';
import { isPackageExists } from 'local-pkg';


// Module options TypeScript interface definition
export interface ModuleOptions {
  autoImports?: boolean;
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
];

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'lunar-forms',
    configKey: 'lunarForms',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    autoImports: true,
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
  if (isPackageExists('@lunar-forms/fields')) {
    logger.info('@lunar-forms/fields');
    if (options.autoImports) {
      fieldsComponents.forEach((component) => {
        addComponent({
          name: component,
          export: component,
          filePath: '@lunar-forms/core',
        });
      });
    }

    return true;
  }

  return false;
}
