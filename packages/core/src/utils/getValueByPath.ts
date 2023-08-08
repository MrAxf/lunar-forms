import { FieldValues, Maybe } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function getValueByPath(
  obj: Maybe<FieldValues>,
  path: string
): any | undefined {
  if (!obj) return undefined;
  const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
  let currentObj = obj;

  for (const key of keys) {
    if (Array.isArray(currentObj) && /^\d+$/.test(key)) {
      const index = parseInt(key, 10);
      currentObj = currentObj[index];
    } else if (key in currentObj) {
      currentObj = currentObj[key] as FieldValues;
    } else {
      return undefined;
    }
  }

  return currentObj;
}
