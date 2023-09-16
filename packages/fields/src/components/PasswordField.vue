<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, inject, ref, unref } from 'vue';
import type { PluginOptions } from '../types/plugin';
import type {
  FieldValue,
  Maybe,
  FieldTransformer,
  FieldValidation,
} from '@lunar-forms/core';
import {
  maxLength,
  minLength,
  pattern as patterValidate,
  required as requiredValidator,
  useField,
  confirm as confirmValidator,
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
    showButton?: boolean;
    placeholder?: string;
    minLenght?: number;
    maxLenght?: number;
    confirm?: string;
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
  if (props.confirm)
    validation.push(
      confirmValidator(
        formatMessage(options.messages.password.confirm, {
          value: props.confirm,
        }),
        props.confirm
      )
    );
  if (props.minLenght)
    validation.push(
      minLength(
        formatMessage(options.messages.text.maxLenght, {
          value: props.minLenght.toString(),
        }),
        props.minLenght
      )
    );
  if (props.maxLenght)
    validation.push(
      maxLength(
        formatMessage(options.messages.text.maxLenght, {
          value: props.maxLenght.toString(),
        }),
        props.maxLenght
      )
    );
  if (props.pattern)
    validation.push(
      patterValidate(
        formatMessage(options.messages.text.pattern, {
          value: props.pattern.toString(),
        }),
        props.pattern
      )
    );
  if (props.validate) validation = validation.concat(unref(props.validate));
  return validation;
});

const { valid, error, touched, fieldProps, value } = useField(props.name, {
  initialValue: props.initialValue,
  validate: validations,
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

const inputType = ref('password');

function onShow() {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
}
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
    :data-input-btn="props.showButton ? true : null"
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
          :type="inputType"
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
          :value="value"
          v-bind="{ ...$attrs, ...fieldProps }"
        />
        <button
          v-if="props.showButton"
          type="button"
          v-html="
            inputType === 'password'
              ? options.theme.icons.visibilityOn
              : options.theme.icons.visibilityOff
          "
          :class="options.theme.classes['input-btn']"
          :title="
            inputType === 'password'
              ? options.messages.actions.setVisible
              : options.messages.actions.setNotVisible
          "
          @click="onShow"
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
