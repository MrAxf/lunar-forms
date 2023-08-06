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
} from '../utils';

export function useField(name: string, fieldOptions?: FieldOptions): FieldData {
  // const value = ref<FieldValue>(fieldOptions?.initialValue);
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

  const validateOn =
    fieldOptions?.validateOn !== undefined ? fieldOptions.validateOn : 'input';

  let validateAbortController = new AbortController();

  function getValidateParams(): [FieldValidation[] | undefined, FieldValue] {
    return [toValue(fieldOptions?.validate), toValue(value)];
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
      valid.value = true;
      error.value = undefined;
      validating.value = false;
    } catch (err) {
      if (err instanceof ValidationError) {
        valid.value = false;
        error.value = err.message;
        validating.value = false;
      }
    }
  }

  function oninput(ev: InputEvent) {
    dirty.value = true;
    fieldOptions?.fieldEvents?.oninput(ev);
    if (validateOn === 'input') validate();
  }

  function onfocus(ev: FocusEvent) {
    touched.value = true;
    fieldOptions?.fieldEvents?.onfocus(ev);
  }

  function onchange(ev: InputEvent) {
    dirty.value = true;
    fieldOptions?.fieldEvents?.onchange(ev);
    if (validateOn === 'change') validate();
  }

  function onblur(ev: FocusEvent) {
    touched.value = true;
    fieldOptions?.fieldEvents?.onblur(ev);
    if (validateOn === 'blur') validate();
  }

  function reset() {
    value.value = fieldOptions?.initialValue;
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

    valueProxy.get = () => getValueByPath(formContext.values, name);
    valueProxy.set = (newValue) =>
      setValueByPath(formContext.values, name, newValue);

    const unwatch = watch(error, (newErr) => {
      if (newErr === undefined) delete formContext.errors[name];
      else formContext.errors[name] = newErr;
    });

    onBeforeUnmount(() => {
      delete formContext.fields[name];
      unwatch();
      delete formContext.errors[name];
    });
  }

  if (fieldOptions?.initialValue) value.value = fieldOptions.initialValue;

  return fieldData;
}
