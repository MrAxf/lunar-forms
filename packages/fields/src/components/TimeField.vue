<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, unref } from 'vue';
import type {
  FieldValue,
  Maybe,
  FieldTransformer,
  FieldValidation,
} from '@lunar-forms/core';
import {
  time,
  maxTime as maxTimeValidator,
  minTime as minTimeValidator,
  required as requiredValidator,
  timeRegexp,
} from '@lunar-forms/core';
import { formatMessage } from '../utils';
import { useCommonField, usePluginOptions } from '../composables';
import FieldWrapper from './FieldWrapper.vue';

defineOptions({
  name: 'TimeField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    help?: string;
    modelValue?: FieldValue;
    initialValue?: FieldValue;
    transform?: Maybe<FieldTransformer[]>;
    validate?: Maybe<FieldValidation[]>;
    validateOn?: 'input' | 'change' | 'blur' | null;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    clearButton?: boolean;
    placeholder?: string;
    min?: string;
    max?: string;
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
    let validation: FieldValidation[] = [];
    if (props.required)
      validation.push(requiredValidator(formatMessage(messages.required)));

    validation.push(time(formatMessage(messages.time.valid)));
    if (props.min)
      validation.push(
        minTimeValidator(
          formatMessage(messages.time.min, {
            value: props.min.toString(),
          }),
          props.min
        )
      );
    if (props.max)
      validation.push(
        maxTimeValidator(
          formatMessage(messages.time.max, {
            value: props.max.toString(),
          }),
          props.max
        )
      );
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const minMaxDateAttrs = computed(() => ({
  min: timeRegexp.test(props.min || '') ? props.min : null,
  max: timeRegexp.test(props.max || '') ? props.max : null,
}));
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
