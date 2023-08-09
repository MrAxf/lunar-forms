import { customRef, getCurrentInstance, inject, ref, unref } from 'vue';
import { FieldValues, FormContext } from '../types';
import { FORM_CONTEXT_KEY, getValueByPath, setValueByPath } from '../utils';

export function useFieldArray<T extends FieldValues>(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm: any = getCurrentInstance();
  const formContext: FormContext | undefined =
    vm?.provides[FORM_CONTEXT_KEY] || inject(FORM_CONTEXT_KEY);

  if (!formContext) throw new Error('Field Array needs a Form Context.');

  let keyIndex = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fields = ref<any[]>([]);

  function newEntry(value: T, index?: number) {
    const currFields = fields.value;

    if (currFields && index !== undefined && currFields[index]) {
      return currFields[index];
    }

    const key = keyIndex++;

    return {
      key,
      value: customRef(() => ({
        get() {
          const currVals = getValueByPath(formContext.values.value, name);
          const index = fields.value.findIndex((item) => item.key === key);
          return index < 0 ? value : currVals[index];
        },
        set(value) {
          const index = fields.value.findIndex((item) => item.key === key);
          if (index <= 0) return;

          update(idx, value);
        },
      })),
    };
  }

  function update(index: number, value: T) {
    const currVal = getValueByPath(formContext.values.value, name);
    if (!Array.isArray(currVal) || currVal.length - 1 < index) {
      return;
    }

    setValueByPath(formContext.values, `${name}[${index}]`, value);
    formContext?.validate({ mode: 'validated-only' });
  }

  if (Array.isArray(currVals)) {
    fields.value = currVals.map((item, index, arr)({}));
  }
}
