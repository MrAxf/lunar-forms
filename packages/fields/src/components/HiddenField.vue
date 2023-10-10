<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type {
  FieldTransformer,
  FieldValue,
  MaybeArray,
} from '@lunar-forms/core';
import { useField } from '@lunar-forms/core';

defineOptions({
  name: 'TextField',
  inheritAttrs: false,
});

const props = defineProps<{
  name: string;
  modelValue?: FieldValue;
  value?: FieldValue;
  transform?: MaybeArray<FieldTransformer>;
  refine?: MaybeArray<FieldTransformer>;
}>();

const id = `${props.name}-${crypto.randomUUID()}`;

const { value } = useField(props.name, {
  initialValue: props.value || props.modelValue,
  transform: props.transform,
  refine: props.refine,
});
</script>

<template>
  <input
    type="hidden"
    :name="name"
    :id="id"
    v-model="value"
    v-bind="{ ...$attrs }"
  />
</template>
