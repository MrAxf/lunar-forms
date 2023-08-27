import {
  customRef,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  readonly,
  ref,
  unref,
  watch,
} from 'vue';
import type {
  FieldValue,
  FieldOptions,
  FieldData,
  FormContext,
  FieldValidation,
} from '../types';
import { ValidationError } from '../errors';
import {
  FORM_CONTEXT_KEY,
  getValueByPath,
  setValueByPath,
  validateFieldValue,
  noop,
} from '../utils';
import { useFieldBase } from './useFieldBase';

export function useField(
  name: string,
  {
    initialValue = undefined,
    validate: validations = [],
    validateOn = 'input',
    oninput: optionsOnInput = noop,
    onfocus: optionsOnFocus = noop,
    onchange: optionsOnChange = noop,
    onblur: optionsOnBlur = noop,
  }: FieldOptions
): FieldData {
  const { error, valid, validating, setError, setValid } = useFieldBase();

  let valueData: FieldValue = undefined;
  const dirty = ref(false);
  const touched = ref(false);

  const valueProxy = {
    get() {
      return valueData;
    },
    set(newValue: FieldValue) {
      valueData = newValue;
    },
  };

  const value = customRef<FieldValue>(() => ({
    get: () => valueProxy.get(),
    set: (newValue) => valueProxy.set(newValue),
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm: any = getCurrentInstance();
  const formContext: FormContext | undefined =
    vm?.provides[FORM_CONTEXT_KEY] || inject(FORM_CONTEXT_KEY);

  function oninput(ev: InputEvent) {
    dirty.value = true;
    optionsOnInput(ev);
    if (validateOn === 'input') validate();
  }

  function onfocus(ev: FocusEvent) {
    touched.value = true;
    optionsOnFocus(ev);
  }

  function onchange(ev: InputEvent) {
    dirty.value = true;
    optionsOnChange(ev);
    if (validateOn === 'change') validate();
  }

  function onblur(ev: FocusEvent) {
    touched.value = true;
    optionsOnBlur(ev);
    if (validateOn === 'blur') validate();
  }

  function reset() {
    if (initialValue !== undefined) value.value = initialValue;
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
    formContext.fields[name] = fieldData;

    valueProxy.get = () => getValueByPath(formContext.values.value, name);
    valueProxy.set = (newValue) =>
      setValueByPath(formContext.values.value, name, newValue);

    const unwatch = watch(error, (newErr) => {
      if (newErr === undefined) delete formContext.errors.value[name];
      else formContext.errors.value[name] = newErr;
    });

    onBeforeUnmount(() => {
      delete formContext.fields[name];
      unwatch();
      delete formContext.errors.value[name];
    });
  }

  if (initialValue) value.value = initialValue;

  return fieldData;
}
