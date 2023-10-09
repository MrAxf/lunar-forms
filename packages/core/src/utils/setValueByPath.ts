import { FieldValues } from '@/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function setValueByPath(
  obj: FieldValues | undefined,
  path: string,
  value: any
): void {
  if (!obj) return;
  const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
  let currentObj = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (key in currentObj) {
      currentObj = currentObj[key] as FieldValues;
    } else {
      const nextKey = keys[i + 1];
      const isArrayIndex = /^\d+$/.test(nextKey);
      currentObj[key] = isArrayIndex ? [] : {};
      currentObj = currentObj[key] as FieldValues;
    }
  }

  const lastKey = keys[keys.length - 1];
  if (Array.isArray(currentObj) && /^\d+$/.test(lastKey)) {
    const index = parseInt(lastKey);
    currentObj[index] = value;
  } else {
    currentObj[lastKey] = value;
  }
}
