<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
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
import type { FieldValidation, FieldValue, Maybe } from '@lunar-forms/core';
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
  useIntersectionObserver,
} from '@vueuse/core';
import type { HTMLAttributes } from 'vue';
import { computed, onMounted, ref, unref } from 'vue';

import type {
  LunarDropdownFieldsOptions,
  SelectLabelValue,
  SelectLabelValueAsync,
} from '@/types';
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
        multiple?: boolean;
        placeholder?: string;
        options?: string[] | T[] | SelectLabelValueAsync<T>;
        loadOption?: (
          value: FieldValue,
          cachedValue?: string
        ) => Promise<string>;
      }
  >(),
  {
    validateOn: 'change',
    multiple: false,
  }
);

defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'change', ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
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
} = usePluginOptions<LunarDropdownFieldsOptions & PluginOptions>();

const { fieldData } = useCommonField({
  validate: computed(() => {
    let validation: FieldValidation[] = [];
    if (props.required) validation.push(requiredValidator(messages.required));
    if (props.validate) validation = validation.concat(unref(props.validate));
    return validation;
  }),
});

const { value, error, valid, touched, fieldProps } = fieldData;

const isLoading = ref(false);
const isMore = ref(false);
const currentpage = ref(1);

const selectOptions = ref<T[]>([]);

const reference = ref<MaybeElement>(null);
const floating = ref<any>(null);
const ioTarget = ref<MaybeElement>(null);

const labelCache = new Map<FieldValue, string>();

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom',
  middleware: [flip(), offset(10)],
  whileElementsMounted: autoUpdate,
});

useIntersectionObserver(
  ioTarget,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isMore.value = false;
      getData();
    }
  },
  {
    root: floating,
  }
);

const inputText = computedAsync(async () => {
  if (!props.multiple && value.value) {
    return await getLabel(value.value);
  } else if (
    props.multiple &&
    Array.isArray(value.value) &&
    value.value.length > 0
  ) {
    return (
      await Promise.all(value.value.map((item: FieldValue) => getLabel(item)))
    ).join(', ');
  }
  return props.placeholder;
});

async function getLabel(value: FieldValue) {
  let cachedValue: Maybe<string> = undefined;
  if (labelCache.has(value)) {
    cachedValue = labelCache.get(value);
  }
  const label = props.loadOption
    ? await props.loadOption(value, cachedValue)
    : selectOptions.value.find((item) => item.value === value)?.label;
  if (label) {
    labelCache.set(value, label);
    return label;
  }
  return null;
}

function onOptionSelected(ev: Event, option: SelectLabelValue) {
  fieldProps.onchange(ev);
  labelCache.set(option.value, option.label);
}

function hasMore() {
  isMore.value = true;
  currentpage.value++;
}

async function getData() {
  isLoading.value = true;
  try {
    const data = await toSelectLabelValues<T>(props.options)({
      page: currentpage.value,
      hasMore,
    });

    data.forEach((item) => {
      labelCache.set(item.value, item.label);
    });

    // @ts-ignore
    selectOptions.value = selectOptions.value.concat(data);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getData();
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
          @blur="fieldProps.onblur"
          @focus="fieldProps.onfocus"
          :class="[
            global.input,
            groupClasess.input,
            fieldClasses.input,
            props.classInput,
          ]"
        >
          {{ inputText }}
        </ListboxButton>
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
                @click="(ev) => onOptionSelected(ev, option)"
              >
                <div
                  :class="[
                    groupClasess['option-selected-icon'],
                    fieldClasses['option-selected-icon'],
                  ]"
                >
                  <div v-if="selected" v-html="icons.optionSelected"></div>
                </div>
                <span>{{ option.label }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
          <span v-if="isLoading">Loading...</span>
          <span v-if="!isLoading && isMore" ref="ioTarget">load more...</span>
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
