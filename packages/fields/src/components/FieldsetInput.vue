<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts" generic="T extends FieldsetLabelValue">
import type { FieldValue } from '@lunar-forms/core';
import type { HTMLAttributes } from 'vue';
import { ref } from 'vue';

import { usePluginOptions } from '@/composables';
import { useFieldsetContext } from '@/contexts';
import type { FieldsetLabelValue } from '@/types';

defineOptions({
  name: 'CheckboxesFieldInput',
  inheritAttrs: false,
});

const props = defineProps<{
  option: T;
  idx: number;
  classOption?: HTMLAttributes['class'];
  classWrapper?: HTMLAttributes['class'];
  classInner?: HTMLAttributes['class'];
  classPrefix?: HTMLAttributes['class'];
  classSuffix?: HTMLAttributes['class'];
  classInput?: HTMLAttributes['class'];
  classLabel?: HTMLAttributes['class'];
  classHelp?: HTMLAttributes['class'];
}>();

const emit = defineEmits<{
  (e: 'change', ev: Event): void;
}>();

defineSlots<{
  prefix(props: T & { value: FieldValue }): any;
  suffix(props: T & { value: FieldValue }): any;
}>();

const {
  theme: {
    classes: {
      global,
      groups: { inputCheckable: groupClasses },
    },
  },
} = usePluginOptions();

const inputRef = ref<HTMLInputElement | null>(null);

const fieldsetContext = useFieldsetContext();
if (!fieldsetContext) {
  throw new Error('CheckboxesFieldInput must be inside a FieldsetContext');
}
const { value, name, id } = fieldsetContext;
</script>

<template>
  <div
    :class="[global.option, props.classOption]"
    :data-field="$options.name"
    :data-disabled="props.option.attrs?.disabled ? true : null"
    :data-readonly="props.option.attrs?.readonly ? true : null"
    :data-checked="inputRef?.checked ? true : null"
    :data-prefix="$slots.prefix ? true : null"
    :data-suffix="$slots.suffix ? true : null"
  >
    <label :class="[global.wrapper, groupClasses.wrapper, props.classWrapper]">
      <div :class="[global.inner, groupClasses.inner, props.classInner]">
        <div
          v-if="$slots.prefix"
          :class="[global.prefix, groupClasses.prefix, props.classPrefix]"
        >
          <slot name="prefix" v-bind="{ ...props.option, value }"></slot>
        </div>
        <input
          ref="inputRef"
          :type="fieldsetContext.type"
          :name="`${name}[${props.idx}]`"
          :id="`${id}[${props.idx}]`"
          :class="[global.input, groupClasses.input, props.classInput]"
          :value="props.option.value"
          v-model="value"
          @change="(ev) => emit('change', ev)"
          v-bind="props.option.attrs"
        />
        <div
          v-if="$slots.suffix"
          :class="[global.suffix, groupClasses.suffix, props.classSuffix]"
        >
          <slot name="suffix" v-bind="{ ...props.option, value }"></slot>
        </div>
      </div>
      <span :class="[global.label, groupClasses.label, props.classLabel]">{{
        props.option.label
      }}</span>
    </label>
    <span
      :class="[global.help, groupClasses.help, props.classHelp]"
      v-if="props.option.help"
      >{{ props.option.help }}</span
    >
  </div>
</template>
