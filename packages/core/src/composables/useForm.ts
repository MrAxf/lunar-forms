import { type UnwrapRef, computed, provide, readonly, ref, unref } from 'vue';
import type {
  FieldArrayContext,
  FieldData,
  FieldValues,
  FormContext,
  FormOptions,
  Maybe,
} from '../types';
import { FORM_CONTEXT_KEY, validateFieldValue } from '../utils';
import { ValidationAbortedError, ValidationError } from '../errors';

export function useForm<T extends FieldValues>({
  initialValues = {},
  handleSubmit,
}: FormOptions<T>) {
  const values = ref<Partial<T>>(JSON.parse(JSON.stringify(initialValues)));
  const errors = ref<Record<string, Maybe<string>>>({});
  const valid = computed(() => Object.keys(errors.value).length === 0);
  const validating = ref(false);
  const fields: Record<string, FieldData> = {};
  const fieldArrays: Record<string, FieldArrayContext> = {};

  const formContext = {
    values,
    errors,
    valid,
    validating,
    fields,
    fieldArrays,
  };

  let validateAbortController = new AbortController();

  async function validate() {
    validating.value = true;
    const fieldEntries = [
      ...Object.entries(fields),
      ...Object.entries(fieldArrays),
    ];

    validateAbortController.abort();
    validateAbortController = new AbortController();

    const promises = fieldEntries.map((field) => {
      const [validations, currValue] = field[1].getValidateParams();
      if (!validations || !validations.length) return undefined;
      return validateFieldValue(
        validations,
        currValue,
        validateAbortController.signal,
        formContext as FormContext
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
        const field = fieldEntries[index][1];
        if (result.status === 'fulfilled') {
          field.setValid();
        } else if (result.status === 'rejected') {
          if (result.reason instanceof ValidationError) {
            field.setError(result.reason.message);
          }
        }
      });
      validating.value = false;
      // eslint-disable-next-line no-empty
    } catch (_) {}
  }

  function reset() {
    values.value = JSON.parse(JSON.stringify(initialValues)) as UnwrapRef<
      Partial<T>
    >;
    Object.entries(fields).forEach(([, field]) => {
      field.reset();
    });
    Object.entries(fieldArrays).forEach(([, field]) => {
      field.reset();
    });
  }

  async function onsubmit(ev: SubmitEvent) {
    ev.preventDefault();
    await validate();
    if (valid.value) handleSubmit(unref(values) as T);
  }

  provide(FORM_CONTEXT_KEY, formContext);

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
