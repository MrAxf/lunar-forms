import type { FieldValidation } from '../types/field';

export function min(error: string, requirement: number): FieldValidation {
  return (value) => {
    if (value === undefined || value === null || !isNaN(Number(value)))
      return undefined;
    const valueToNumber = Number(value);

    return valueToNumber < requirement ? error : undefined;
  };
}
