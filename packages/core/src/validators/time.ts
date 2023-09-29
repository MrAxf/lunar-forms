import type { FieldValidation } from '../types/field';

export const timeRegexp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export function time(error: string): FieldValidation {
  return (value) =>
    !value || typeof value !== 'string' || timeRegexp.test(value)
      ? undefined
      : error;
}