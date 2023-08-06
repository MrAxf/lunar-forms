import { FieldValidation } from '../types/field';

export function custom(validator: FieldValidation): FieldValidation {
  return async (value) => await validator(value);
}
