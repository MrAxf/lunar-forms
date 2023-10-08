<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, unref, ref } from 'vue';
import type {
  FieldValue,
  Maybe,
  FieldTransformer,
  FieldValidation,
  MaybeArray,
} from '@lunar-forms/core';
import {
  required as requiredValidator,
  accept as acceptValidator,
  maxSize as maxSizeValidator,
} from '@lunar-forms/core';
import { formatMessage } from '../utils';
import { useCommonField, usePluginOptions } from '../composables';
import FieldWrapper from './FieldWrapper.vue';

defineOptions({
  name: 'FileField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    help?: string;
    modelValue?: FieldValue;
    initialValue?: FieldValue;
    transform?: MaybeArray<FieldTransformer>;
    refine?: MaybeArray<FieldTransformer>;
    validate?: MaybeArray<FieldValidation>;
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

defineSlots<{
  prefix(): any;
  suffix(): any;
}>();

const { theme, messages } = usePluginOptions();

const {
  id,
  fieldData: { value, valid, touched, error, fieldProps },
  onClear,
} = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required)
      validation.push(requiredValidator(formatMessage(messages.required)));

    if (props.accept)
      validation.push(
        acceptValidator(formatMessage(messages.file.accept), props.accept)
      );

    if (props.maxSize)
      validation.push(
        maxSizeValidator(
          formatMessage(messages.file.maxSize, {
            value: props.maxSize.toString(),
          }),
          props.maxSize
        )
      );

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
    :data-input-btn="props.clearButton ? true : null"
    :data-field="$options.name"
  >
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
      :class="theme.classes.input"
      :accept="acceptString"
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
