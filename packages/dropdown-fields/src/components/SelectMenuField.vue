<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts" generic="T extends SelectLabelValue">
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
import type { HTMLAttributes } from 'vue';
import { computed, normalizeClass, toRef, unref } from 'vue';

import type {
  InputSelectCommonProps,
  LunarDropdownFieldsOptions,
  SelectLabelValue,
} from '@/types';
import { changeEvent, toSelectLabelValues } from '@/utils';

import { useInputSelectField } from '..';

defineOptions({
  name: 'SelectMenuField',
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    FieldCommonProps & FieldCommonClassesProps & InputSelectCommonProps<T>
  >(),
  {
    validateOn: 'change',
    multiple: false,
  }
);

defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'change', ev: Event): void;
}>();

defineSlots<
  FieldCommonSlots & {
    option(props: {
      option: T;
      class: HTMLAttributes['class'];
      active?: boolean;
      selected?: boolean;
    }): any;
  }
>();

defineExpose({
  reset: resetOptions,
});

const {
  messages,
  theme: {
    icons,
    classes: {
      global,
      fields: { selectMenu: fieldClasses },
      groups: { inputSelect: groupClasses },
    },
  },
} = usePluginOptions<LunarDropdownFieldsOptions & PluginOptions>();

const { fieldData, onClear } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
  initialValue: computed(() =>
    props.multiple ? props.initialValue ?? [] : props.initialValue
  ),
  onblur: undefined,
  onfocus: undefined,
  oninput: undefined,
});

const { value, error, valid, touched, fieldProps } = fieldData;

const {
  isLoading,
  isMore,

  selectOptions,

  reference,
  floating,
  ioRoot,
  ioTarget,

  selectedOption,

  floatingStyles,

  reset,
} = useInputSelectField<T>({
  isMultiple: toRef(props, 'multiple'),
  placeholder: toRef(props, 'placeholder'),
  loadOption: toRef(props, 'loadOption'),
  value,
  async parseOptions({ hasMore, page, signal }) {
    return await toSelectLabelValues<T>(props.options)({
      page,
      hasMore,
      signal,
    });
  },
});

