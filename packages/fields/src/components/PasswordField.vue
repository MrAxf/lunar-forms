<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import type { FieldValue, FieldValidation } from '@lunar-forms/core';
import {
  maxLength,
  minLength,
  pattern as patterValidate,
  required as requiredValidator,
  confirm as confirmValidator,
} from '@lunar-forms/core';
import { useCommonField, usePluginOptions } from '../composables';
import FieldWrapper from './FieldWrapper.vue';
import { FieldCommonProps } from '..';

defineOptions({
  name: 'PasswordField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps & {
      required?: boolean;
      disabled?: boolean;
      readonly?: boolean;
      showButton?: boolean;
      placeholder?: string;
      minLenght?: number;
      maxLenght?: number;
      confirm?: string;
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
} = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.confirm)
      validation.push(
        confirmValidator(messages.password.confirm, props.confirm)
      );
    if (props.minLenght)
      validation.push(minLength(messages.text.minLenght, props.minLenght));
    if (props.maxLenght)
      validation.push(maxLength(messages.text.maxLenght, props.maxLenght));
    if (props.pattern)
      validation.push(patterValidate(messages.text.pattern, props.pattern));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const inputType = ref('password');

function onShow() {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
}
</script>

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
    :data-input-btn="props.showButton ? true : null"
    :data-field="$options.name"
  >
    <div v-if="$slots.prefix" :class="theme.classes.prefix">
      <slot name="prefix"></slot>
    </div>
    <input
      :type="inputType"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      :minlength="props.minLenght"
      :maxlength="props.maxLenght"
      :pattern="props.pattern?.toString()"
      :class="theme.classes.input"
      v-model="value"
      v-bind="{ ...$attrs, ...fieldProps }"
    />
    <button
      v-if="props.showButton"
      type="button"
      v-html="
        inputType === 'password'
          ? theme.icons.visibilityOn
          : theme.icons.visibilityOff
      "
      :class="theme.classes['input-btn']"
      :title="
        inputType === 'password'
          ? messages.actions.setVisible
          : messages.actions.setNotVisible
      "
      @click="onShow"
    ></button>
    <div v-if="$slots.suffix" :class="theme.classes.suffix">
      <slot name="suffix"></slot>
    </div>
  </FieldWrapper>
</template>
