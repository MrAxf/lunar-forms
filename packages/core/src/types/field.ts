import type { MaybeRef, Ref } from 'vue';

import { FormContext } from './form';
import type { Maybe, MaybeArray, MaybePromise, MaybeValue } from './utils';

export type FieldValue = MaybeValue<
  string | string[] | number | boolean | File | File[] | Date
>;

export type FieldValues = {
  [name: string]: FieldValue | FieldValues | (FieldValue | FieldValues)[];
};

export type FieldValidation = (
  value: FieldValue | FieldValue[],
  formCtx?: FormContext
) => MaybePromise<Maybe<string>>;

export type FieldTransformer = (
  value: FieldValue,
  formCtx?: FormContext
) => FieldValue;

export interface FieldOptions {
  initialValue?: MaybeRef<FieldValue>;
  validate?: MaybeRef<MaybeArray<FieldValidation>>;
  transform?: MaybeRef<MaybeArray<FieldTransformer>>;
  refine?: MaybeRef<MaybeArray<FieldTransformer>>;
  validateOn?: MaybeValue<'input' | 'change' | 'blur'>;
  type?: MaybeValue<string>;
  trueValue?: MaybeValue<FieldValue>;
  falseValue?: MaybeValue<FieldValue>;
  oninput?: (ev: InputEvent) => void;
  onfocus?: (ev: FocusEvent) => void;
  onchange?: (ev: Event) => void;
  onblur?: (ev: FocusEvent) => void;
}

export interface FieldData {
  name: string;
  value: Ref<FieldValue>;
  dirty: Readonly<Ref<boolean>>;
  touched: Readonly<Ref<boolean>>;
  valid: Readonly<Ref<Maybe<boolean>>>;
  error: Readonly<Ref<Maybe<string>>>;
  validating: Readonly<Ref<boolean>>;
  getValidateParams: () => [FieldValidation[] | undefined, FieldValue];
  setError: (err: string) => void;
  setValid: () => void;
  reset: () => void;
  validate: () => Promise<void>;
  refine: () => FieldValue;
  setDirty: (newValue: boolean) => void;
  setTouched: (newValue: boolean) => void;
  fieldProps: {
    oninput: (ev: InputEvent) => void;
    onfocus: (ev: FocusEvent) => void;
    onchange: (ev: Event) => void;
    onblur: (ev: FocusEvent) => void;
  };
}

export interface FieldArrayValue {
  key: string | number;
  value: FieldValues;
  isFirts: boolean;
  isLast: boolean;
}

export interface FieldArrayOptions {
  validate?: MaybeRef<MaybeArray<FieldValidation>>;
}

export interface FieldArrayContext {
  fields: Ref<FieldArrayValue[]>;
  valid: Readonly<Ref<Maybe<boolean>>>;
  error: Readonly<Ref<Maybe<string>>>;
  validating: Readonly<Ref<Maybe<boolean>>>;
  getValidateParams: () => [FieldValidation[] | undefined, FieldValue];
  validate: () => Promise<void>;
  reset: () => void;
  remove: (index: number) => void;
  setError: (err: string) => void;
  setValid: () => void;
  replace: (values: FieldValues[]) => void;
  update: (index: number, value: FieldValues) => void;
  push: (value: FieldValues) => void;
  swap: (index1: number, index2: number) => void;
  insert: (index: number, value: FieldValues) => void;
  prepend: (value: FieldValues) => void;
  move: (indexFrom: number, indexTo: number) => void;
}
