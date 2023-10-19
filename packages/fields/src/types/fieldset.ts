import { type FieldValue } from '@lunar-forms/core';
import { type InputHTMLAttributes } from 'vue';

export interface FieldsetLabelValue {
  label: string;
  value: FieldValue;
  help?: string;
  attrs?: InputHTMLAttributes;
}

export type FieldsetOptions = string[] | FieldsetLabelValue[];
