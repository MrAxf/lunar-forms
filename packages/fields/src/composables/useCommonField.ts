import type { FieldOptions } from '@lunar-forms/core';
import { useField, useVModel } from '@lunar-forms/core';
import { getCurrentInstance } from 'vue';

export function useCommonField(fieldOptions: Partial<FieldOptions>) {
  const vm = getCurrentInstance();

  if (!vm || !vm.props.name)
    throw new Error(
      'You must use this composable inside a Vue component with a "name" prop.'
    );

  const id = `${vm.props.name}-${crypto.randomUUID()}`;

  const fieldData = useField(vm.props.name as string, {
    ...vm.props,
    ...fieldOptions,
  });

  function onClear() {
    fieldData.value.value = undefined;
    vm?.emit('update:modelValue', fieldData.value.value);
    fieldData.validate();
  }

  useVModel(fieldData.value);

  return { id, fieldData, onClear };
}
