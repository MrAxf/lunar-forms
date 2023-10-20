<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts" generic="T extends FieldsetLabelValue">
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import { required as requiredValidator } from '@lunar-forms/core';
import { computed, unref } from 'vue';

import { useCommonField, usePluginOptions } from '@/composables';
import { createFieldsetContext } from '@/contexts';
import type {
  FieldCommonProps,
  FieldsetClassesProps,
  FieldsetLabelValue,
} from '@/types';
import { toFieldsetLabelValues } from '@/utils';

import { FieldsetInput } from '.';

defineOptions({
  name: 'CheckboxesField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldsetClassesProps & {
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        options?: string[] | T[];
      }
  >(),
  {
    // @ts-ignore
    initialValue: [],
    validateOn: 'change',
  }
);

defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'change', ev: Event): void;
}>();

defineSlots<{
  option(props: { option: T; idx: number }): any;
}>();

const {
  theme: {
    classes: {
      global,
      groups: { inputFieldset: groupClasses },
      fields: { checkboxes: fieldClasses },
    },
  },
  messages,
} = usePluginOptions();

const {
  id,
  fieldData,
  // @ts-ignore
} = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
  onblur: undefined,
  onfocus: undefined,
  oninput: undefined,
});

const { value, valid, touched, error, fieldProps, name } = fieldData;

const checkboxesOptions = computed<T[]>(() =>
  toFieldsetLabelValues(props.options)
);

createFieldsetContext(value, name, id, 'checkbox');
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
  >
    <fieldset
      :class="[
        global.fieldset,
        groupClasses.fieldset,
        fieldClasses.fieldset,
        props.classFieldset,
      ]"
    >
      <legend
        :class="[
          global.legend,
          groupClasses.legend,
          fieldClasses.legend,
          props.classLegend,
        ]"
        v-if="props.label"
      >
        {{ props.label }}
      </legend>
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
      <ul
        :class="[
          global.options,
          groupClasses.options,
          fieldClasses.options,
          props.classHelp,
        ]"
      >
        <li v-for="(opt, idx) in checkboxesOptions" :key="opt.label">
          <slot name="option" :option="opt" :idx="idx">
            <FieldsetInput
              :option="opt"
              :idx="idx"
              :class-help="props.classHelp"
              :class-inner="props.classInner"
              :class-input="[groupClasses.input, props.classInput]"
              :class-label="[groupClasses.label, props.classLabel]"
              :class-option="[groupClasses.option, props.classOption]"
              :class-prefix="[groupClasses.prefix, props.classPrefix]"
              :class-suffix="[groupClasses.suffix, props.classSuffix]"
              :class-wrapper="props.classWrapper"
              @change="fieldProps.change"
            />
          </slot>
        </li>
      </ul>
    </fieldset>
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
