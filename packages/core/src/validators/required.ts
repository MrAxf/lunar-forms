import type { FieldValidation } from '@/types';
import { formatMessage } from '@/utils';

export function required(error: string): FieldValidation {
  return (value) =>
    (!value && value !== 0) || (Array.isArray(value) && value.length === 0)
      ? formatMessage(error, {
          value: String(value),
        })
      : undefined;
}
