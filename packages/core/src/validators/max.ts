import { formatMessage } from '..';
import type { FieldValidation } from '../types/field';

export function max(error: string, requirement: number): FieldValidation {
  return (value) => {
    if (value === undefined || value === null || !isNaN(Number(value)))
      return undefined;
    const valueToNumber = Number(value);

    return valueToNumber > requirement
      ? formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        })
      : undefined;
  };
}
