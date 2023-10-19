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
  FieldCommonProps,
  FieldCommonSlots,
  SelectOptions,
} from '@/types';
import { toSelectLabelValues } from '@/utils';

import FieldWrapper from './FieldWrapper.vue';

defineOptions({
  name: 'SelectField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps & {
      required?: boolean;
      disabled?: boolean;
      placeholder?: string;
      options?: SelectOptions;
    }
  >(),
  {
    validateOn: 'change',
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

const { id, fieldData } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const { value, valid, touched, error, fieldProps } = fieldData;

const selectOptions = computed(() => toSelectLabelValues(props.options));
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
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-field="$options.name"
    data-input-icon="true"
  >
    <div v-if="$slots.prefix" :class="theme.classes.prefix">
      <slot name="prefix" v-bind="fieldData"></slot>
    </div>
    <select
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :required="props.required"
      :placeholder="props.placeholder"
      :class="theme.classes.input"
      v-model="value"
      v-bind="{ ...$attrs, ...fieldProps }"
    >
      <option
        v-for="opt in selectOptions"
        :key="opt.label"
        :value="opt.value"
        v-bind="opt.attrs"
      >
        {{ opt.label }}
      </option>
    </select>
    <div v-html="theme.icons.select" :class="theme.classes['input-icon']"></div>
    <div v-if="$slots.suffix" :class="theme.classes.suffix">
      <slot name="suffix" v-bind="fieldData"></slot>
    </div>
  </FieldWrapper>
</template>
