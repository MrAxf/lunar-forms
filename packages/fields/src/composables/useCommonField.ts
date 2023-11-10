import type { FieldOptions } from '@lunar-forms/core';
import { useField, useVModel } from '@lunar-forms/core';
import { getCurrentInstance, unref } from 'vue';

import { generateId } from '@/utils';

export function useCommonField(fieldOptions: Partial<FieldOptions>) {
  const vm = getCurrentInstance();

  if (!vm || !vm.props.name)
    throw new Error(
      'You must use this composable inside a Vue component with a "name" prop.'
    );

  const id = `${vm.props.name}-${generateId()}`;

  const useFieldOptions = {
    ...vm.props,
    ...fieldOptions,
  };

  const fieldData = useField(vm.props.name as string, useFieldOptions);

  function onClear() {
    fieldData.value.value = Array.isArray(unref(useFieldOptions.initialValue))
      ? []
      : undefined;
    vm!.emit('update:modelValue', fieldData.value.value);
    fieldData.validate();
  }

  useVModel(fieldData.value);

  return { id, fieldData, onClear };
}
