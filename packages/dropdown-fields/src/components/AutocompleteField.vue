<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts" generic="T extends SelectLabelValue">
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
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
import {
  type MaybeElement,
  computedAsync,
  useDebounce,
  useIntersectionObserver,
} from '@vueuse/core';
import type { HTMLAttributes } from 'vue';
import { computed, normalizeClass, onMounted, ref, unref, watch } from 'vue';

import { GetDataAbortedError } from '@/errors';
import type {
  LunarDropdownFieldsOptions,
  SelectLabelValue,
  SelectLabelValueAsync,
} from '@/types';
import { changeEvent, toAutocompleteLabelValues } from '@/utils';

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
        classDropdownWrapper?: HTMLAttributes['class'];
        classOptionSelectedicon?: HTMLAttributes['class'];
        classOptionContent?: HTMLAttributes['class'];
        classOptionLoading?: HTMLAttributes['class'];
        classOptionLoadingLoader?: HTMLAttributes['class'];
        classDropdownContent?: HTMLAttributes['class'];
        classInputContent?: HTMLAttributes['class'];
        classInputCount?: HTMLAttributes['class'];
        classInputLoading?: HTMLAttributes['class'];
        classDropdownEnterActive?: HTMLAttributes['class'];
        classDropdownEnterFrom?: HTMLAttributes['class'];
        classDropdownEnterTo?: HTMLAttributes['class'];
        classDropdownLeaveActive?: HTMLAttributes['class'];
        classDropdownLeaveFrom?: HTMLAttributes['class'];
        classDropdownLeaveTo?: HTMLAttributes['class'];
        classSearchInput?: HTMLAttributes['class'];
        classDropdownMessage?: HTMLAttributes['class'];
        required?: boolean;
        disabled?: boolean;
        multiple?: boolean;
        placeholder?: string;
        searchPlaceholder?: string;
        debounce?: number;
        minSearchLength?: number;
        options: string[] | T[] | SelectLabelValueAsync<T>;
        loadOption?: (value: FieldValue) => Promise<T>;
      }
  >(),
  {
    validateOn: 'change',
    multiple: false,
    debounce: 300,
    minSearchLength: 0,
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
  reset,
});

const {
  messages,
  theme: {
    icons,
    classes: {
      global,
      fields: { autocomplete: fieldClasses },
      groups: { inputSelect: groupClasess },
    },
  },
} = usePluginOptions<LunarDropdownFieldsOptions & PluginOptions>();

const { fieldData } = useCommonField({
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

const isLoading = ref(false);
const isMore = ref(false);
const currentpage = ref(1);

const searchText = ref('');
const debouncedSearchText = useDebounce(searchText, props.debounce);

const selectOptions = ref<T[]>([]);

const reference = ref<MaybeElement>(null);
const floating = ref<any>(null);
const ioRoot = ref<MaybeElement>(null);
const ioTarget = ref<MaybeElement>(null);

const labelCache = new Map<FieldValue, T>();

let getDataAbortController = new AbortController();

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom',
  middleware: [flip(), offset(10), shift()],
  whileElementsMounted: autoUpdate,
});

useIntersectionObserver(
  ioTarget,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isMore.value = false;
      try {
        getData();
      } catch (error) {
        if (error instanceof GetDataAbortedError) return;
        console.error(error);
      }
    }
  },
  {
    root: ioRoot,
  }
);

const selectedOption = computedAsync(async () => {
  if (!props.multiple && value.value) {
    return await getOption(value.value);
  } else if (
    props.multiple &&
    Array.isArray(value.value) &&
    value.value.length > 0
  ) {
    return await Promise.all(
      value.value.slice(0, 3).map((item: FieldValue) => getOption(item))
    );
  }
  return props.placeholder;
}, props.placeholder);

async function getOption(value: FieldValue) {
  if (labelCache.has(value)) {
    return labelCache.get(value) as T;
  }
  const option = props.loadOption
    ? await props.loadOption(value)
    : selectOptions.value.find((item) => item.value === value);
  if (!option) {
    return { value: value, label: 'Elemento no encontrado' } as T;
  }
  // @ts-ignore
  labelCache.set(value, option);
  return option as T;
}

function hasMore() {
  isMore.value = true;
  currentpage.value++;
}

function getData() {
  getDataAbortController.abort();
  getDataAbortController = new AbortController();

  const signal = getDataAbortController.signal;
  return new Promise<void>((resolve, reject) => {
    const abortError = new GetDataAbortedError('Get data aborted');

    if (signal.aborted) reject(abortError);

    signal.addEventListener('abort', () => {
      reject(abortError);
    });

    (async () => {
      isLoading.value = true;
      try {
        const data = await toAutocompleteLabelValues<T>(props.options)({
          page: currentpage.value,
          hasMore,
          search: debouncedSearchText.value,
          signal,
        });

        data.forEach((item) => {
          labelCache.set(item.value, item);
        });

        // @ts-ignore
        selectOptions.value = selectOptions.value.concat(data);
        isLoading.value = false;
        resolve();
      } catch (error) {
        isLoading.value = false;
        console.error(error);
        reject(error);
      }
    })();
  });
}

function reset() {
  selectOptions.value = [];
  currentpage.value = 1;
  isMore.value = false;

  if (debouncedSearchText.value.length < props.minSearchLength) {
    getDataAbortController.abort();
    getDataAbortController = new AbortController();
    return;
  }
  try {
    getData();
  } catch (error) {
    if (error instanceof GetDataAbortedError) return;
    console.error(error);
  }
}

watch(debouncedSearchText, () => {
  reset();
});

