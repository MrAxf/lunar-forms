import { formatMessage } from '..';
import type { FieldValidation } from '../types/field';

export function pattern(error: string, requirement: RegExp): FieldValidation {
  return (value) => {
    if (!value || typeof value !== 'string') return undefined;
    return !requirement.test(value)
      ? formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        })
      : undefined;
  };
}
