import type { FieldValidation } from '../types/field';

export function confirm(error: string, requirement: string): FieldValidation {
  return (value, formCtx) => {
    if (!value) return undefined;
    return value !== formCtx?.values.value[requirement] ? error : undefined;
  };
}
