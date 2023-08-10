<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts" generic="T extends FieldValues">
import type { DeepReadonly, Ref, UnwrapRef } from 'vue';
import { useForm } from '../composables';
import type { FieldValues, Maybe } from '../types';

const props = defineProps<{
  initialValues?: Partial<T>;
}>();

const emit = defineEmits<{
  (e: 'submit', values: T): void;
}>();

defineSlots<{
  default(props: {
    values: DeepReadonly<UnwrapRef<Partial<T>>>;
    errors: ;
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
    <slot :values="values" :errors="errors" />
  </form>
</template>
