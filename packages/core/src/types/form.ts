import type { ComputedRef, Ref } from 'vue';
import type { FieldData, FieldValues } from './field';
import type { Maybe } from './utils';

export interface FormContext {
  values: Ref<Partial<FieldValues>>;
  errors: Ref<Record<string, Maybe<string>>>;
  valid: ComputedRef<boolean>;
  validating: Ref<boolean>;
  fields: Record<string, FieldData>;
}

export interface FormOptions<T> {
  initialValues?: Partial<T>;
  handleSubmit: (values: T) => void;
}
