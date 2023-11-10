<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import { required as requiredValidator } from '@lunar-forms/core';
import type { HTMLAttributes } from 'vue';
import { computed, unref } from 'vue';

import { useCommonField, usePluginOptions } from '@/composables';
import type {
  FieldCommonClassesProps,
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
    FieldCommonProps &
      FieldCommonClassesProps & {
        classInputIcon?: HTMLAttributes['class'];
        required?: boolean;
        disabled?: boolean;
        multiple?: boolean;
        placeholder?: string;
        options?: SelectOptions;
      }
  >(),
  {
    validateOn: 'change',
    multiple: false,
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
      fields: { select: fieldClasses },
    },
  },
  messages,
} = usePluginOptions();

const { id, fieldData, onClear } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
  initialValue: computed(() =>
    props.multiple ? props.initialValue ?? [] : props.initialValue
  ),
});

const { value, valid, touched, error, fieldProps } = fieldData;

const selectOptions = computed(() => toSelectLabelValues(props.options));
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
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-prefix="$slots.prefix ? true : null"
    :data-suffix="$slots.suffix ? true : null"
    :data-field="$options.name"
    data-input-icon="true"
  >
    <div
      v-if="$slots.prefix"
      :class="[global.prefix, fieldClasses.prefix, props.classPrefix]"
    >
      <slot name="prefix" v-bind="fieldData"></slot>
    </div>
    <select
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :required="props.required"
      :placeholder="props.placeholder"
      :class="[global.input, fieldClasses.input, props.classInput]"
      :multiple="props.multiple"
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
    <div
      v-html="icons.select"
      :class="[
        global['input-icon'],
        fieldClasses['input-icon'],
        props.classInputIcon,
      ]"
    ></div>
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
