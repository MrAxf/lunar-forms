import type { FieldValidation } from '../types/field';

export function confirm(
  error: string,
  requirement: string | string[]
): FieldValidation {
  return (value, formCtx) => {
    if (!value) return undefined;
    //TODO
    return null;
  };
}
