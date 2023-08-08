import {
  customRef,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  readonly,
  ref,
  toValue,
  watch,
} from 'vue';
import type {
  Maybe,
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
  let valueData: FieldValue = undefined;
  const dirty = ref(false);
  const touched = ref(false);
  const valid = ref<Maybe<boolean>>();
  const error = ref<Maybe<string>>();
  const validating = ref(false);

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

  let validateAbortController = new AbortController();

  function getValidateParams(): [FieldValidation[] | undefined, FieldValue] {
    return [toValue(validations), toValue(value)];
  }

  function setError(err: string) {
    error.value = err;
    valid.value = false;
  }

  function setValid() {
    error.value = undefined;
    valid.value = true;
  }

  async function validate() {
    validating.value = true;
    const [validations, currValue] = getValidateParams();
    if (!validations || !validations.length) return;

    validateAbortController.abort();
    validateAbortController = new AbortController();
    try {
      await validateFieldValue(
        validations,
        currValue,
        validateAbortController.signal
      );
      setValid();
      validating.value = false;
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.message);
        validating.value = false;
      }
    }
  }

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
