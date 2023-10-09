import type { FieldValidation } from '@/types';
import { formatMessage } from '@/utils';

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
