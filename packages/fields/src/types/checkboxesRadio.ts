import { type FieldValue } from '@lunar-forms/core';
import { type InputHTMLAttributes } from 'vue';

export interface CheckboxesRadioLabelValue {
  label: string;
  value: FieldValue;
  help?: string;
  attrs?: InputHTMLAttributes;
}

export type CheckboxesRadioOptions = string[] | CheckboxesRadioLabelValue[];
