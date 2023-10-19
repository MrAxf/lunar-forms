<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts" generic="T extends CheckboxesRadioLabelValue">
import type { FieldValue } from '@lunar-forms/core';
import { ref } from 'vue';

import { usePluginOptions } from '@/composables';
import { useFieldsetContext } from '@/contexts';
import type { CheckboxesRadioLabelValue } from '@/types';

defineOptions({
  name: 'CheckboxesFieldInput',
  inheritAttrs: false,
});

const props = defineProps<{
  option: T;
  idx: number;
}>();

const emit = defineEmits<{
  (e: 'change', ev: Event): void;
}>();

defineSlots<{
  prefix(props: T & { value: FieldValue }): any;
  suffix(props: T & { value: FieldValue }): any;
}>();

const { theme } = usePluginOptions();

const inputRef = ref<HTMLInputElement | null>(null);

const fieldsetContext = useFieldsetContext();
if (!fieldsetContext) {
  throw new Error('CheckboxesFieldInput must be inside a FieldsetContext');
}
const { value, name, id } = fieldsetContext;
</script>

<template>
  <div
    :class="theme.classes.option"
    :data-field="$options.name"
    :data-disabled="props.option.attrs?.disabled ? true : null"
    :data-readonly="props.option.attrs?.readonly ? true : null"
    :data-checked="inputRef?.checked ? true : null"
  >
    <label :class="theme.classes.wrapper">
      <div :class="theme.classes.inner">
        <div v-if="$slots.prefix" :class="theme.classes.prefix">
          <slot name="prefix" v-bind="{ ...props.option, value }"></slot>
        </div>
        <input
          ref="inputRef"
          type="checkbox"
          :name="`${name}[${props.idx}]`"
          :id="`${id}[${props.idx}]`"
          :class="theme.classes.input"
          :value="props.option.value"
          v-model="value"
          @change="(ev) => emit('change', ev)"
          v-bind="props.option.attrs"
        />
        <div v-if="$slots.suffix" :class="theme.classes.suffix">
          <slot name="suffix" v-bind="{ ...props.option, value }"></slot>
        </div>
      </div>
      <span :class="theme.classes.label">{{ props.option.label }}</span>
    </label>
    <span :class="theme.classes.help" v-if="props.option.help">{{
      props.option.help
    }}</span>
  </div>
</template>
