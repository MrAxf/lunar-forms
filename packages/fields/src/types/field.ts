/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  FieldData,
  FieldTransformer,
  FieldValidation,
  FieldValue,
  FieldValues,
  MaybeArray,
} from '@lunar-forms/core';
import { HTMLAttributes } from 'vue';

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

export interface FieldCommonClassesProps {
  classOuter?: HTMLAttributes['class'];
  classWrapper?: HTMLAttributes['class'];
  classLabel?: HTMLAttributes['class'];
  classInner?: HTMLAttributes['class'];
  classHelp?: HTMLAttributes['class'];
  classMessage?: HTMLAttributes['class'];
  classInput?: HTMLAttributes['class'];
  classPrefix?: HTMLAttributes['class'];
  classSuffix?: HTMLAttributes['class'];
}

export interface FieldsetInputClassesProps {
  classOption?: HTMLAttributes['class'];
  classWrapper?: HTMLAttributes['class'];
  classInner?: HTMLAttributes['class'];
  classPrefix?: HTMLAttributes['class'];
  classSuffix?: HTMLAttributes['class'];
  classInput?: HTMLAttributes['class'];
  classLabel?: HTMLAttributes['class'];
  classHelp?: HTMLAttributes['class'];
}

export interface FieldsetClassesProps {
  classOuter?: HTMLAttributes['class'];
  classFieldset?: HTMLAttributes['class'];
  classLegend?: HTMLAttributes['class'];
  classMessage?: HTMLAttributes['class'];
  classOptions?: HTMLAttributes['class'];
  classOption?: HTMLAttributes['class'];
  classWrapper?: HTMLAttributes['class'];
  classInner?: HTMLAttributes['class'];
  classPrefix?: HTMLAttributes['class'];
  classSuffix?: HTMLAttributes['class'];
  classInput?: HTMLAttributes['class'];
  classLabel?: HTMLAttributes['class'];
  classHelp?: HTMLAttributes['class'];
}

export interface FieldWrapperClassesProps {
  classOuter?: HTMLAttributes['class'];
  classWrapper?: HTMLAttributes['class'];
  classLabel?: HTMLAttributes['class'];
  classInner?: HTMLAttributes['class'];
  classHelp?: HTMLAttributes['class'];
  classMessage?: HTMLAttributes['class'];
}

export type FieldCommonSlots = {
  prefix(props: FieldData): any;
  suffix(props: FieldData): any;
};
