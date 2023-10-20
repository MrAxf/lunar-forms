<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import {
  confirm as confirmValidator,
  maxLength as maxLengthValidator,
  minLength as minLengthValidator,
  pattern as patterValidate,
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
  name: 'PasswordField',
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
        showButton?: boolean;
        placeholder?: string;
        minLength?: number;
        maxLength?: number;
        confirm?: string;
        pattern?: RegExp;
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
      fields: { password: fieldClasses },
    },
  },
  messages,
} = usePluginOptions();

const { id, fieldData } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.confirm)
      validation.push(
        confirmValidator(messages.password.confirm, props.confirm)
      );
    if (props.minLength)
      validation.push(
        minLengthValidator(messages.text.minLength, props.minLength)
      );
    if (props.maxLength)
      validation.push(
        maxLengthValidator(messages.text.maxLength, props.maxLength)
      );
    if (props.pattern)
      validation.push(patterValidate(messages.text.pattern, props.pattern));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const { value, valid, touched, error, fieldProps } = fieldData;

const inputType = ref('password');

function onShow() {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
}
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
    :data-input-btn="props.showButton ? true : null"
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
    <input
      :type="inputType"
      :name="name"
      :id="id"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      :minlength="props.minLength"
      :maxlength="props.maxLength"
      :pattern="props.pattern?.toString()"
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
      v-if="props.showButton"
      type="button"
      v-html="
        inputType === 'password' ? icons.visibilityOn : icons.visibilityOff
      "
      :class="[
        global['input-btn'],
        groupClasess['input-btn'],
        fieldClasses['input-btn'],
        props.classInputBtn,
      ]"
      :title="
        inputType === 'password'
          ? messages.actions.setVisible
          : messages.actions.setNotVisible
      "
      @click="onShow"
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
