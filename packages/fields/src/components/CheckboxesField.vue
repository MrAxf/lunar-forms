<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { computed, unref } from 'vue';
import type {
  FieldValue,
  FieldTransformer,
  FieldValidation,
  MaybeArray,
} from '@lunar-forms/core';
import { required as requiredValidator } from '@lunar-forms/core';
import { formatMessage } from '../utils';
import { toCheckboxesRadioLabelValues } from '../utils/checkboxesRadio';
import type { CheckboxesRadioOptions } from '../types';
import { useCommonField, usePluginOptions } from '../composables';

defineOptions({
  name: 'CheckboxesField',
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
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    options?: CheckboxesRadioOptions;
  }>(),
  {
    // @ts-ignore
    initialValue: [],
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'change', ev: Event): void;
}>();

defineSlots<{
  prefix(): any;
  suffix(): any;
}>();

const { theme, messages } = usePluginOptions();

const {
  id,
  fieldData: { value, valid, touched, error, fieldProps },
  // @ts-ignore
} = useCommonField(props, emit, {
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required)
      validation.push(requiredValidator(formatMessage(messages.required)));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
  refine: props.refine,
  validateOn: 'change',
  onblur: undefined,
  onfocus: undefined,
  oninput: undefined,
});

const checkboxesOptions = computed(() =>
  toCheckboxesRadioLabelValues(props.options)
);
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
    <fieldset :class="theme.classes.fieldset">
      <legend :class="theme.classes.legend" v-if="props.label">
        {{ props.label }}
      </legend>
      <span v-if="props.help" :class="theme.classes.help">{{
        props.help
      }}</span>
      <ul :class="theme.classes.options">
        <li
          v-for="(opt, idx) in checkboxesOptions"
          :class="theme.classes.option"
          :key="opt.label"
        >
          <div :class="theme.classes.wrapper">
            <div :class="theme.classes.inner">
              <div v-if="$slots.prefix" :class="theme.classes.prefix">
                <slot name="prefix"></slot>
              </div>
              <input
                type="checkbox"
                :name="`${name}[${idx}]`"
                :id="`${id}[${idx}]`"
                :class="theme.classes.input"
                :value="opt.value"
                v-model="value"
                @change="fieldProps.onchange"
                v-bind="opt.attrs"
              />
              <div v-if="$slots.suffix" :class="theme.classes.suffix">
                <slot name="suffix"></slot>
              </div>
            </div>
            <label :class="theme.classes.label" :for="`${id}[${idx}]`">{{
              opt.label
            }}</label>
          </div>
          <span :class="theme.classes.help" v-if="opt.help">{{
            opt.help
          }}</span>
        </li>
      </ul>
    </fieldset>
    <span v-if="error" :class="theme.classes.message">{{ error }}</span>
  </div>
</template>
../utils/checkboxesRadio
