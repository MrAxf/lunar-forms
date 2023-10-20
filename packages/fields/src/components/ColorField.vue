<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import { required as requiredValidator } from '@lunar-forms/core';
import { computed, unref } from 'vue';

import { useCommonField, usePluginOptions } from '@/composables';
import type {
  FieldCommonClassesProps,
  FieldCommonProps,
  FieldCommonSlots,
} from '@/types';

import FieldWrapper from './FieldWrapper.vue';

defineOptions({
  name: 'ColorField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldCommonClassesProps & {
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
      }
  >(),
  {
    validateOn: 'change',
    initialValue: '#ffffff',
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
    classes: {
      global,
      fields: { color: fieldClasses },
    },
  },
  messages,
} = usePluginOptions();

const { id, fieldData } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
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
    :data-field="$options.name"
  >
    <div
      v-if="$slots.prefix"
      :class="[global.prefix, fieldClasses.prefix, props.classPrefix]"
    >
      <slot name="prefix" v-bind="fieldData"></slot>
    </div>
    <input
      type="color"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :class="[global.input, fieldClasses.input, props.classInput]"
      v-model="value"
      v-bind="{ ...$attrs, ...fieldProps }"
    />
    <div
      v-if="$slots.suffix"
      :class="[global.suffix, fieldClasses.suffix, props.classSuffix]"
    >
      <slot name="suffix" v-bind="fieldData"></slot>
    </div>
  </FieldWrapper>
</template>
