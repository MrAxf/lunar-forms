<!-- eslint-disable vue/require-default-prop -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts">
import { Component, useAttrs } from 'vue';
import { useField } from '../composables';
import type {
  FieldData,
  FieldTransformer,
  FieldValidation,
  FieldValue,
  Maybe,
} from '../types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    name: string;
    modelValue?: FieldValue;
    initialValue?: FieldValue;
    transform?: Maybe<FieldTransformer[]>;
    validate?: Maybe<FieldValidation[]>;
    validateOn?: 'input' | 'change' | 'blur' | null;
    isCheckbox?: boolean;
    value?: FieldValue;
    uncheckedValue?: FieldValue;
    as?: Component | 'input' | 'textarea' | 'select';
  }>(),
  {
    validateOn: 'input',
    isCheckbox: false,
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

const attrs = useAttrs();

let initialValue: FieldValue = props.initialValue;
if (props.isCheckbox || attrs['type'] === 'checkbox') {
  initialValue = (attrs['checked'] as boolean) || undefined;
}

const fieldData = useField(props.name, {
  initialValue,
  validate: props.validate,
  validateOn: props.validateOn,
  transform: props.transform,
  isCheckbox: attrs['type'] === 'checkbox' || props.isCheckbox,
  checkboxValue: props.value,
  checkboxUncheckedValue: props.uncheckedValue,
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
      :value="fieldData.value.value"
    />
  </slot>
</template>
