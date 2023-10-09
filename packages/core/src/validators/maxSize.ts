import type { FieldValidation } from '@/types';
import { formatMessage } from '@/utils';

export function maxSize(error: string, requirement: number): FieldValidation {
  return (value) => {
    if (
      !value ||
      (!Array.isArray(value) && !(value instanceof File)) ||
      (Array.isArray(value) && !value.every((item) => item instanceof File))
    )
      return undefined;

    if (Array.isArray(value)) {
      return (value as File[]).every((file) => file.size < requirement)
        ? undefined
        : formatMessage(error, {
            requirement: String(requirement),
            value: String(value),
          });
    }
    return value.size < requirement
      ? undefined
      : formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        });
  };
}
