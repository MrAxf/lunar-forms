import { FieldValues } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function setValueByPath(
  obj: FieldValues,
  path: string,
  value: any
): void {
  const keys = path.split(/\.|\[(\d+)\]/);
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

// export function tokenizePath(path: string): string[] {
//   const res = [], reg = /\[\s*(\d+)(?=\s*])|\[\s*(["'])((?:\\.|(?!\2).)*)\2\s*]|[\w$]+/g;
//   let a;
//   while (a = reg.exec(path)) {
//       res.push(a[1] || a[3] || a[0]);
//   }
//   return res;
}
