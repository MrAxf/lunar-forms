/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  FieldData,
  FieldTransformer,
  FieldValidation,
  FieldValue,
  FieldValues,
  MaybeArray,
} from '@lunar-forms/core';

export interface FieldCommonProps {
  name: string;
  label?: string;
  help?: string;
  modelValue?: FieldValues;
  initialValue?: FieldValue;
  transform?: MaybeArray<FieldTransformer>;
  refine?: MaybeArray<FieldTransformer>;
  validate?: MaybeArray<FieldValidation>;
  validateOn?: 'input' | 'change' | 'blur' | null;
}

export type FieldCommonSlots = {
  prefix(props: FieldData): any;
  suffix(props: FieldData): any;
};
