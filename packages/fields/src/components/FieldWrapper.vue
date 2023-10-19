<script setup lang="ts">
import type { FieldWrapperClassesProps, PluginOptions } from '@/types';

const props = defineProps<
  FieldWrapperClassesProps & {
    theme: PluginOptions['theme'];
    id: string;
    label?: string;
    help?: string;
    error?: string;
  }
>();
</script>

<template>
  <div :class="[props.theme.classes.outer, props.classOuter]">
    <div :class="[props.theme.classes.wrapper, props.classWrapper]">
      <label
        v-if="props.label"
        :class="[props.theme.classes.label, props.classLabel]"
        :for="props.id"
        >{{ props.label }}</label
      >
      <div :class="[props.theme.classes.inner, props.classInner]">
        <slot />
      </div>
    </div>
    <span
      v-if="props.help"
      :class="[props.theme.classes.help, props.classHelp]"
      >{{ props.help }}</span
    >
    <span
      v-if="props.error"
      :class="[props.theme.classes.message, props.classMessage]"
      >{{ props.error }}</span
    >
  </div>
</template>
