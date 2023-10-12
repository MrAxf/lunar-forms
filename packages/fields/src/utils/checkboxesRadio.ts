import type {
  CheckboxesRadioLabelValue,
  CheckboxesRadioOptions,
} from '@/types';

export function toCheckboxesRadioLabelValues<
  T extends CheckboxesRadioLabelValue,
>(item?: CheckboxesRadioOptions): T[] {
  if (!item) return [];
  if (typeof item[0] === 'string')
    return item.map(
      (val) => ({ label: val as string, value: val as string }) as T
    );
  return item as T[];
}
