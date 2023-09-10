<template>
  <div :class="theme.classes.outer">
    <div :class="theme.classes.wrapper">
      <label v-if="props.label" :class="theme.classes.label" :for="id">{{
        props.label
      }}</label>
      <div :class="theme.classes.inner">
        <div :class="theme.classes.prefix"></div>
        <input type="text" :name="name" :id="id" />
        <div :class="theme.classes.suffix"></div>
      </div>
    </div>
    <span :class="theme.classes.help"></span>
    <span :class="theme.classes.message"></span>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { PluginOptions } from '../types/plugin';
import { PLUGING_CONTEXT_KEY } from '../consts';

const props = defineProps<{
  name: string;
  label?: string;
}>();

const options = inject<PluginOptions>(PLUGING_CONTEXT_KEY);

if (!options) throw new Error('Lunar Forms Fields plugin is not setted.');

const { theme } = options;

// autogenerate id for input
const id = `${props.name}-${crypto.randomUUID()}`;
</script>
