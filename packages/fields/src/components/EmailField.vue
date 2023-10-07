<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, unref } from 'vue';
import type {
  FieldValue,
  FieldTransformer,
  FieldValidation,
  MaybeArray,
} from '@lunar-forms/core';
import {
  email,
  maxLength,
  minLength,
  required as requiredValidator,
} from '@lunar-forms/core';
import { formatMessage } from '../utils';
import { useCommonField, usePluginOptions } from '../composables';
import FieldWrapper from './FieldWrapper.vue';

defineOptions({
  name: 'EmailField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    help?: string;
    modelValue?: FieldValue;
    initialValue?: FieldValue;
    transform?: MaybeArray<FieldTransformer>;
    refine?: MaybeArray<FieldTransformer>;
    validate?: MaybeArray<FieldValidation>;
    validateOn?: 'input' | 'change' | 'blur' | null;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    clearButton?: boolean;
    placeholder?: string;
    minLenght?: number;
    maxLenght?: number;
  }>(),
  {
    validateOn: 'input',
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
  prefix(): any;
  suffix(): any;
}>();

const { theme, messages } = usePluginOptions();

const {
  id,
  fieldData: { value, valid, touched, error, fieldProps },
  onClear,
} = useCommonField(props, emit, {
  validate: computed(() => {
    let validation: FieldValidation[] = [
      email(formatMessage(messages.email.valid)),
    ];
    if (props.required)
      validation.push(requiredValidator(formatMessage(messages.required)));
    if (props.minLenght)
      validation.push(
        minLength(
          formatMessage(messages.text.maxLenght, {
            value: props.minLenght.toString(),
          }),
          props.minLenght
        )
      );
    if (props.maxLenght)
      validation.push(
        maxLength(
          formatMessage(messages.text.maxLenght, {
            value: props.maxLenght.toString(),
          }),
          props.maxLenght
        )
      );
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
  refine: props.refine,
});
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
    :data-input-btn="props.clearButton ? true : null"
    :data-field="$options.name"
  >
    <div v-if="$slots.prefix" :class="theme.classes.prefix">
      <slot name="prefix"></slot>
    </div>
    <input
      type="email"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      :minlength="props.minLenght"
      :maxlength="props.maxLenght"
      :class="theme.classes.input"
      v-model="value"
      v-bind="{ ...$attrs, ...fieldProps }"
    />
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
