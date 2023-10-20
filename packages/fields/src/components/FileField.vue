<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue, Maybe } from '@lunar-forms/core';
import {
  accept as acceptValidator,
  maxSize as maxSizeValidator,
  required as requiredValidator,
} from '@lunar-forms/core';
import type { HTMLAttributes } from 'vue';
import { computed, ref, unref } from 'vue';

import { useCommonField, usePluginOptions } from '@/composables';
import type {
  FieldCommonClassesProps,
  FieldCommonProps,
  FieldCommonSlots,
} from '@/types';

import FieldWrapper from './FieldWrapper.vue';

defineOptions({
  name: 'FileField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldCommonClassesProps & {
        classInputBtn?: HTMLAttributes['class'];
        required?: boolean;
        disabled?: boolean;
        accept?: string | string[];
        maxSize?: number;
        clearButton?: boolean;
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

defineSlots<FieldCommonSlots>();

const {
  theme: {
    icons,
    classes: {
      global,
      fields: { file: fieldClasses },
    },
  },
  messages,
} = usePluginOptions();

const { id, fieldData, onClear } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));

    if (props.accept)
      validation.push(acceptValidator(messages.file.accept, props.accept));

    if (props.maxSize)
      validation.push(maxSizeValidator(messages.file.maxSize, props.maxSize));

    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
  onchange(ev) {
    const files = (ev.target as HTMLInputElement).files;
    if (!files || files.length === 0) value.value = undefined;

    const fileArray = Array.from(files as FileList);
    if (fileArray.length === 1) value.value = fileArray[0];
    else value.value = fileArray;
    emit('change', ev);
  },
});

const { value, valid, touched, error, fieldProps } = fieldData;

const input = ref<HTMLInputElement | null>(null);

const acceptString = computed<Maybe<string>>(() => {
  if (!props.accept) return undefined;
  if (Array.isArray(props.accept)) {
    if (props.accept.length === 0) return undefined;
    return props.accept.join(',');
  }
  return props.accept;
});
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
    :data-input-btn="props.clearButton ? true : null"
    :data-field="$options.name"
  >
    <div
      v-if="$slots.prefix"
      :class="[global.prefix, fieldClasses.prefix, props.classPrefix]"
    >
      <slot name="prefix" v-bind="fieldData"></slot>
    </div>
    <input
      ref="input"
      type="file"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :required="props.required"
      :class="[global.input, fieldClasses.input, props.classInput]"
      :accept="acceptString"
      v-bind="{ ...$attrs, ...fieldProps }"
    />
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
