<!-- eslint-disable vue/require-default-prop -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts">
import { type Component } from 'vue';

import { useFieldArray } from '@/composables';
import type { FieldArrayContext, FieldValidation, MaybeArray } from '@/types';

const props = withDefaults(
  defineProps<{
    name: string;
    validate?: MaybeArray<FieldValidation>;
    as?: Component | string;
  }>(),
  {
    as: 'div',
  }
);

defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default(props: FieldArrayContext): any;
}>();

const fieldData = useFieldArray(props.name, {
  validate: props.validate,
});
</script>

<template>
  <component :is="props.as">
    <slot v-bind="fieldData" />
  </component>
</template>
