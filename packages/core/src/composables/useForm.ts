import { computed, provide, reactive, readonly, ref } from 'vue';
import type { FieldData, FieldValues, Maybe } from '../types';
import { FORM_CONTEXT_KEY, validateFieldValue } from '../utils';
import { ValidationAbortedError } from '../errors';

export function useForm<T extends FieldValues>() {
  const values = reactive<Partial<T>>({});
  const errors = reactive<Record<string, Maybe<string>>>({});
  const valid = computed(() => Object.keys(errors).length === 0);
  const validating = ref(false);
  const fields = reactive<Record<string, FieldData>>({});

  let validateAbortController = new AbortController();

  async function validate() {
    validating.value = true;
    const fieldEntries = Object.entries(fields);

    validateAbortController.abort();
    validateAbortController = new AbortController();

    const promises = fieldEntries.map((field) => {
      const [validations, currValue] = field[1].getValidateParams();
      if (!validations || !validations.length) return undefined;
      return validateFieldValue(
        validations,
        currValue,
        validateAbortController.signal
      );
    });
    try {
      const results = await new Promise<PromiseSettledResult<Maybe<string>>[]>(
        (resolve, reject) => {
          const abortError = new ValidationAbortedError('Validation aborted');

          if (validateAbortController.signal.aborted) reject(abortError);

          validateAbortController.signal.addEventListener('abort', () => {
            reject(abortError);
          });

          (async () => {
            const result = await Promise.allSettled(promises);
            resolve(result);
          })();
        }
      );
      results.forEach((result, index) => {
        const field = fields[fieldEntries[index][0]];
        if (result.status === 'fulfilled') {
          field.setValid();
        } else if (result.status === 'rejected') {
          field.setError(result.reason);
        }
      });
      validating.value = false;
      // eslint-disable-next-line no-empty
    } catch (_) {}
  }

  function reset() {
    Object.entries(fields).forEach(([, field]) => {
      field.reset();
    });
  }

  async function onsubmit(ev: SubmitEvent) {
    ev.preventDefault();
    await validate();
    if (valid.value) return values;
  }

  provide(FORM_CONTEXT_KEY, {
    values,
    errors,
    valid,
    validating,
    fields,
  });

  return {
    values: readonly(values),
    errors: readonly(errors),
    valid: readonly(valid),
    validating: readonly(validating),
    validate,
    reset,
    formProps: {
      onsubmit,
      onreset: (ev: Event) => {
        ev.preventDefault();
        reset();
      },
      novalidate: true,
    },
  };
}
