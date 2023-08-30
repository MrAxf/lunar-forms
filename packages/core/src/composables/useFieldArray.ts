import {
  customRef,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  readonly,
  ref,
  watch,
} from 'vue';
import type {
  FieldArrayContext,
  FieldArrayOptions,
  FieldArrayValue,
  FieldValues,
  FormContext,
} from '../types';
import { FORM_CONTEXT_KEY, getValueByPath, setValueByPath } from '../utils';
import { useFieldBase } from './useFieldBase';

export function useFieldArray(
  name: string,
  { validate: validations = [] }: FieldArrayOptions
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm: any = getCurrentInstance();
  const formContext: FormContext | undefined =
    vm?.provides[FORM_CONTEXT_KEY] || inject(FORM_CONTEXT_KEY);

  if (!formContext) throw new Error('Field Array needs a Form Context.');

  const {
    error,
    valid,
    validating,
    setError,
    setValid,
    validate,
    getValidateParams,
  } = useFieldBase({
    validations,
    formContext,
    getValue: () =>
      getValueByPath((formContext as FormContext).values.value, name),
  });

  let keyIndex = 0;

  const fields = ref<FieldArrayValue[]>([]);

  function init() {
    const currVals = getValueByPath(formContext?.values.value, name);

    if (Array.isArray(currVals)) {
      fields.value = currVals.map((item, index) => {
        return newEntry(item, index);
      });
    } else {
      fields.value = [];
      setValueByPath(formContext?.values.value, name, []);
    }
    error.value = undefined;
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
          if (index < 0) return;

          update(index, value);
        },
      })) as unknown as FieldValues,
      isFirts: false,
      isLast: false,
    };
  }

  function updateMeta() {
    fields.value.forEach((item, index, arr) => {
      item.isFirts = index === 0;
      item.isLast = index === arr.length - 1;
    });
  }

  function remove(index: number) {
    const currValue = getValueByPath(formContext?.values.value, name);
    if (!Array.isArray(currValue)) return;

    const newValue = [...currValue];
    newValue.splice(index, 1);
    setValueByPath(formContext?.values.value, name, newValue);
    fields.value.splice(index, 1);
    updateMeta();
    validate();
  }

  function replace(values: FieldValues[]) {
    const currValue = getValueByPath(formContext?.values.value, name);
    if (!Array.isArray(currValue)) return;

    setValueByPath(formContext?.values.value, name, values);
    init();
    updateMeta();
    validate();
  }

  function update(index: number, value: FieldValues) {
    const currVal = getValueByPath(formContext?.values.value, name);
    if (!Array.isArray(currVal) || currVal.length - 1 < index) {
      return;
    }

    setValueByPath(formContext?.values.value, `${name}[${index}]`, value);
  }

  function push(value: FieldValues) {
    const currValue = getValueByPath(formContext?.values.value, name);
    if (!Array.isArray(currValue)) return;

    const newValue = [...currValue, value];
    setValueByPath(formContext?.values.value, name, newValue);
    fields.value.push(newEntry(value));
    updateMeta();
    validate();
  }

  function swap(index1: number, index2: number) {
    const currValue = getValueByPath(formContext?.values.value, name);
    if (
      !Array.isArray(currValue) ||
      !(index1 in currValue) ||
      !(index2 in currValue)
    )
      return;

    const newValue = [...currValue];
    const newFields = [...fields.value];

    const tempVal = newValue[index1];
    newValue[index1] = newValue[index2];
    newValue[index2] = tempVal;

    const tempField = newFields[index1];
    newFields[index1] = newFields[index2];
    newFields[index2] = tempField;

    setValueByPath(formContext?.values.value, name, newValue);
    fields.value = newFields;
    updateMeta();
    validate();
  }

  function insert(index: number, value: FieldValues) {
    const currValue = getValueByPath(formContext?.values.value, name);
    if (!Array.isArray(currValue) || currValue.length < index) return;

    const newValue = [...currValue];
    const newFields = [...fields.value];

    newValue.splice(index, 0, value);
    newFields.splice(index, 0, newEntry(value));
    setValueByPath(formContext?.values.value, name, newValue);
    fields.value = newFields;
    updateMeta();
    validate();
  }

  function prepend(value: FieldValues) {
    const currValue = getValueByPath(formContext?.values.value, name);
    if (!Array.isArray(currValue)) return;

    const newValue = [value, ...currValue];
    setValueByPath(formContext?.values.value, name, newValue);
    fields.value.unshift(newEntry(value));
    updateMeta();
    validate();
  }

  function move(indexFrom: number, indexTo: number) {
    const currValue = getValueByPath(formContext?.values.value, name);
    if (
      !Array.isArray(currValue) ||
      !(indexFrom in currValue) ||
      !(indexTo in currValue)
    )
      return;

    const newValue = [...currValue];
    const newFields = [...fields.value];

    const tempVal = newValue[indexFrom];
    newValue.splice(indexFrom, 1);
    newValue.splice(indexTo, 0, tempVal);

    const tempField = newFields[indexFrom];
    newFields.splice(indexFrom, 1);
    newFields.splice(indexTo, 0, tempField);

    setValueByPath(formContext?.values.value, name, newValue);
    fields.value = newFields;
    updateMeta();
    validate();
  }

  const fieldArrayCtx: FieldArrayContext = {
    fields,
    valid: readonly(valid),
    error: readonly(error),
    validating: readonly(validating),
    validate,
    getValidateParams,
    setError,
    setValid,
    reset: init,
    remove,
    replace,
    update,
    push,
    swap,
    insert,
    prepend,
    move,
  };

  formContext.fieldArrays[name] = fieldArrayCtx;

  const unwatch = watch(error, (newErr) => {
    if (newErr === undefined) delete formContext.errors.value[name];
    else formContext.errors.value[name] = newErr;
  });

  onBeforeUnmount(() => {
    delete formContext.fieldArrays[name];
    unwatch();
    delete formContext.errors.value[name];
  });

  return fieldArrayCtx;
}
