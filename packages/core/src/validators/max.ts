import { formatMessage, isNullOrUndefined } from '../utils';
import type { FieldValidation } from '../types/field';

export function max(error: string, requirement: number): FieldValidation {
  return (value) => {
    if (isNullOrUndefined(value) || isNaN(Number(value))) return undefined;
    const valueToNumber = Number(value);

    return valueToNumber > requirement
      ? formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        })
      : undefined;
  };
}
