import { FieldValidation } from '../types/field';

export function minLength(error: string, requirement: number): FieldValidation {
  return (value) =>
    (typeof value === 'string' || Array.isArray(value)) &&
    value?.length &&
    value.length < requirement
      ? error
      : undefined;
}
