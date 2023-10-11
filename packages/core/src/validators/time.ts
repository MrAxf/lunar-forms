import type { FieldValidation } from '@/types';
import { formatMessage } from '@/utils';

export const timeRegexp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export function time(error: string): FieldValidation {
  return (value) =>
    !value || typeof value !== 'string' || timeRegexp.test(value)
      ? undefined
      : formatMessage(
          error,
          {
            value: String(value),
          },
          {
            time: (value) => new Date(value).toLocaleTimeString(),
          }
        );
}
