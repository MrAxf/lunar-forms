<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { inject } from 'vue';
import type { PluginOptions } from '../types/plugin';
import type {
  FieldValue,
  Maybe,
  FieldTransformer,
  FieldValidation,
} from '@lunar-forms/core';
import { useField } from '@lunar-forms/core';
import { PLUGING_CONTEXT_KEY } from '../consts';

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
    placeholder?: string;
    minLenght?: number;
    maxLenght?: number;
    pattern?: RegExp;
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

const fieldData = useField(props.name, {
  initialValue: props.initialValue,
  validate: props.validate,
  validateOn: props.validateOn,
  transform: props.transform,
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

const options = inject<PluginOptions>(PLUGING_CONTEXT_KEY);

if (!options) throw new Error('Lunar Forms Fields plugin is not setted.');

const { theme } = options;

const id = `${props.name}-${crypto.randomUUID()}`;
</script>

<template>
  <div
    :class="theme.classes.outer"
    :data-required="props.required"
    :data-disabled="props.disabled"
    :data-readonly="props.readonly"
    :data-valid="fieldData.valid.value"
    :data-error="fieldData.error.value"
    :data-touched="fieldData.touched.value"
  >
    <div :class="theme.classes.wrapper">
      <label v-if="props.label" :class="theme.classes.label" :for="id">{{
        props.label
      }}</label>
      <div :class="theme.classes.inner">
        <div :class="theme.classes.prefix"></div>
        <input
          type="text"
          :name="name"
          :id="id"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :required="props.required"
          :placeholder="props.placeholder"
          :minlength="props.minLenght"
          :maxlength="props.maxLenght"
          :pattern="props.pattern?.toString()"
          :class="options.theme.classes.input"
          v-bind="{ ...$attrs, ...fieldData.fieldProps }"
        />
        <div :class="theme.classes.suffix"></div>
      </div>
    </div>
    <span v-if="props.help" :class="theme.classes.help">{{ props.help }}</span>
    <span :class="theme.classes.message"></span>
  </div>
</template>
