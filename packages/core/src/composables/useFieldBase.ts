import { type MaybeRef, ref, unref } from 'vue';
import type { FieldValidation, FieldValue, FormContext, Maybe } from '../types';
import { ValidationError } from '../errors';
import { validateFieldValue } from '../utils';

export function useFieldBase({
  validations,
  formContext,
  getValue,
}: {
  validations: MaybeRef<FieldValidation[]>;
  formContext?: FormContext;
  getValue: () => FieldValue;
}) {
  const valid = ref<Maybe<boolean>>();
  const error = ref<Maybe<string>>();
  const validating = ref(false);
  let validateAbortController = new AbortController();

  function setError(err: string) {
    error.value = err;
    valid.value = false;
  }

  function setValid() {
    error.value = undefined;
    valid.value = true;
  }

  function getValidateParams(): [FieldValidation[] | undefined, FieldValue] {
    return [unref(validations), unref(getValue())];
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
        validateAbortController.signal,
        formContext
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

  return {
    valid,
    error,
    validating,
    setError,
    setValid,
    validate,
    getValidateParams,
  };
}
