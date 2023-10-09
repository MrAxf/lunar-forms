import { describe, test, expect } from 'vitest';
import { min } from '@/validators';

describe('Min validator', () => {
  test('should return undefined if pass undefined value', () => {
    expect(min('error', 5)(undefined)).undefined;
  });

  test('should return undefined if pass null value', () => {
    expect(min('error', 5)(null)).undefined;
  });

  test('should return undefined if pass not number value', () => {
    expect(min('error', 5)('hola')).undefined;
    expect(min('error', 5)({ a: 1 })).undefined;
  });

  test('should return error if value < requirement', () => {
    expect(min('error', 10)(5)).toBe('error');
  });

  test('should return undefined if value > requirement', () => {
    expect(min('error', 5)(10)).undefined;
  });

  test('should return undefined if value = requirement', () => {
    expect(min('error', 5)(5)).undefined;
  });

  test('should format error message', () => {
    expect(min('{value} must be >= {requirement}', 10)(5)).toBe(
      '5 must be >= 10'
    );
  });
});
