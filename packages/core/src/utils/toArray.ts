import type { MaybeArray } from '@/types';

export const toArray = <T>(value: MaybeArray<T>) => {
  if (Array.isArray(value)) return value;
  return [value];
};
