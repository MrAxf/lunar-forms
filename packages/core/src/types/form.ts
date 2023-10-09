import type { ComputedRef, Ref } from 'vue';

import type { FieldArrayContext, FieldData, FieldValues } from './field';
import type { Maybe } from './utils';

export interface FormContext {
  values: Ref<Partial<FieldValues>>;
  errors: Ref<Record<string, Maybe<string>>>;
  valid: ComputedRef<boolean>;
  validating: Ref<boolean>;
  fields: Record<string, FieldData>;
  fieldArrays: Record<string, FieldArrayContext>;
  subscribeField: (name: string, fieldData: FieldData) => void;
  unsubscribeField: (name: string) => void;
  subscribeFieldArray: (name: string, fieldData: FieldArrayContext) => void;
  unsubscribeFieldArray: (name: string) => void;
}

export interface FormOptions<T> {
  initialValues?: Partial<T>;
  handleSubmit: (values: T) => void;
}
