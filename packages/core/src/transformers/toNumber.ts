import type { FieldTransformer } from '@/types';

export const toNumber =
  (transformNullOrUndefined: boolean = true): FieldTransformer =>
  (value) => {
    if (transformNullOrUndefined && (value === null || value === undefined))
      return value;
    return Number(value);
  };
