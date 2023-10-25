import type { CommonClasses } from '@lunar-forms/fields';

export interface SelectClasses {
  options?: string;
  option?: string;
  'option-selected-icon'?: string;
}

export interface LunarPopoverFieldsOptions {
  theme: {
    classes: {
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
