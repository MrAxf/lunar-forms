import { describe, test, expect } from 'vitest';
import { max } from '@/validators';

describe('Max validator', () => {
  test('should return undefined if pass undefined value', () => {
    expect(max('error', 5)(undefined)).undefined;
  });

  test('should return undefined if pass null value', () => {
    expect(max('error', 5)(null)).undefined;
  });

  test('should return undefined if pass not number value', () => {
    expect(max('error', 5)('hola')).undefined;
    expect(max('error', 5)({ a: 1 })).undefined;
  });

  test('should return error if value > requirement', () => {
    expect(max('error', 5)(10)).toBe('error');
  });

  test('should return undefined if value < requirement', () => {
    expect(max('error', 5)(4)).undefined;
  });

  test('should return undefined if value = requirement', () => {
    expect(max('error', 5)(5)).undefined;
  });

  test('should format error message', () => {
    expect(max('{value} must be <= {requirement}', 5)(10)).toBe(
      '10 must be <= 5'
    );
  });
});
