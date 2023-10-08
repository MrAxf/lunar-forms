import { formatMessage } from '..';
import type { FieldValidation } from '../types/field';

export function confirm(error: string, requirement: string): FieldValidation {
  return (value, formCtx) => {
    if (!value) return undefined;
    return value !== formCtx?.fields[requirement]?.value.value
      ? formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        })
      : undefined;
  };
}