onMounted(() => {
  reset();
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
    :data-loading="isLoading ? true : null"
    data-input-icon="true"
  >
    <Combobox
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
        groupClasess.wrapper,
        fieldClasses.wrapper,
        props.classWrapper,
      ]"
      :multiple="props.multiple"
      :disabled="props.disabled"
    >
      <ComboboxLabel
        v-if="props.label"
        :class="[
          global.label,
          groupClasess.label,
          fieldClasses.label,
          props.classLabel,
        ]"
        >{{ props.label }}</ComboboxLabel
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
        <ComboboxButton
          ref="reference"
          @blur="fieldProps.onblur"
          @focus="fieldProps.onfocus"
          :class="[
            global.input,
            groupClasess.input,
            fieldClasses.input,
            props.classInput,
          ]"
        >
          <div
            :class="[
              global['input-content'],
              groupClasess['input-content'],
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
                groupClasess['option-content'],
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
              groupClasess['input-loading'],
              fieldClasses['input-loading'],
              props.classInputLoading,
            ]"
          ></span>
          <span
            v-if="props.multiple && Array.isArray(value) && value.length > 1"
            :class="[
              global['input-count'],
              groupClasess['input-count'],
              fieldClasses['input-count'],
              props.classInputCount,
            ]"
            >{{ value.length }}</span
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
        </ComboboxButton>

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
        <Transition
          :enter-active-class="
            normalizeClass([
              global['dropdown-enter-active'],
              groupClasess['dropdown-enter-active'],
              fieldClasses['dropdown-enter-active'],
              props.classDropdownEnterActive,
            ])
          "
          :enter-from-class="
            normalizeClass([
              global['dropdown-enter-from'],
              groupClasess['dropdown-enter-from'],
              fieldClasses['dropdown-enter-from'],
              props.classDropdownEnterFrom,
            ])
          "
          :enter-to-class="
            normalizeClass([
              global['dropdown-enter-to'],
              groupClasess['dropdown-enter-to'],
              fieldClasses['dropdown-enter-to'],
              props.classDropdownEnterTo,
            ])
          "
          :leave-active-class="
            normalizeClass([
              global['dropdown-leave-active'],
              groupClasess['dropdown-leave-active'],
              fieldClasses['dropdown-leave-active'],
              props.classDropdownLeaveActive,
            ])
          "
          :leave-from-class="
            normalizeClass([
              global['dropdown-leave-from'],
              groupClasess['dropdown-leave-from'],
              fieldClasses['dropdown-leave-from'],
              props.classDropdownLeaveFrom,
            ])
          "
          :leave-to-class="
            normalizeClass([
              global['dropdown-leave-to'],
              groupClasess['dropdown-leave-to'],
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
              groupClasess['dropdown-wrapper'],
              fieldClasses['dropdown-wrapper'],
              props.classDropdownWrapper,
            ]"
          >
            <ComboboxInput
              name="search"
              :class="[
                global['search-input'],
                fieldClasses['search-input'],
                props.classSearchInput,
              ]"
              :display-value="() => searchText"
              :placeholder="props.searchPlaceholder"
              autofocus
              autocomplete="off"
              @change="searchText = $event.target.value"
            />
            <div
              ref="ioRoot"
              :class="[
                global['dropdown-content'],
                groupClasess['dropdown-content'],
                fieldClasses['dropdown-content'],
                props.classDropdownContent,
              ]"
            >
              <ComboboxOptions
                as="ul"
                :class="[
                  global.options,
                  groupClasess.options,
                  fieldClasses.options,
                  props.classOptions,
                ]"
              >
                <ComboboxOption
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
                      groupClasess.option,
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
                        groupClasess['option-selected-icon'],
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
                        groupClasess['option-content'],
                        fieldClasses['option-content'],
                        props.classOptionContent,
                      ]"
                    >
                      <span
                        :class="[
                          global['option-content'],
                          groupClasess['option-content'],
                          fieldClasses['option-content'],
                          props.classOptionContent,
                        ]"
                        :title="option.label"
                        >{{ option.label }}</span
                      >
                    </slot>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
              <div
                v-if="isLoading"
                :class="[
                  global['option-loading'],
                  groupClasess['option-loading'],
                  fieldClasses['option-loading'],
                  props.classOptionLoading,
                ]"
              >
                <span
                  :class="[
                    global['option-loading-loader'],
                    groupClasess['option-loading-loader'],
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
                  groupClasess['option-loading'],
                  fieldClasses['option-loading'],
                  props.classOptionLoading,
                ]"
              >
                <span
                  :class="[
                    global['option-loading-loader'],
                    groupClasess['option-loading-loader'],
                    fieldClasses['option-loading-loader'],
                    props.classOptionLoadingLoader,
                  ]"
                ></span>
              </div>
              <div
                v-if="
                  !isLoading &&
                  selectOptions.length === 0 &&
                  debouncedSearchText.length >= props.minSearchLength
                "
                :class="[
                  global['dropdown-message'],
                  groupClasess['dropdown-message'],
                  fieldClasses['dropdown-message'],
                  props.classDropdownMessage,
                ]"
              >
                <span>{{ messages.notFoundResults }}</span>
              </div>
              <div
                v-else-if="
                  !isLoading &&
                  selectOptions.length === 0 &&
                  debouncedSearchText.length < props.minSearchLength
                "
                :class="[
                  global['dropdown-message'],
                  groupClasess['dropdown-message'],
                  fieldClasses['dropdown-message'],
                  props.classDropdownMessage,
                ]"
              >
                <span>{{ messages.minSearchType }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Combobox>
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
