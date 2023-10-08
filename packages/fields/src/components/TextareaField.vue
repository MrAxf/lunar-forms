<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, unref } from 'vue';
import type { FieldValue, FieldValidation } from '@lunar-forms/core';
import {
  maxLength,
  minLength,
  pattern as patterValidate,
  required as requiredValidator,
} from '@lunar-forms/core';
import { useCommonField, usePluginOptions } from '../composables';
import FieldWrapper from './FieldWrapper.vue';
import { FieldCommonProps } from '..';

defineOptions({
  name: 'TextareaField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps & {
      required?: boolean;
      disabled?: boolean;
      readonly?: boolean;
      clearButton?: boolean;
      placeholder?: string;
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
    }
  >(),
  {
    validateOn: 'input',
  }
);

defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'change', ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'input', ev: InputEvent): void;
}>();

defineSlots<{
  prefix(): any;
  suffix(): any;
}>();

const { theme, messages } = usePluginOptions();

const {
  id,
  fieldData: { value, valid, touched, error, fieldProps },
  onClear,
} = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.minLength)
      validation.push(minLength(messages.text.minLength, props.minLength));
    if (props.maxLength)
      validation.push(maxLength(messages.text.maxLength, props.maxLength));
    if (props.pattern)
      validation.push(patterValidate(messages.text.pattern, props.pattern));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});
</script>

<!-- eslint-disable vue/no-textarea-mustache -->
<!-- eslint-disable vue/valid-v-model -->
<template>
  <FieldWrapper
    :theme="theme"
    :id="id"
    :label="props.label"
    :help="props.help"
    :error="error"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-readonly="props.readonly ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-input-btn="props.clearButton ? true : null"
    :data-field="$options.name"
  >
    <div v-if="$slots.prefix" :class="theme.classes.prefix">
      <slot name="prefix"></slot>
    </div>
    <!-- @vue-ignore -->
    <textarea
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      :minlength="props.minLength"
      :maxlength="props.maxLength"
      :pattern="props.pattern?.toString()"
      :class="theme.classes.input"
      v-model="value"
      v-bind="{ ...$attrs, ...fieldProps }"
    ></textarea>
    <button
      v-if="props.clearButton"
      type="button"
      v-html="theme.icons.clear"
      :class="theme.classes['input-btn']"
      :title="messages.actions.clear"
      @click="onClear"
    ></button>
    <div v-if="$slots.suffix" :class="theme.classes.suffix">
      <slot name="suffix"></slot>
    </div>
  </FieldWrapper>
</template>
