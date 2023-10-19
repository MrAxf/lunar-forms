import type { FieldsetLabelValue, FieldsetOptions } from '@/types';

export function toFieldsetLabelValues<T extends FieldsetLabelValue>(
  item?: FieldsetOptions
): T[] {
  if (!item) return [];
  if (typeof item[0] === 'string')
    return item.map(
      (val) => ({ label: val as string, value: val as string }) as T
    );
  return item as T[];
}
