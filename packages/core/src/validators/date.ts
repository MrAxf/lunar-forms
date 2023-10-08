import { formatMessage, isDate } from '../utils';
import type { FieldValidation } from '../types/field';

export function date(error: string): FieldValidation {
  return (value) =>
    value === undefined || value === null || isDate(value)
      ? undefined
      : formatMessage(error, {
          value: String(value),
        });
}
