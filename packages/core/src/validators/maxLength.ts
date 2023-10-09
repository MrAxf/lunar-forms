import { formatMessage } from '@/utils';
import type { FieldValidation } from '@/types';

export function maxLength(error: string, requirement: number): FieldValidation {
  return (value) =>
    (typeof value === 'string' || Array.isArray(value)) &&
    value?.length &&
    value.length > requirement
      ? formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        })
      : undefined;
}
