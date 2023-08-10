<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts" generic="T extends FieldValues">
import type { DeepReadonly, UnwrapRef } from 'vue';
import { useForm } from '../composables';
import type { FieldValidation, FieldValue, FieldValues, Maybe } from '../types';

const props = defineProps<{
  initialValue?: FieldValue;
  validate?: FieldValidation[];
  validateOn?: 'input' | 'change' | 'blur' | null;
}>();

const emit = defineEmits<{
  (e: 'submit', values: T): void;
}>();

defineSlots<{
  default(props: {
    values: DeepReadonly<UnwrapRef<Partial<T>>>;
    errors: {
      readonly [x: string]: Maybe<string>;
    };
    valid: boolean;
    validating: boolean;
    validate: () => Promise<void>;
    reset: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): any;
}>();

const { formProps, values, errors, valid, validating, validate, reset } =
  useForm<T>({
    initialValues: props.initialValues,
    handleSubmit(values) {
      emit('submit', values);
    },
  });
</script>

<template>
  <form v-bind="formProps">
    <slot
      :values="values"
      :errors="errors"
      :valid="valid"
      :validating="validating"
      :validate="validate"
      :reset="reset"
    />
  </form>
</template>
