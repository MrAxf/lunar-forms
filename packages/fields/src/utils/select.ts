import type { SelectLabelValue, SelectOptions } from '../types';

export function toSelectLabelValues(item?: SelectOptions): SelectLabelValue[] {
  if (!item) return [];
  if (typeof item[0] === 'string')
    return item.map((val) => ({ label: val as string, value: val as string }));
  return item as SelectLabelValue[];
}
