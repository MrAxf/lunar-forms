<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts" generic="T extends SelectLabelValue">
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/vue';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import type { FieldValidation, FieldValue } from '@lunar-forms/core';
import { required as requiredValidator } from '@lunar-forms/core';
import type {
  FieldCommonClassesProps,
  FieldCommonProps,
  FieldCommonSlots,
  PluginOptions,
} from '@lunar-forms/fields';
import { useCommonField, usePluginOptions } from '@lunar-forms/fields';
import type { MaybeElement } from '@vueuse/core';
import { type HTMLAttributes, computed, ref, unref } from 'vue';

import type { LunarPopoverFieldsOptions, SelectLabelValue } from '@/types';
import { toSelectLabelValues } from '@/utils';

defineOptions({
  name: 'SelectField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps &
      FieldCommonClassesProps & {
        classInputIcon?: HTMLAttributes['class'];
        classOptions?: HTMLAttributes['class'];
        classOption?: HTMLAttributes['class'];
        required?: boolean;
        disabled?: boolean;
        placeholder?: string;
        options?: string[] | T[];
      }
  >(),
  {
    validateOn: 'change',
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
  messages,
  theme: {
    icons,
    classes: {
      global,
      fields: { selectMenu: fieldClasses },
      groups: { inputSelect: groupClasess },
    },
  },
} = usePluginOptions<LunarPopoverFieldsOptions & PluginOptions>();

const { fieldData } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const { value, error, valid, touched } = fieldData;

const selectOptions = computed(() => toSelectLabelValues(props.options));

const reference = ref<MaybeElement>(null);
const floating = ref<any>(null);

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom',
  middleware: [flip(), offset(10)],
  whileElementsMounted: autoUpdate,
});
</script>

<template>
  <div
    :class="[
      global.outer,
      groupClasess.outer,
      fieldClasses.outer,
      props.classOuter,
    ]"
    :data-required="props.required ? true : null"
    :data-disabled="props.disabled ? true : null"
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-prefix="$slots.prefix ? true : null"
    :data-suffix="$slots.suffix ? true : null"
    :data-field="$options.name"
    data-input-icon="true"
  >
    <Listbox
      v-model="value"
      v-slot="{ open, value: slotVal }"
      as="div"
      :class="[
        global.wrapper,
        groupClasess.wrapper,
        fieldClasses.wrapper,
        props.classWrapper,
      ]"
    >
      <ListboxLabel
        v-if="props.label"
        :class="[
          global.label,
          groupClasess.label,
          fieldClasses.label,
          props.classLabel,
        ]"
        >{{ props.label }}</ListboxLabel
      >
      <div
        :class="[
          global.inner,
          groupClasess.inner,
          fieldClasses.inner,
          props.classInner,
        ]"
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
        <ListboxButton
          ref="reference"
          :class="[
            global.input,
            groupClasess.input,
            fieldClasses.input,
            props.classInput,
          ]"
          >{{ slotVal ?? props.placeholder }}</ListboxButton
        >
        <div
          v-html="icons.select"
          :class="[
            global['input-icon'],
            groupClasess['input-icon'],
            fieldClasses['input-icon'],
            props.classInputIcon,
          ]"
        ></div>
        <div
          v-if="$slots.suffix"
          :class="[
            global.suffix,
            groupClasess.prefix,
            fieldClasses.suffix,
            props.classSuffix,
          ]"
        >
          <slot name="suffix" v-bind="fieldData"></slot>
        </div>
        <div
          v-if="open"
          ref="floating"
          :style="floatingStyles"
          :class="[
            global.options,
            groupClasess.options,
            fieldClasses.options,
            props.classOptions,
          ]"
        >
          <ListboxOptions>
            <ListboxOption
              v-for="option in selectOptions"
              v-slot="{ active, selected }"
              :key="option.label"
              :value="option.value"
              as="template"
            >
              <li
                :class="[
                  global.option,
                  groupClasess.option,
                  fieldClasses.option,
                  props.classOption,
                  {
                    active,
                    selected,
                  },
                ]"
              >
                {{ option.label }}
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
    <span
      v-if="props.help"
      :class="[
        global.help,
        groupClasess.help,
        fieldClasses.help,
        props.classHelp,
      ]"
      >{{ props.help }}
    </span>
    <span
      v-if="error"
      :class="[
        global.message,
        groupClasess.message,
        fieldClasses.message,
        props.classMessage,
      ]"
      >{{ error }}</span
    >
  </div>
</template>
