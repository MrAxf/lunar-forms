import { FieldValidation } from '../types/field';

export function required(error: string): FieldValidation {
  return (value) =>
    (!value && value !== 0) || (Array.isArray(value) && value.length === 0)
      ? error
      : undefined;
}
