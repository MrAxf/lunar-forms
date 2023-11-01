import type { FieldValue } from '@lunar-forms/core';
import { OptionHTMLAttributes } from 'vue';

export interface SelectLabelValue {
  label: string;
  value: FieldValue;
  attrs?: OptionHTMLAttributes;
}

export type SelectLabelValueAsync<T extends SelectLabelValue> = (options?: {
  page: number;
  search?: string;
  hasMore: () => void;
  signal: AbortSignal;
}) => Promise<T[]>;

export type SelectOptions =
  | string[]
  | SelectLabelValue[]
  | SelectLabelValueAsync<SelectLabelValue>;
