/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepAssign<T>(baseObject: T, defaults: any): T {
  if (!isPlainObject(defaults)) {
    return deepAssign(baseObject, {});
  }

  const object = Object.assign({}, defaults);

  for (const key in baseObject) {
    if (key === '__proto__' || key === 'constructor') {
      continue;
    }
    const value = baseObject[key];

    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = deepAssign(value, object[key]);
    } else {
      object[key] = value;
    }
  }

  return object;
}

export function isPlainObject(obj: unknown): boolean {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }
  const prototype = Object.getPrototypeOf(obj);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in obj) &&
    !(Symbol.iterator in obj)
  );
}
