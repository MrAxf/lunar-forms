/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepAssign<T>(base: T, rest: any): T {
  if (!isPlainObject(rest)) return deepAssign(base, {});

  const toReturn = Object.assign({}, rest);

  for (const key in base) {
    if (key === '__proto__' || key === 'constructor') continue;

    // @ts-ignore
    const value = base[key];

    if (value === null || value === undefined) continue;

    if (Array.isArray(value) && Array.isArray(toReturn[key])) {
      toReturn[key] = [...value, ...toReturn[key]];
    } else if (isPlainObject(value) && isPlainObject(toReturn[key])) {
      toReturn[key] = deepAssign(value, toReturn[key]);
    } else {
      toReturn[key] = value;
    }
  }

  return toReturn;
}

export function isPlainObject(obj: unknown): boolean {
  const prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype === Object.getPrototypeOf({});
}
