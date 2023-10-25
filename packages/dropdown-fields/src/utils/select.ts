import type {
  SelectLabelValue,
  SelectLabelValueAsync,
  SelectOptions,
} from '@/types';

export function toSelectLabelValues<T extends SelectLabelValue>(
  item?: SelectOptions
): SelectLabelValueAsync<T> {
  if (!item) return async () => [];
  if (Array.isArray(item) && typeof item[0] === 'string')
    return async () =>
      item.map((val) => ({ label: val as string, value: val as string }) as T);
  if (Array.isArray(item) && typeof item[0] === 'object')
    return async () => item as T[];

  return item as SelectLabelValueAsync<T>;
}
