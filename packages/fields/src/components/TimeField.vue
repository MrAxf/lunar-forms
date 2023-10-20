<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import {
  maxTime as maxTimeValidator,
  minTime as minTimeValidator,
  required as requiredValidator,
  time,
  timeRegexp,
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
  name: 'TimeField',
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
        min?: string;
        max?: string;
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
      groups: { inputText: groupClasess },
      fields: { time: fieldClasses },
    },
  },
  messages,
} = usePluginOptions();

const { id, fieldData, onClear } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));

    validation.push(time(messages.time.valid));
    if (props.min)
      validation.push(minTimeValidator(messages.time.min, props.min));
    if (props.max)
      validation.push(maxTimeValidator(messages.time.max, props.max));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const { value, valid, touched, error, fieldProps } = fieldData;

const minMaxDateAttrs = computed(() => ({
  min: timeRegexp.test(props.min || '') ? props.min : null,
  max: timeRegexp.test(props.max || '') ? props.max : null,
}));
</script>

<template>
  <FieldWrapper
    :global="global"
    :id="id"
    :label="props.label"
    :help="props.help"
    :error="error"
    :class-help="[groupClasess.help, fieldClasses.help, props.classHelp]"
    :class-inner="[groupClasess.inner, fieldClasses.inner, props.classInner]"
    :class-label="[groupClasess.label, fieldClasses.label, props.classLabel]"
    :class-message="[
      groupClasess.message,
      fieldClasses.message,
      props.classMessage,
    ]"
    :class-outer="[groupClasess.outer, fieldClasses.outer, props.classOuter]"
    :class-wrapper="[
      groupClasess.wrapper,
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
        groupClasess.prefix,
        fieldClasses.prefix,
        props.classPrefix,
      ]"
    >
      <slot name="prefix" v-bind="fieldData"></slot>
    </div>
    <!-- @vue-ignore -->
    <input
      type="time"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      :min="minMaxDateAttrs.min"
      :max="minMaxDateAttrs.max"
      :class="[
        global.input,
        groupClasess.input,
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
        groupClasess['input-btn'],
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
        groupClasess.suffix,
        fieldClasses.suffix,
        props.classSuffix,
      ]"
    >
      <slot name="suffix" v-bind="fieldData"></slot>
    </div>
  </FieldWrapper>
</template>
