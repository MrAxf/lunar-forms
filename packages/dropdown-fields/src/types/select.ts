import type { FieldValue } from '@lunar-forms/core';
import type { HTMLAttributes, OptionHTMLAttributes } from 'vue';

export interface SelectLabelValue {
  label: string;
  value: FieldValue;
  attrs?: OptionHTMLAttributes;
}

export type SelectLabelValueAsync<T extends SelectLabelValue> = (options: {
  page: number;
  search?: string;
  hasMore: () => void;
  signal: AbortSignal;
}) => Promise<T[]>;

export type SelectOptions =
  | string[]
  | SelectLabelValue[]
  | SelectLabelValueAsync<SelectLabelValue>;

export interface InputSelectCommonProps<T extends SelectLabelValue> {
  classInputIcon?: HTMLAttributes['class'];
  classOptions?: HTMLAttributes['class'];
  classOption?: HTMLAttributes['class'];
  classDropdownWrapper?: HTMLAttributes['class'];
  classOptionSelectedicon?: HTMLAttributes['class'];
  classOptionContent?: HTMLAttributes['class'];
  classOptionLoading?: HTMLAttributes['class'];
  classOptionLoadingLoader?: HTMLAttributes['class'];
  classDropdownContent?: HTMLAttributes['class'];
  classInputContent?: HTMLAttributes['class'];
  classInputCount?: HTMLAttributes['class'];
  classInputLoading?: HTMLAttributes['class'];
  classDropdownEnterActive?: HTMLAttributes['class'];
  classDropdownEnterFrom?: HTMLAttributes['class'];
  classDropdownEnterTo?: HTMLAttributes['class'];
  classDropdownLeaveActive?: HTMLAttributes['class'];
  classDropdownLeaveFrom?: HTMLAttributes['class'];
  classDropdownLeaveTo?: HTMLAttributes['class'];
  classDropdownMessage?: HTMLAttributes['class'];
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  placeholder?: string;
  options: string[] | T[] | SelectLabelValueAsync<T>;
  loadOption?: (value: FieldValue) => Promise<T>;
}
