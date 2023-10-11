/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValidation } from '@/types';
import { formatMessage, isDate } from '@/utils';

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
      ? formatMessage(
          error,
          {
            requirement: String(requirement),
            value: String(value),
          },
          {
            date: (value) =>
              new Date(value).toLocaleDateString(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
            datetime: (value) =>
              new Date(value).toLocaleString(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
          }
        )
      : undefined;
  };
}
