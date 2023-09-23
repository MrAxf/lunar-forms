<script setup lang="ts">
import { PluginOptions } from '../types';

const props = defineProps<{
  theme: PluginOptions['theme'];
  id: string;
  label?: string;
  help?: string;
  error?: string;
}>();
</script>

<template>
  <div :class="props.theme.classes.outer">
    <div :class="props.theme.classes.wrapper">
      <label
        v-if="props.label"
        :class="props.theme.classes.label"
        :for="props.id"
        >{{ props.label }}</label
      >
      <div :class="props.theme.classes.inner">
        <slot />
      </div>
    </div>
    <span v-if="props.help" :class="props.theme.classes.help">{{
      props.help
    }}</span>
    <span v-if="props.error" :class="props.theme.classes.message">{{
      props.error
    }}</span>
  </div>
</template>
