import { type FieldValue } from '@lunar-forms/core';
import { OptionHTMLAttributes } from 'vue';

export interface SelectLabelValue {
  label: string;
  value: FieldValue;
  attrs?: OptionHTMLAttributes;
}

export type SelectOptions = string[] | SelectLabelValue[];
