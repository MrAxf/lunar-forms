import type { FieldValue } from '@lunar-forms/core';
import type { Ref } from 'vue';
import { inject, provide } from 'vue';

const contextKey = 'FIELDSET_CONTEXT';

export function createFieldsetContext(
  value: Ref<FieldValue>,
  name: string,
  id: string
) {
  provide(contextKey, { name, id, value });
}

export function useFieldsetContext() {
  return inject<{
    value: Ref<FieldValue>;
    name: string;
    id: string;
  }>(contextKey);
}
