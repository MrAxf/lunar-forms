import { getCurrentInstance, inject, ref } from 'vue';
import { FormContext } from '../types';
import { FORM_CONTEXT_KEY } from '../utils';

export function useFieldArray<T = unknown>(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm: any = getCurrentInstance();
  const formContext: FormContext | undefined =
    vm?.provides[FORM_CONTEXT_KEY] || inject(FORM_CONTEXT_KEY);

  if (!formContext) throw new Error('Field Array needs a Form Context.');

  const fields = ref([]);
}
