<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, inject, unref } from 'vue';
import type { PluginOptions } from '../types/plugin';
import type {
  FieldValue,
  Maybe,
  FieldTransformer,
  FieldValidation,
} from '@lunar-forms/core';
import {
  max as maxValidator,
  min as minValidator,
  required as requiredValidator,
  toNumber,
  useField,
} from '@lunar-forms/core';
import { PLUGING_CONTEXT_KEY } from '../consts';
import { formatMessage } from '../utils';

defineOptions({
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
    min?: number;
    max?: number;
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

const options = inject<PluginOptions>(PLUGING_CONTEXT_KEY);

if (!options) throw new Error('Lunar Forms Fields plugin is not setted.');

const { theme } = options;

const id = `${props.name}-${crypto.randomUUID()}`;

const validations = computed(() => {
  let validation: FieldValidation[] = [];
  if (props.required)
    validation.push(
      requiredValidator(formatMessage(options.messages.required))
    );
  if (props.min)
    validation.push(
      minValidator(
        formatMessage(options.messages.number.max, {
          value: props.min.toString(),
        }),
        props.min
      )
    );
  if (props.max)
    validation.push(
      maxValidator(
        formatMessage(options.messages.number.max, {
          value: props.max.toString(),
        }),
        props.max
      )
    );
  if (props.validate) validation = validation.concat(unref(props.validate));
  return validation;
});

const transformers = computed(() => {
  let transformers = [toNumber()];
  if (props.transform)
    transformers = transformers.concat(unref(props.transform));
  return transformers;
});

const { valid, error, touched, fieldProps, value } = useField(props.name, {
  initialValue: props.initialValue,
  validate: validations,
  validateOn: props.validateOn,
  transform: transformers,
  onblur(ev) {
    emit('blur', ev);
  },
  onchange(ev) {
    emit('change', ev);
  },
  onfocus(ev) {
    emit('focus', ev);
  },
  oninput(ev) {
    // @ts-ignore
    emit('update:modelValue', ev.target?.value);
    emit('input', ev);
  },
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
      <label v-if="props.label" :class="theme.classes.label" :for="id">{{
        props.label
      }}</label>
      <div :class="theme.classes.inner">
        <div v-if="$slots.prefix" :class="theme.classes.prefix">
          <slot name="prefix"></slot>
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
          :class="options.theme.classes.input"
          v-model="value"
          v-bind="{ ...$attrs, ...fieldProps }"
        />
        <div v-if="$slots.suffix" :class="theme.classes.suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
    </div>
    <span v-if="props.help" :class="theme.classes.help">{{ props.help }}</span>
    <span v-if="error" :class="theme.classes.message">{{ error }}</span>
  </div>
</template>
