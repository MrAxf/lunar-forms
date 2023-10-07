import { type Ref, getCurrentInstance, watch } from 'vue';

export function useVModel<T>(value: Ref<T>, propName: string = 'modelValue') {
  const vm = getCurrentInstance();

  if (!vm || !(propName in vm.props)) return;

  const emitName = `update:${propName}`;

  if (vm.props[propName]) value.value = vm.props[propName] as T;

  watch(
    () => vm.props[propName],
    (newVal) => {
      value.value = newVal as T;
    }
  );

  watch(value, (newVal) => {
    vm.emit(emitName, newVal);
  });
}
