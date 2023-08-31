import type { FieldValidation } from '../types/field';

export function min(
  error: string,
  requirement: number | string
): FieldValidation {
  return (value) => {
    if (value === undefined || value === null) return undefined;
    const valueToNumber = Number(value);
    const requirementToNumber = Number(requirement);

    if (!isNaN(valueToNumber) && !isNaN(requirementToNumber)) {
      return valueToNumber < requirementToNumber ? error : undefined;
    }

    if (requirement && typeof value === 'string') {
      const date = new Date(value);
      return date.getTime() < new Date(requirement).getTime()
        ? error
        : undefined;
    }
  };
}
