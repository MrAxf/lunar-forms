<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, unref } from 'vue';
import type { FieldValue, FieldValidation } from '@lunar-forms/core';
import { required as requiredValidator } from '@lunar-forms/core';
import { useCommonField, usePluginOptions } from '../composables';
import { FieldCommonProps } from '..';

defineOptions({
  name: 'CheckboxField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps & {
      required?: boolean;
      disabled?: boolean;
      readonly?: boolean;
      trueValue?: FieldValue;
      falseValue?: FieldValue;
    }
  >(),
  {
    validateOn: 'change',
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
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});
</script>

<template>
  <div
    :class="theme.classes.outer"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-readonly="props.readonly ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-field="$options.name"
  >
    <div :class="theme.classes.wrapper">
      <div :class="theme.classes.inner">
        <div v-if="$slots.prefix" :class="theme.classes.prefix">
          <slot name="prefix"></slot>
        </div>
        <input
          v-if="props.trueValue !== undefined"
          type="checkbox"
          :name="name"
          :id="id"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :required="props.required"
          :class="theme.classes.input"
          :true-value="props.trueValue"
          :false-value="props.falseValue"
          v-model="value"
          v-bind="{ ...$attrs, ...fieldProps }"
        />
        <input
          v-else
          type="checkbox"
          :name="name"
          :id="id"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :required="props.required"
          :class="theme.classes.input"
          v-model="value"
          v-bind="{ ...$attrs, ...fieldProps }"
        />
        <div v-if="$slots.suffix" :class="theme.classes.suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
      <label v-if="props.label" :class="theme.classes.label" :for="id">{{
        props.label
      }}</label>
    </div>
    <span v-if="props.help" :class="theme.classes.help">{{ props.help }}</span>
    <span v-if="error" :class="theme.classes.message">{{ error }}</span>
  </div>
</template>
