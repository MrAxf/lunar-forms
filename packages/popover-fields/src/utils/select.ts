import type { SelectLabelValue, SelectOptions } from '@/types';

export function toSelectLabelValues<T extends SelectLabelValue>(
  item?: SelectOptions
): T[] {
  if (!item) return [];
  if (typeof item[0] === 'string')
    return item.map(
      (val) => ({ label: val as string, value: val as string }) as T
    );
  return item as T[];
}
