import { formatMessage } from '..';
import type { FieldValidation } from '../types/field';

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function email(error: string): FieldValidation {
  return (value) =>
    !value || typeof value !== 'string' || emailRegexp.test(value)
      ? undefined
      : formatMessage(error, {
          value: String(value),
        });
}
