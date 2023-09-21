import type {
  CheckboxesRadioLabelValue,
  CheckboxesRadioOptions,
} from '../types';

export function toCheckboxesRadioLabelValues(
  item?: CheckboxesRadioOptions
): CheckboxesRadioLabelValue[] {
  if (!item) return [];
  if (typeof item[0] === 'string')
    return item.map((val) => ({ label: val as string, value: val as string }));
  return item as CheckboxesRadioLabelValue[];
}
