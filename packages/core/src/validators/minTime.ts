/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValidation } from '../types/field';
import { timeRegexp } from './time';

const dateTemplate = '1912-06-23T';

export function minTime(error: string, requirement: string): FieldValidation {
  return (value) => {
    if (
      value === undefined ||
      value === null ||
      typeof value !== 'string' ||
      !timeRegexp.test(value) ||
      !timeRegexp.test(requirement)
    )
      return undefined;
    const valueDate = new Date(`${dateTemplate}${value}`);
    const requirementDate = new Date(`${dateTemplate}${requirement}`);

    return valueDate.getTime() < requirementDate.getTime() ? error : undefined;
  };
}
