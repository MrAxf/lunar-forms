import type { FieldValidation } from '@/types';
import { formatMessage } from '@/utils';

export function minLength(error: string, requirement: number): FieldValidation {
  return (value) =>
    (typeof value === 'string' || Array.isArray(value)) &&
    value?.length &&
    value.length < requirement
      ? formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        })
      : undefined;
}
