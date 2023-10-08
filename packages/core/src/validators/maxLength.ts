import { formatMessage } from '..';
import type { FieldValidation } from '../types/field';

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
