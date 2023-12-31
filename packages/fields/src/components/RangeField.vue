<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import {
  max as maxValidator,
  min as minValidator,
  required as requiredValidator,
  toNumber,
} from '@lunar-forms/core';
import { computed, unref } from 'vue';

import { useCommonField, usePluginOptions } from '@/composables';
import type {
  FieldCommonClassesProps,
  FieldCommonProps,
  FieldCommonSlots,
} from '@/types';

import FieldWrapper from './FieldWrapper.vue';

defineOptions({
  name: 'RangeField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldCommonClassesProps & {
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        min?: number;
        max?: number;
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

const {
  theme: {
    icons,
    classes: {
      global,
      fields: { range: fieldClasses },
    },
  },
  messages,
} = usePluginOptions();

const { id, fieldData, onClear } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.min)
      validation.push(minValidator(messages.number.min, props.min));
    if (props.max)
      validation.push(maxValidator(messages.number.max, props.max));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
  transform: computed(() => {
    let transformers = [toNumber()];
    if (props.transform)
      transformers = transformers.concat(unref(props.transform));
    return transformers;
  }),
});

const { value, valid, touched, error, fieldProps } = fieldData;
</script>

<template>
  <FieldWrapper
    :global="global"
    :id="id"
    :label="props.label"
    :help="props.help"
    :error="error"
    :class-help="[fieldClasses.help, props.classHelp]"
    :class-inner="[fieldClasses.inner, props.classInner]"
    :class-label="[fieldClasses.label, props.classLabel]"
    :class-message="[fieldClasses.message, props.classMessage]"
    :class-outer="[fieldClasses.outer, props.classOuter]"
    :class-wrapper="[fieldClasses.wrapper, props.classWrapper]"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-readonly="props.readonly ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-prefix="$slots.prefix ? true : null"
    :data-suffix="$slots.suffix ? true : null"
    :data-input-btn="props.clearButton ? true : null"
    :data-field="$options.name"
  >
    <div
      v-if="$slots.prefix"
      :class="[global.prefix, fieldClasses.prefix, props.classPrefix]"
    >
      <slot name="prefix" v-bind="fieldData"></slot>
    </div>
    <input
      type="range"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :min="props.min"
      :max="props.max"
      :class="[global.input, fieldClasses.input, props.classInput]"
      v-model="value"
      v-bind="{ ...$attrs, ...fieldProps }"
    />
    <button
      v-if="props.clearButton"
      type="button"
      v-html="icons.clear"
      :class="[
        global['input-btn'],
        fieldClasses['input-btn'],
        props.classInputBtn,
      ]"
      :title="messages.actions.clear"
      @click="onClear"
    ></button>
    <div
      v-if="$slots.suffix"
      :class="[global.suffix, fieldClasses.suffix, props.classSuffix]"
    >
      <slot name="suffix" v-bind="fieldData"></slot>
    </div>
  </FieldWrapper>
</template>
