/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  customRef,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  readonly,
  ref,
  toRaw,
  unref,
  watch,
} from 'vue';

import type { FieldData, FieldOptions, FieldValue, FormContext } from '@/types';
import {
  FORM_CONTEXT_KEY,
  getValueByPath,
  noop,
  setValueByPath,
  toArray,
  transformValue,
} from '@/utils';

import { useFieldBase } from './useFieldBase';

export function useField(
  name: string,
  {
    initialValue,
    validate: validations = [],
    transform: transformers = [],
    refine: refiners = [],
    validateOn = 'input',
    type,
    trueValue = true,
    falseValue,
    oninput: optionsOnInput = noop,
    onfocus: optionsOnFocus = noop,
    onchange: optionsOnChange = noop,
    onblur: optionsOnBlur = noop,
  }: FieldOptions
): FieldData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm: any = getCurrentInstance();
  const formContext: FormContext | undefined =
    vm?.provides[FORM_CONTEXT_KEY] || inject(FORM_CONTEXT_KEY, undefined);

  const valueData = ref<FieldValue>();
  const dirty = ref(false);
  const touched = ref(false);

  const valueProxy = {
    get() {
      return valueData.value;
    },
    set(newValue: FieldValue) {
      valueData.value = newValue;
    },
  };

  const value = customRef<FieldValue>(() => ({
    get: () => valueProxy.get(),
    set: (newValue) => valueProxy.set(newValue),
  }));

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
    getValue: () => value.value,
  });

  function transform() {
    if (transformers && unref(transformers).length) {
      value.value = transformValue(
        value.value,
        toArray(unref(transformers)),
        formContext
      );
    }
  }

  function refine() {
    if (refiners && unref(refiners).length) {
      return transformValue(value.value, toArray(unref(refiners)), formContext);
    }
    return toRaw(value.value);
  }

  function oninput(ev: InputEvent) {
    dirty.value = true;
    optionsOnInput(ev);
    if (validateOn === 'input') {
      transform();
      validate();
    }
  }

  function onfocus(ev: FocusEvent) {
    touched.value = true;
    optionsOnFocus(ev);
  }

  function onchange(ev: InputEvent) {
    dirty.value = true;
    optionsOnChange(ev);
    if (validateOn === 'change') {
      transform();
      validate();
    }
  }

  function onblur(ev: FocusEvent) {
    touched.value = true;
    optionsOnBlur(ev);
    if (validateOn === 'blur') {
      transform();
      validate();
    }
  }

  function setInitialValue() {
    if (type === 'checkbox') {
      if (initialValue === undefined) value.value = falseValue;
      else if (Array.isArray(initialValue)) value.value = initialValue;
      else value.value = trueValue;
    } else if (initialValue !== undefined) value.value = initialValue;
  }

  function reset() {
    if (initialValue !== undefined) setInitialValue();
    else value.value = getValueByPath(formContext?.values.value, name);
    error.value = undefined;
    dirty.value = false;
    touched.value = false;
  }

  function setDirty(newValue: boolean) {
    dirty.value = newValue;
  }

  function setTouched(newValue: boolean) {
    touched.value = newValue;
  }

  const fieldData = {
    name,
    value,
    dirty: readonly(dirty),
    touched: readonly(touched),
    valid: readonly(valid),
    error: readonly(error),
    validating: readonly(validating),
    getValidateParams,
    setError,
    setValid,
    reset,
    validate,
    refine,
    setDirty,
    setTouched,
    fieldProps: {
      name,
      oninput,
      onfocus,
      onchange,
      onblur,
    },
  };

  if (formContext) {
    formContext.subscribeField(name, fieldData);
    valueProxy.get = () => getValueByPath(formContext.values.value, name);
    valueProxy.set = (newValue) =>
      setValueByPath(formContext.values.value, name, newValue);

    const unwatch = watch(error, (newErr) => {
      if (newErr === undefined) delete formContext.errors.value[name];
      else formContext.errors.value[name] = newErr;
    });

    onBeforeUnmount(() => {
      unwatch();
      formContext.unsubscribeField(name);
    });
  }

  setInitialValue();

  return fieldData;
}
