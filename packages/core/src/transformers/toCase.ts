import type { FieldTransformer } from '@/types';

type Case = 'lower_case' | 'upper_case';
export const LOWER_CASE: Case = 'lower_case';
export const UPPER_CASE: Case = 'upper_case';

export const toCase =
  (case_: Case = LOWER_CASE): FieldTransformer =>
  (value) => {
    if (value === null || value === undefined) return value;
    if (typeof value !== 'string') return value;

    if (case_ === UPPER_CASE) return value.toUpperCase();
    return value.toLowerCase();
  };
