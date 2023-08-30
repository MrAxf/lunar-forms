<!-- eslint-disable vue/require-default-prop -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts">
import { Component } from 'vue';
import { useField } from '../composables';
import type { FieldData, FieldValidation, FieldValue, Maybe } from '../types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    name: string;
    modelValue?: FieldValue;
    initialValue?: FieldValue;
    validate?: Maybe<FieldValidation[]>;
    validateOn?: 'input' | 'change' | 'blur' | null;
    as?: Component | 'input' | 'textarea' | 'select';
  }>(),
  {
    as: 'input',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'change', ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'input', ev: InputEvent): void;
}>();

defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default(props: FieldData): any;
}>();

const fieldData = useField(props.name, {
  initialValue: props.initialValue,
  validate: props.validate,
  onblur(ev) {
    emit('blur', ev);
  },
  onchange(ev) {
    emit('change', ev);
  },
  onfocus(ev) {
    emit('focus', ev);
  },
  oninput(ev) {
    // @ts-ignore
    emit('update:modelValue', ev.target?.value);
    emit('input', ev);
  },
});
</script>

<template>
  <slot v-bind="fieldData">
    <component
      :is="props.as"
      :name="fieldData.name"
      v-bind="{ ...$attrs, ...fieldData.fieldProps }"
    />
  </slot>
</template>
