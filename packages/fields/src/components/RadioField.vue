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
  name: 'RadioField',
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
    validateOn: 'change',
  }
);

defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'change', ev: Event): void;
}>();

defineSlots<{ option(props: { option: T; idx: number }): any }>();

const { theme, messages } = usePluginOptions();

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

createFieldsetContext(value, name, id, 'radio');
</script>

<template>
  <div
    :class="[theme.classes.outer, props.classOuter]"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-readonly="props.readonly ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-field="$options.name"
  >
    <fieldset :class="[theme.classes.fieldset, props.classFieldset]">
      <legend
        :class="[theme.classes.legend, props.classLegend]"
        v-if="props.label"
      >
        {{ props.label }}
      </legend>
      <span v-if="props.help" :class="[theme.classes.help, props.classHelp]">{{
        props.help
      }}</span>
      <ul :class="[theme.classes.options, props.classOptions]">
        <li v-for="(opt, idx) in checkboxesOptions" :key="opt.label">
          <slot name="option" :option="opt" :idx="idx">
            <FieldsetInput
              :option="opt"
              :idx="idx"
              :class-help="props.classHelp"
              :class-inner="props.classInner"
              :class-input="props.classInput"
              :class-label="props.classLabel"
              :class-option="props.classOption"
              :class-prefix="props.classPrefix"
              :class-suffix="props.classSuffix"
              :class-wrapper="props.classWrapper"
              @change="fieldProps.change"
            />
          </slot>
        </li>
      </ul>
    </fieldset>
    <span v-if="error" :class="[theme.classes.message, props.classMessage]">{{
      error
    }}</span>
  </div>
</template>