function resetOptions() {
  reset();
}
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
    :data-valid="valid ? true : null"
    :data-error="error ? true : null"
    :data-touched="touched ? true : null"
    :data-prefix="$slots.prefix ? true : null"
    :data-suffix="$slots.suffix ? true : null"
    :data-input-btn="props.clearButton ? true : null"
    :data-field="$options.name"
    :data-loading="isLoading ? true : null"
    data-input-icon="true"
  >
    <Listbox
      :model-value="value"
      @update:model-value="
        (newVal) => {
          value = newVal;
          fieldProps.onchange(changeEvent);
        }
      "
      v-slot="{ open }"
      as="div"
      :class="[
        global.wrapper,
        groupClasses.wrapper,
        fieldClasses.wrapper,
        props.classWrapper,
      ]"
      :multiple="props.multiple"
      :disabled="props.disabled"
    >
      <ListboxLabel
        v-if="props.label"
        :class="[
          global.label,
          groupClasses.label,
          fieldClasses.label,
          props.classLabel,
        ]"
        >{{ props.label }}</ListboxLabel
      >
      <div
        ref="reference"
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
        <ListboxButton
          @blur="fieldProps.onblur"
          @focus="fieldProps.onfocus"
          :class="[
            global.input,
            groupClasses.input,
            fieldClasses.input,
            props.classInput,
          ]"
        >
          <div
            :class="[
              global['input-content'],
              groupClasses['input-content'],
              fieldClasses['input-content'],
              props.classInputContent,
            ]"
          >
            <slot
              name="option"
              v-if="
                !props.multiple &&
                selectedOption &&
                !Array.isArray(selectedOption) &&
                typeof selectedOption !== 'string'
              "
              :option="selectedOption"
              :class="[
                global['option-content'],
                groupClasses['option-content'],
                fieldClasses['option-content'],
                props.classOptionContent,
              ]"
            >
              <span>{{ selectedOption.label }}</span>
            </slot>
            <template
              v-else-if="
                props.multiple &&
                selectedOption &&
                Array.isArray(selectedOption) &&
                selectedOption.length > 0 &&
                typeof selectedOption !== 'string'
              "
            >
              <span v-for="(option, idx) in selectedOption" :key="option.label"
                >{{ option.label
                }}<span v-if="selectedOption.length - 1 !== idx">,&nbsp;</span
                ><span
                  v-else-if="
                    Array.isArray(value) && selectedOption.length < value.length
                  "
                  >...</span
                ></span
              >
            </template>
            <span v-else>{{ selectedOption }}</span>
          </div>
          <span
            v-if="isLoading"
            :class="[
              global['input-loading'],
              groupClasses['input-loading'],
              fieldClasses['input-loading'],
              props.classInputLoading,
            ]"
          ></span>
          <span
            v-if="props.multiple && Array.isArray(value) && value.length > 1"
            :class="[
              global['input-count'],
              groupClasses['input-count'],
              fieldClasses['input-count'],
              props.classInputCount,
            ]"
            >{{ value.length }}</span
          >
          <div
            v-html="icons.select"
            :class="[
              global['input-icon'],
              groupClasses['input-icon'],
              fieldClasses['input-icon'],
              props.classInputIcon,
            ]"
          ></div>
        </ListboxButton>
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
        <div
          v-if="$slots.suffix"
          :class="[
            global.suffix,
            groupClasses.prefix,
            fieldClasses.suffix,
            props.classSuffix,
          ]"
        >
          <slot name="suffix" v-bind="fieldData"></slot>
        </div>
      </div>
      <Transition
        :enter-active-class="
          normalizeClass([
            global['dropdown-enter-active'],
            groupClasses['dropdown-enter-active'],
            fieldClasses['dropdown-enter-active'],
            props.classDropdownEnterActive,
          ])
        "
        :enter-from-class="
          normalizeClass([
            global['dropdown-enter-from'],
            groupClasses['dropdown-enter-from'],
            fieldClasses['dropdown-enter-from'],
            props.classDropdownEnterFrom,
          ])
        "
        :enter-to-class="
          normalizeClass([
            global['dropdown-enter-to'],
            groupClasses['dropdown-enter-to'],
            fieldClasses['dropdown-enter-to'],
            props.classDropdownEnterTo,
          ])
        "
        :leave-active-class="
          normalizeClass([
            global['dropdown-leave-active'],
            groupClasses['dropdown-leave-active'],
            fieldClasses['dropdown-leave-active'],
            props.classDropdownLeaveActive,
          ])
        "
        :leave-from-class="
          normalizeClass([
            global['dropdown-leave-from'],
            groupClasses['dropdown-leave-from'],
            fieldClasses['dropdown-leave-from'],
            props.classDropdownLeaveFrom,
          ])
        "
        :leave-to-class="
          normalizeClass([
            global['dropdown-leave-to'],
            groupClasses['dropdown-leave-to'],
            fieldClasses['dropdown-leave-to'],
            props.classDropdownLeaveTo,
          ])
        "
      >
        <div
          v-if="open"
          ref="floating"
          :style="floatingStyles"
          :class="[
            global['dropdown-wrapper'],
            groupClasses['dropdown-wrapper'],
            fieldClasses['dropdown-wrapper'],
            props.classDropdownWrapper,
          ]"
        >
          <div
            ref="ioRoot"
            :class="[
              global['dropdown-content'],
              groupClasses['dropdown-content'],
              fieldClasses['dropdown-content'],
              props.classDropdownContent,
            ]"
          >
            <ListboxOptions
              as="ul"
              :class="[
                global.options,
                groupClasses.options,
                fieldClasses.options,
                props.classOptions,
              ]"
            >
              <ListboxOption
                v-for="option in selectOptions"
                v-slot="{ active, selected }"
                :key="option.label"
                :value="option.value"
                as="template"
                :disabled="option.attrs?.disabled ? true : false"
              >
                <!-- @vue-ignore -->
                <li
                  :class="[
                    global.option,
                    groupClasses.option,
                    fieldClasses.option,
                    props.classOption,
                    {
                      active,
                      selected,
                    },
                  ]"
                >
                  <div
                    :class="[
                      global['option-selected-icon'],
                      groupClasses['option-selected-icon'],
                      fieldClasses['option-selected-icon'],
                      props.classOptionSelectedicon,
                    ]"
                  >
                    <div v-if="selected" v-html="icons.optionSelected"></div>
                  </div>
                  <!-- @vue-ignore -->
                  <slot
                    name="option"
                    :option="option"
                    :active="active"
                    :selected="selected"
                    :class="[
                      global['option-content'],
                      groupClasses['option-content'],
                      fieldClasses['option-content'],
                      props.classOptionContent,
                    ]"
                  >
                    <span
                      :class="[
                        global['option-content'],
                        groupClasses['option-content'],
                        fieldClasses['option-content'],
                        props.classOptionContent,
                      ]"
                      :title="option.label"
                      >{{ option.label }}</span
                    >
                  </slot>
                </li>
              </ListboxOption>
            </ListboxOptions>
            <div
              v-if="isLoading"
              :class="[
                global['option-loading'],
                groupClasses['option-loading'],
                fieldClasses['option-loading'],
                props.classOptionLoading,
              ]"
            >
              <span
                :class="[
                  global['option-loading-loader'],
                  groupClasses['option-loading-loader'],
                  fieldClasses['option-loading-loader'],
                  props.classOptionLoadingLoader,
                ]"
              ></span>
            </div>
            <div
              v-if="!isLoading && isMore"
              ref="ioTarget"
              :class="[
                global['option-loading'],
                groupClasses['option-loading'],
                fieldClasses['option-loading'],
                props.classOptionLoading,
              ]"
            >
              <span
                :class="[
                  global['option-loading-loader'],
                  groupClasses['option-loading-loader'],
                  fieldClasses['option-loading-loader'],
                  props.classOptionLoadingLoader,
                ]"
              ></span>
            </div>
            <div
              v-if="!isLoading && selectOptions.length === 0"
              :class="[
                global['dropdown-message'],
                groupClasses['dropdown-message'],
                fieldClasses['dropdown-message'],
                props.classDropdownMessage,
              ]"
            >
              <span>{{ messages.notFoundResults }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Listbox>
    <span
      v-if="props.help"
      :class="[
        global.help,
        groupClasses.help,
        fieldClasses.help,
        props.classHelp,
      ]"
      >{{ props.help }}
    </span>
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
