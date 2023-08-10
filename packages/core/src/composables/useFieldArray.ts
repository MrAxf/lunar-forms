import { customRef, getCurrentInstance, inject, ref } from 'vue';
import { FieldArrayValue, FieldValues, FormContext } from '../types';
import { FORM_CONTEXT_KEY, getValueByPath, setValueByPath } from '../utils';

export function useFieldArray(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm: any = getCurrentInstance();
  const formContext: FormContext | undefined =
    vm?.provides[FORM_CONTEXT_KEY] || inject(FORM_CONTEXT_KEY);

  if (!formContext) throw new Error('Field Array needs a Form Context.');

  let keyIndex = 0;

  const fields = ref<FieldArrayValue[]>([]);

  function init() {
    const currVals = getValueByPath(formContext?.values.value, name);

    if (Array.isArray(currVals)) {
      fields.value = currVals.map((item, index) => {
        return newEntry(item, index);
      });
    }
    updateMeta();
  }

  init();

  function newEntry(value: FieldValues, index?: number): FieldArrayValue {
    const currFields = fields.value;

    if (currFields && index !== undefined && currFields[index]) {
      return currFields[index];
    }

    const key = keyIndex++;

    return {
      key,
      value: customRef<FieldValues>(() => ({
        get() {
          const currVals = getValueByPath(formContext?.values.value, name);
          const index = fields.value.findIndex((item) => item.key === key);
          return index < 0 ? value : currVals[index];
        },
        set(value) {
          const index = fields.value.findIndex((item) => item.key === key);
          if (index <= 0) return;

          update(index, value);
        },
      })) as unknown as FieldValues,
      isFirts: false,
      isLast: false,
    };
  }

  function update(index: number, value: FieldValues) {
    const currVal = getValueByPath(formContext?.values.value, name);
    if (!Array.isArray(currVal) || currVal.length - 1 < index) {
      return;
    }

    setValueByPath(formContext?.values.value, `${name}[${index}]`, value);
  }

  function updateMeta() {
    fields.value.forEach((item, index, arr) => {
      item.isFirts = index === 0;
      item.isLast = index === arr.length;
    });
  }
}
