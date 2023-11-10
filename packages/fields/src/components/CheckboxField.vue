<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import { required as requiredValidator } from '@lunar-forms/core';
import { computed, ref, unref } from 'vue';

import { useCommonField, usePluginOptions } from '@/composables';
import type {
  FieldCommonClassesProps,
  FieldCommonProps,
  FieldCommonSlots,
} from '@/types';

defineOptions({
  name: 'CheckboxField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldCommonClassesProps & {
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        trueValue?: FieldValue;
        falseValue?: FieldValue;
      }
  >(),
  {
    validateOn: 'change',
    trueValue: true,
    falseValue: false,
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

defineSlots<FieldCommonSlots>();

const {
  theme: {
    icons,
    classes: {
      global,
      groups: { inputCheckable: groupClasses },
      fields: { checkbox: fieldClasses },
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
});

const { value, valid, touched, error, fieldProps } = fieldData;

const inputRef = ref<HTMLInputElement | null>(null);
</script>

<template>
  <div
    :class="[
      global.outer,
      groupClasses.outer,
      fieldClasses.outer,
      props.classOuter,
    ]"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-readonly="props.readonly ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-field="$options.name"
    :data-checked="inputRef?.checked ? true : null"
    :data-prefix="$slots.prefix ? true : null"
    :data-suffix="$slots.suffix ? true : null"
    :data-input-btn="props.clearButton ? true : null"
  >
    <label
      :class="[
        global.wrapper,
        groupClasses.wrapper,
        fieldClasses.wrapper,
        props.classWrapper,
      ]"
    >
      <div
        :class="[
          global.inner,
          groupClasses.inner,
          fieldClasses.inner,
          props.classInner,
        ]"
      >
        <div
          v-if="$slots.prefix"
          :class="[
            global.prefix,
            groupClasses.prefix,
            fieldClasses.prefix,
            props.classPrefix,
          ]"
        >
          <slot name="prefix" v-bind="fieldData"></slot>
        </div>
        <input
          ref="inputRef"
          type="checkbox"
          :name="name"
          :id="id"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :required="props.required"
          :class="[
            global.input,
            groupClasses.input,
            fieldClasses.input,
            props.classInput,
          ]"
          :true-value="props.trueValue"
          :false-value="props.falseValue"
          v-model="value"
          v-bind="{ ...$attrs, ...fieldProps }"
        />
        <div
          v-if="$slots.suffix"
          :class="[
            global.suffix,
            groupClasses.suffix,
            fieldClasses.suffix,
            props.classSuffix,
          ]"
        >
          <slot name="suffix" v-bind="fieldData"></slot>
        </div>
      </div>
      <span
        v-if="props.label"
        :class="[
          global.label,
          groupClasses.label,
          fieldClasses.label,
          props.classLabel,
        ]"
        >{{ props.label }}</span
      >
      <button
        v-if="props.clearButton"
        type="button"
        v-html="icons.clear"
        :class="[
          global['input-btn'],
          groupClasses['input-btn'],
          fieldClasses['input-btn'],
          props.classInputBtn,
        ]"
        :title="messages.actions.clear"
        @click="onClear"
      ></button>
    </label>
    <span
      v-if="props.help"
      :class="[
        global.help,
        groupClasses.help,
        fieldClasses.help,
        props.classHelp,
      ]"
      >{{ props.help }}</span
    >
    <span
      v-if="error"
      :class="[
        global.message,
        groupClasses.message,
        fieldClasses.message,
        props.classMessage,
      ]"
      >{{ error }}</span
    >
  </div>
</template>
