import type { FieldValue } from '@lunar-forms/core';
import type { Ref } from 'vue';
import { inject, provide } from 'vue';

const contextKey = 'FIELDSET_CONTEXT';

export function createFieldsetContext(
  value: Ref<FieldValue>,
  name: string,
  id: string,
  type: 'checkbox' | 'radio'
) {
  provide(contextKey, { name, id, value, type });
}

export function useFieldsetContext() {
  return inject<{
    value: Ref<FieldValue>;
    name: string;
    id: string;
    type: 'checkbox' | 'radio';
  }>(contextKey);
}
