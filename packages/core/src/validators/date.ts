import type { FieldValidation } from '@/types';
import { formatMessage, isDate } from '@/utils';

export function date(error: string): FieldValidation {
  return (value) =>
    value === undefined || value === null || isDate(value)
      ? undefined
      : formatMessage(error, {
          value: String(value),
        });
}
