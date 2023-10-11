import { describe, expect, test } from 'vitest';

import { formatMessage } from '@/utils';

describe('FormatMessage util', () => {
  test('should return the message', () => {
    expect(formatMessage('Message')).toBe('Message');
  });

  test('should replace "{value}", with the given data', () => {
    expect(
      formatMessage('Message {value}', {
        value: 'hola',
      })
    ).toBe('Message hola');
    expect(
      formatMessage('Message {value:val}', {
        'value:val': 'hola',
      })
    ).toBe('Message hola');
  });

  test('should not replace the tag if not found it', () => {
    expect(formatMessage('Message {value}')).toBe('Message {value}');
    expect(formatMessage('Message {value}', { valuent: 'val' })).toBe(
      'Message {value}'
    );
  });

  test('should replace "{value}", with the given data multiple times', () => {
    expect(
      formatMessage('{value} Message {value}', {
        value: 'hola',
      })
    ).toBe('hola Message hola');
  });

  test('should replace multiple tags, with the given data multiple times', () => {
    expect(
      formatMessage('{value} Mess{anotheValue}age {value}', {
        value: 'hola',
        anotheValue: 'adios',
      })
    ).toBe('hola Messadiosage hola');
  });

  test('should replace use the formatter for tag', () => {
    const value = '2023-01-01';
    expect(
      formatMessage(
        'Message {date:value}',
        {
          value,
        },
        {
          date: (value) => new Date(value).toLocaleDateString(),
        }
      )
    ).toBe(`Message ${new Date(value).toLocaleDateString()}`);
  });
});
