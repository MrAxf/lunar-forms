<script setup lang="ts">
import type { FieldWrapperClassesProps, PluginOptions } from '@/types';

const props = defineProps<
  FieldWrapperClassesProps & {
    global: PluginOptions['theme']['classes']['global'];
    id: string;
    label?: string;
    help?: string;
    error?: string;
  }
>();
</script>

<template>
  <div :class="[props.global.outer, props.classOuter]">
    <div :class="[props.global.wrapper, props.classWrapper]">
      <label
        v-if="props.label"
        :class="[props.global.label, props.classLabel]"
        :for="props.id"
        >{{ props.label }}</label
      >
      <div :class="[props.global.inner, props.classInner]">
        <slot />
      </div>
    </div>
    <span v-if="props.help" :class="[props.global.help, props.classHelp]">{{
      props.help
    }}</span>
    <span
      v-if="props.error"
      :class="[props.global.message, props.classMessage]"
      >{{ props.error }}</span
    >
  </div>
</template>
