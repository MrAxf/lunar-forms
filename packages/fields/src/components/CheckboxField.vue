<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import { required as requiredValidator } from '@lunar-forms/core';
import { computed, ref, unref } from 'vue';

import { useCommonField, usePluginOptions } from '@/composables';
import type {
  FieldCommonClassesProps,
  FieldCommonProps,
  FieldCommonSlots,
} from '@/types';

defineOptions({
  name: 'CheckboxField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldCommonClassesProps & {
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        trueValue?: FieldValue;
        falseValue?: FieldValue;
      }
  >(),
  {
    validateOn: 'change',
    trueValue: true,
    falseValue: false,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'change', ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'input', ev: InputEvent): void;
}>();

if (
  props.initialValue &&
  props.modelValue !== null &&
  props.modelValue !== undefined
) {
  emit('update:modelValue', props.initialValue);
}

defineSlots<FieldCommonSlots>();

const { theme, messages } = usePluginOptions();

const { id, fieldData } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const { value, valid, touched, error, fieldProps } = fieldData;

const inputRef = ref<HTMLInputElement | null>(null);
</script>

<template>
  <div
    :class="[theme.classes.outer, props.classOuter]"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-readonly="props.readonly ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-field="$options.name"
    :data-checked="inputRef?.checked ? true : null"
  >
    <label :class="[theme.classes.wrapper, props.classWrapper]">
      <div :class="[theme.classes.inner, props.classInner]">
        <div
          v-if="$slots.prefix"
          :class="[theme.classes.prefix, props.classPrefix]"
        >
          <slot name="prefix" v-bind="fieldData"></slot>
        </div>
        <input
          ref="inputRef"
          type="checkbox"
          :name="name"
          :id="id"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :required="props.required"
          :class="[theme.classes.input, props.classInput]"
          :true-value="props.trueValue"
          :false-value="props.falseValue"
          v-model="value"
          v-bind="{ ...$attrs, ...fieldProps }"
        />
        <div
          v-if="$slots.suffix"
          :class="[theme.classes.suffix, props.classSuffix]"
        >
          <slot name="suffix" v-bind="fieldData"></slot>
        </div>
      </div>
      <span
        v-if="props.label"
        :class="[theme.classes.label, props.classLabel]"
        >{{ props.label }}</span
      >
    </label>
    <span v-if="props.help" :class="[theme.classes.help, props.classHelp]">{{
      props.help
    }}</span>
    <span v-if="error" :class="[theme.classes.message, props.classMessage]">{{
      error
    }}</span>
  </div>
</template>
