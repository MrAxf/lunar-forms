import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Lunar Forms',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: {
        github: 'https://github.com/MrAxf/lunar-forms',
      },
      sidebar: [
        {
          label: 'Lunar Forms',
          items: [
            {
              label: 'Comienza por aquí',
              translations: {
                en: "Getting started",
              },
              link: '/lunar-forms-core/getting-started/',
            },
            {
              label: 'Composables',
              items: [
                {
                  label: 'useField',
                  link: '/lunar-forms-core/composables/useField',
                },
                {
                  label: 'useForm',
                  link: '/lunar-forms-core/composables/useForm',
                },
                {
                  label: 'useFieldArray',
                  link: '/lunar-forms-core/composables/useFieldArray',
                }
              ]
            },
            {
              label: 'Componentes',
              translations: {
                en: "Comoponents",
              },
              items: [
                {
                  label: 'LunarField',
                  link: '/lunar-forms-core/components/LunarField',
                },
                {
                  label: 'LunarForm',
                  link: '/lunar-forms-core/components/LunarForm',
                },
                {
                  label: 'LunarFieldArray',
                  link: '/lunar-forms-core/components/LunarFieldArray',
                }
              ]
            },
            {
              label: 'Validadores',
              translations: {
                en: "Validators",
              },
              link: '/lunar-forms-core/validators/',
            },
            {
              label: 'Transformadores',
              translations: {
                en: "Validators",
              },
              link: '/lunar-forms-core/transformers/',
            },
          ],
        },
        {
          label: 'Lunar Forms Fields',
          items: [
            {
              label: 'Comienza por aquí',
              translations: {
                en: "Getting started",
              },
              link: '/lunar-forms-fields/getting-started/',
            },
            {
              label: 'Configuración',
              translations: {
                en: "Config",
              },
              link: '/lunar-forms-fields/config/',
            },
            {
              label: 'Componentes',
              translations: {
                en: "Comoponents",
              },
              items: [
                {
                  label: 'CheckboxField',
                  link: '/lunar-forms-fields/components/CheckboxField',
                },
                {
                  label: 'CheckboxesField',
                  link: '/lunar-forms-fields/components/CheckboxesField',
                },
                {
                  label: 'ColorField',
                  link: '/lunar-forms-fields/components/ColorField',
                },
                {
                  label: 'DateField',
                  link: '/lunar-forms-fields/components/DateField',
                },
                {
                  label: 'DatetimeLocalField',
                  link: '/lunar-forms-fields/components/DatetimeLocalField',
                },
                {
                  label: 'EmailField',
                  link: '/lunar-forms-fields/components/EmailField',
                },
                {
                  label: 'FileField',
                  link: '/lunar-forms-fields/components/FileField',
                },
                {
                  label: 'HiddenField',
                  link: '/lunar-forms-fields/components/HiddenField',
                },
                {
                  label: 'NumberField',
                  link: '/lunar-forms-fields/components/NumberField',
                },
                {
                  label: 'PasswordField',
                  link: '/lunar-forms-fields/components/PasswordField',
                },
                {
                  label: 'RadioField',
                  link: '/lunar-forms-fields/components/RadioField',
                },
                {
                  label: 'RangeField',
                  link: '/lunar-forms-fields/components/RangeField',
                },
                {
                  label: 'SearchField',
                  link: '/lunar-forms-fields/components/SearchField',
                },
                {
                  label: 'SelectField',
                  link: '/lunar-forms-fields/components/SelectField',
                },
                {
                  label: 'TelField',
                  link: '/lunar-forms-fields/components/TelField',
                },
                {
                  label: 'TextField',
                  link: '/lunar-forms-fields/components/TextField',
                },
                {
                  label: 'TextareaField',
                  link: '/lunar-forms-fields/components/TextareaField',
                },
                {
                  label: 'TimeField',
                  link: '/lunar-forms-fields/components/TimeField',
                },
                {
                  label: 'UrlField',
                  link: '/lunar-forms-fields/components/UrlField',
                },
                {
                  label: 'FieldsetInput',
                  link: '/lunar-forms-fields/components/DateField',
                },
              ],
            }
          ]
        },
        {
          label: 'Lunar Forms Dropdown Fields',
          items: [
            {
              label: 'Comienza por aquí',
              translations: {
                en: "Getting started",
              },
              link: '/lunar-forms-dropdown-fields/getting-started/',
            },
            {
              label: 'Configuración',
              translations: {
                en: "Config",
              },
              link: '/lunar-forms-dropdown-fields/config/',
            },
            {
              label: 'Componentes',
              translations: {
                en: "Comoponents",
              },
              items: [
                {
                  label: 'AutocompleteField',
                  link: '/lunar-forms-dropdown-fields/components/AutocompleteField',
                },
                {
                  label: 'SelectMenuField',
                  link: '/lunar-forms-dropdown-fields/components/SelectMenuField',
                },
              ],
            }
          ]
        },
      ],
      defaultLocale: 'es',
      locales: {
        es: {
          label: 'Español',
          lang: 'es-ES',
        },
        en: {
          label: 'Inglés',
          lang: 'en',
        },
      },
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    vue(),
  ],
  experimental: {
    devOverlay: true
  },
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
