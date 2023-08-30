<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts" generic="T extends FieldValues">
import { useForm } from '../composables';
import type { FieldValues, FormOptions } from '../types';

const props = defineProps<{
  initialValues?: Partial<T>;
}>();

const emit = defineEmits<{
  (e: 'submit', values: T): void;
}>();

defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default(props: FormOptions<T>): any;
}>();

const formData = useForm<T>({
  initialValues: props.initialValues,
  handleSubmit(values) {
    emit('submit', values);
  },
});
</script>

<template>
  <form v-bind="formData.formProps">
    <slot v-bind="formData" />
  </form>
</template>
