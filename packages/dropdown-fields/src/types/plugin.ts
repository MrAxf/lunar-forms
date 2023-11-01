import type { CommonClasses } from '@lunar-forms/fields';

export interface SelectClasses {
  options?: string;
  option?: string;
  'dropdown-wrapper'?: string;
  'option-selected-icon'?: string;
  'dropdown-content'?: string;
  'option-content'?: string;
  'option-loading'?: string;
  'option-loading-loader'?: string;
  'input-content'?: string;
  'input-count'?: string;
  'input-loading'?: string;
  'dropdown-enter'?: string;
  'dropdown-enter-active'?: string;
  'dropdown-enter-from'?: string;
  'dropdown-enter-to'?: string;
  'dropdown-leave'?: string;
  'dropdown-leave-active'?: string;
  'dropdown-leave-from'?: string;
  'dropdown-leave-to'?: string;
}

export interface LunarDropdownFieldsOptions {
  theme: {
    classes: {
      global: {
        'dropdown-wrapper'?: string;
        'dropdown-content'?: string;
        'option-selected-icon'?: string;
        'option-content'?: string;
        'option-loading'?: string;
        'option-loading-loader'?: string;
        'input-content'?: string;
        'input-count'?: string;
        'input-loading'?: string;
        'dropdown-enter'?: string;
        'dropdown-enter-active'?: string;
        'dropdown-enter-from'?: string;
        'dropdown-enter-to'?: string;
        'dropdown-leave'?: string;
        'dropdown-leave-active'?: string;
        'dropdown-leave-from'?: string;
        'dropdown-leave-to'?: string;
        'search-input'?: string;
      };
      fields: {
        selectMenu: CommonClasses &
          SelectClasses & {
            'input-icon'?: string;
          };
        autocomplete: CommonClasses &
          SelectClasses & {
            'input-icon'?: string;
            'search-input'?: string;
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
