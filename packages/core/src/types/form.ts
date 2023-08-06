import type { ComputedRef, Ref } from 'vue';
import type { FieldData, FieldValues } from './field';
import type { Maybe } from './utils';

export interface FormContext {
  values: Partial<FieldValues>;
  errors: Record<string, Maybe<string>>;
  valid: ComputedRef<boolean>;
  validating: Ref<boolean>;
  fields: Record<string, FieldData>;
}
