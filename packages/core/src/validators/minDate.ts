/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatMessage, isDate } from '../utils';
import type { FieldValidation } from '../types/field';

export function minDate(
  error: string,
  requirement: string | Date
): FieldValidation {
  return (value) => {
    if (
      value === undefined ||
      value === null ||
      !isDate(value) ||
      !isDate(requirement)
    )
      return undefined;
    const valueDate = new Date(value as any);
    const requirementDate = new Date(requirement);

    return valueDate.getTime() < requirementDate.getTime()
      ? formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        })
      : undefined;
  };
}
