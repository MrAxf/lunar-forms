<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, inject, unref, ref } from 'vue';
import type { PluginOptions } from '../types/plugin';
import type {
  FieldValue,
  Maybe,
  FieldTransformer,
  FieldValidation,
} from '@lunar-forms/core';
import {
  required as requiredValidator,
  useField,
  accept as acceptValidator,
  maxSize as maxSizeValidator,
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
    accept?: string | string[];
    maxSize?: number;
    clearButton?: boolean;
  }>(),
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

  if (props.accept)
    validation.push(
      acceptValidator(formatMessage(options.messages.file.accept), props.accept)
    );

  if (props.maxSize)
    validation.push(
      maxSizeValidator(
        formatMessage(options.messages.file.maxSize, {
          value: props.maxSize.toString(),
        }),
        props.maxSize
      )
    );

  if (props.validate) validation = validation.concat(unref(props.validate));
  return validation;
});

const { valid, error, touched, fieldProps, value, validate } = useField(
  props.name,
  {
    initialValue: props.initialValue,
    validate: validations,
    validateOn: props.validateOn,
    transform: props.transform,
    onblur(ev) {
      emit('blur', ev);
    },
    onchange(ev) {
      const files = (ev.target as HTMLInputElement).files;
      if (!files || files.length === 0) value.value = undefined;

      const fileArray = Array.from(files as FileList);
      if (fileArray.length === 1) value.value = fileArray[0];
      else value.value = fileArray;
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
  }
);

const input = ref<HTMLInputElement | null>(null);

const acceptString = computed<Maybe<string>>(() => {
  if (!props.accept) return undefined;
  if (Array.isArray(props.accept)) {
    if (props.accept.length === 0) return undefined;
    return props.accept.join(',');
  }
  return props.accept;
});

function onClear() {
  value.value = undefined;
  if (input.value) input.value.value = '';
  validate();
  emit('update:modelValue', value.value);
}
</script>

<template>
  <div
    :class="theme.classes.outer"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-input-btn="props.clearButton ? true : null"
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
          ref="input"
          type="file"
          :name="name"
          :id="id"
          :disabled="props.disabled"
          :required="props.required"
          :class="options.theme.classes.input"
          :accept="acceptString"
          v-bind="{ ...$attrs, ...fieldProps }"
        />
        <button
          v-if="props.clearButton"
          type="button"
          v-html="options.theme.icons.clear"
          :class="options.theme.classes['input-btn']"
          :title="options.messages.actions.clear"
          @click="onClear"
        ></button>
        <div v-if="$slots.suffix" :class="theme.classes.suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
    </div>
    <span v-if="props.help" :class="theme.classes.help">{{ props.help }}</span>
    <span v-if="error" :class="theme.classes.message">{{ error }}</span>
  </div>
</template>
