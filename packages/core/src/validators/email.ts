import type { FieldValidation } from '../types/field';

export function email(error: string): FieldValidation {
  return (value) => {
    if (!value || typeof value !== 'string') return undefined;
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !regex.test(value) ? error : undefined;
  };
}
