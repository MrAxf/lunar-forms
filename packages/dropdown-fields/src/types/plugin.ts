import type { CommonClasses } from '@lunar-forms/fields';

export interface SelectClasses {
  options?: string;
  option?: string;
  'dropdown-wrapper'?: string;
  'option-selected-icon'?: string;
}

export interface LunarDropdownFieldsOptions {
  theme: {
    classes: {
      global: {
        'dropdown-wrapper'?: string;
        'option-selected-icon'?: string;
      };
      fields: {
        selectMenu: CommonClasses &
          SelectClasses & {
            'input-icon'?: string;
          };
      };
      groups: {
        inputSelect: CommonClasses &
          SelectClasses & {
            'input-icon'?: string;
          };
      };
    };
    icons: {
      optionSelected: string;
    };
  };
}
