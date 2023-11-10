<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import {
  maxLength as maxLengthValidator,
  minLength as minLengthValidator,
  pattern as patterValidate,
  required as requiredValidator,
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
  name: 'SearchField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldCommonClassesProps & {
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
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

defineSlots<FieldCommonSlots>();

const {
  theme: {
    icons,
    classes: {
      global,
      groups: { inputText: groupClasses },
      fields: { search: fieldClasses },
    },
  },
  messages,
} = usePluginOptions();

const { id, fieldData, onClear } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.minLength)
      validation.push(
        minLengthValidator(messages.text.minLength, props.minLength)
      );
    if (props.maxLength)
      validation.push(
        maxLengthValidator(messages.text.maxLength, props.maxLength)
      );
    if (props.pattern)
      validation.push(patterValidate(messages.text.pattern, props.pattern));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
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
    :class-help="[groupClasses.help, fieldClasses.help, props.classHelp]"
    :class-inner="[groupClasses.inner, fieldClasses.inner, props.classInner]"
    :class-label="[groupClasses.label, fieldClasses.label, props.classLabel]"
    :class-message="[
      groupClasses.message,
      fieldClasses.message,
      props.classMessage,
    ]"
    :class-outer="[groupClasses.outer, fieldClasses.outer, props.classOuter]"
    :class-wrapper="[
      groupClasses.wrapper,
      fieldClasses.wrapper,
      props.classWrapper,
    ]"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-readonly="props.readonly ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-input-btn="props.clearButton ? true : null"
    :data-prefix="$slots.prefix ? true : null"
    :data-suffix="$slots.suffix ? true : null"
    :data-field="$options.name"
  >
    <div
      v-if="$slots.prefix"
      :class="[
        global.prefix,
        groupClasses.prefix,
        fieldClasses.prefix,
        props.classPrefix,
      ]"
    >
      <slot name="prefix" v-bind="fieldData"></slot>
    </div>
    <input
      type="search"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      :minlength="props.minLength"
      :maxlength="props.maxLength"
      :pattern="props.pattern?.toString()"
      :class="[
        global.input,
        groupClasses.input,
        fieldClasses.input,
        props.classInput,
      ]"
      v-model="value"
      v-bind="{ ...$attrs, ...fieldProps }"
    />
    <button
      v-if="props.clearButton"
      type="button"
      v-html="icons.clear"
      :class="[
        global['input-btn'],
        groupClasses['input-btn'],
        fieldClasses['input-btn'],
        props.classInputBtn,
      ]"
      :title="messages.actions.clear"
      @click="onClear"
    ></button>
    <div
      v-if="$slots.suffix"
      :class="[
        global.suffix,
        groupClasses.suffix,
        fieldClasses.suffix,
        props.classSuffix,
      ]"
    >
      <slot name="suffix" v-bind="fieldData"></slot>
    </div>
  </FieldWrapper>
</template>
