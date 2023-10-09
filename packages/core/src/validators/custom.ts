import type { FieldValidation } from '@/types';

export function custom(validator: FieldValidation): FieldValidation {
  return async (value, formCtx) => await validator(value, formCtx);
}
