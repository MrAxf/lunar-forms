<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import {
  email,
  maxLength as maxLengthValidator,
  minLength as minLengthValidator,
  required as requiredValidator,
} from '@lunar-forms/core';
import type { HTMLAttributes } from 'vue';
import { computed, unref } from 'vue';

import { useCommonField, usePluginOptions } from '@/composables';
import type {
  FieldCommonClassesProps,
  FieldCommonProps,
  FieldCommonSlots,
} from '@/types';

import FieldWrapper from './FieldWrapper.vue';

defineOptions({
  name: 'EmailField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldCommonClassesProps & {
        classInputBtn?: HTMLAttributes['class'];
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        clearButton?: boolean;
        placeholder?: string;
        minLength?: number;
        maxLength?: number;
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

defineSlots<FieldCommonSlots>();

const { theme, messages } = usePluginOptions();

const { id, fieldData, onClear } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [email(messages.email.valid)];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.minLength)
      validation.push(
        minLengthValidator(messages.text.minLength, props.minLength)
      );
    if (props.maxLength)
      validation.push(
        maxLengthValidator(messages.text.maxLength, props.maxLength)
      );
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const { value, valid, touched, error, fieldProps } = fieldData;
</script>

<template>
  <FieldWrapper
    :theme="theme"
    :id="id"
    :label="props.label"
    :help="props.help"
    :error="error"
    :class-help="props.classHelp"
    :class-inner="props.classInner"
    :class-label="props.classLabel"
    :class-message="props.classMessage"
    :class-outer="props.classOuter"
    :class-wrapper="props.classWrapper"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-readonly="props.readonly ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-input-btn="props.clearButton ? true : null"
    :data-field="$options.name"
  >
    <div
      v-if="$slots.prefix"
      :class="[theme.classes.prefix, props.classPrefix]"
    >
      <slot name="prefix" v-bind="fieldData"></slot>
    </div>
    <input
      type="email"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      :minlength="props.minLength"
      :maxlength="props.maxLength"
      :class="[theme.classes.input, props.classInput]"
      v-model="value"
      v-bind="{ ...$attrs, ...fieldProps }"
    />
    <button
      v-if="props.clearButton"
      type="button"
      v-html="theme.icons.clear"
      :class="[theme.classes['input-btn'], props.classInputBtn]"
      :title="messages.actions.clear"
      @click="onClear"
    ></button>
    <div
      v-if="$slots.suffix"
      :class="[theme.classes.suffix, props.classSuffix]"
    >
      <slot name="suffix" v-bind="fieldData"></slot>
    </div>
  </FieldWrapper>
</template>
