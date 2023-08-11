import type { MaybeRef, Ref } from 'vue';
import type { Maybe, MaybePromise, MaybeValue } from './utils';

export type FieldValue = MaybeValue<
  string | string[] | number | boolean | File | File[] | Date
>;

export type FieldValues = {
  [name: string]: FieldValue | FieldValues | (FieldValue | FieldValues)[];
};

export type FieldValidation = (
  value: MaybeValue<FieldValue>
) => MaybePromise<Maybe<string>>;

export interface FieldOptions {
  initialValue?: FieldValue;
  validate?: MaybeRef<FieldValidation[]>;
  validateOn?: MaybeValue<'input' | 'change' | 'blur'>;
  oninput?: (ev: InputEvent) => void;
  onfocus?: (ev: FocusEvent) => void;
  onchange?: (ev: Event) => void;
  onblur?: (ev: FocusEvent) => void;
}

export interface FieldData {
  name: string;
  value: Readonly<Ref<FieldValue>>;
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
  setDirty: (newValue: boolean) => void;
  setTouched: (newValue: boolean) => void;
  fieldProps: {
    oninput: (ev: InputEvent) => void;
    onfocus: (ev: FocusEvent) => void;
    onchange: (ev: InputEvent) => void;
    onblur: (ev: FocusEvent) => void;
  };
}

export interface FieldArrayValue {
  key: string | number;
  value: FieldValues;
  isFirts: boolean;
  isLast: boolean;
}

export interface FieldArrayContext {
  fields: Ref<FieldArrayValue[]>;
  reset: () => void;
  remove: (index: number) => void;
  replace: (values: FieldValues[]) => void;
  update: (index: number, value: FieldValues) => void;
  push: (value: FieldValues) => void;
  swap: (index1: number, index2: number) => void;
  insert: (index: number, value: FieldValues) => void;
  prepend: (value: FieldValues) => void;
  move: (indexFrom: number, indexTo: number) => void;
}
