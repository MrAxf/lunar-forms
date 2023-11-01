/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  SelectLabelValue,
  SelectLabelValueAsync,
  SelectOptions,
} from '@/types';

export function toAutocompleteLabelValues<T extends SelectLabelValue>(
  item?: SelectOptions
): SelectLabelValueAsync<T> {
  if (!item) return async () => [];
  if (Array.isArray(item) && typeof item[0] === 'string')
    // @ts-ignore
    return async ({ search }) =>
      item
        .filter((val) =>
          (val as string).toLowerCase().includes(search.toLowerCase())
        )
        .map((val) => ({ label: val as string, value: val as string }) as T);
  if (Array.isArray(item) && typeof item[0] === 'object')
    // @ts-ignore
    return async ({ search }) =>
      item.filter((val) =>
        (val as T).label.toLocaleLowerCase().includes(search.toLowerCase())
      ) as T[];

  return item as SelectLabelValueAsync<T>;
}
