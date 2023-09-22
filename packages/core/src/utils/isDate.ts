/* eslint-disable @typescript-eslint/no-explicit-any */
export function isDate(value: unknown) {
  const dateValue = new Date(value as any);
  return value instanceof Date || !isNaN(dateValue as any);
}
