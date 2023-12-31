import { type UnwrapRef, computed, provide, readonly, ref } from 'vue';

import { ValidationAbortedError, ValidationError } from '@/errors';
import type {
  FieldArrayContext,
  FieldData,
  FieldValues,
  FormContext,
  FormOptions,
  Maybe,
} from '@/types';
import { FORM_CONTEXT_KEY, setValueByPath, validateFieldValue } from '@/utils';

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

  const fieldsSubCount: Record<string, number> = {};
  const fieldArraysSubCount: Record<string, number> = {};

  function subscribeField(name: string, fieldData: FieldData) {
    if (fieldsSubCount[name]) {
      fieldsSubCount[name]++;
    } else {
      fields[name] = fieldData;
      fieldsSubCount[name] = 1;
    }
  }

  function unsubscribeField(name: string) {
    if (fieldsSubCount[name] === 1) {
      delete fieldsSubCount[name];
      delete fields[name];
      delete errors.value[name];
    } else {
      fieldsSubCount[name]--;
    }
  }

  function subscribeFieldArray(
    name: string,
    fieldArrayData: FieldArrayContext
  ) {
    if (fieldArraysSubCount[name]) {
      fieldArraysSubCount[name]++;
    } else {
      fieldArrays[name] = fieldArrayData;
      fieldArraysSubCount[name] = 1;
    }
  }

  function unsubscribeFieldArray(name: string) {
    if (fieldArraysSubCount[name] === 1) {
      delete fieldArraysSubCount[name];
      delete fieldArrays[name];
      delete errors.value[name];
    } else {
      fieldArraysSubCount[name]--;
    }
  }

  const formContext = {
    values,
    errors,
    valid,
    validating,
    fields,
    fieldArrays,
    subscribeField,
    unsubscribeField,
    subscribeFieldArray,
    unsubscribeFieldArray,
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
    const submitValues: FieldValues = {};

    if (valid.value) {
      Object.entries(fields).forEach(([name, { refine }]) => {
        setValueByPath(submitValues, name, refine());
      });
      handleSubmit(submitValues as T);
    }
  }

  provide(FORM_CONTEXT_KEY, formContext);

  return {
    values: readonly(values),
    errors: readonly(errors),
    valid: readonly(valid),
    validating: readonly(validating),
    fields: readonly(fields),
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
