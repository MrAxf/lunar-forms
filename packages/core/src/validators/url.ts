import type { FieldValidation } from '../types/field';

export function url(error: string): FieldValidation {
  return (value) => {
    if (!value || typeof value !== 'string') return undefined;
    const regex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
    return !regex.test(value) ? error : undefined;
  };
}
