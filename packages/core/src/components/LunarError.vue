<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { Component } from 'vue';
import { computed, getCurrentInstance, inject } from 'vue';

import type { FormContext } from '@/types';
import { FORM_CONTEXT_KEY } from '@/utils';

const props = withDefaults(
  defineProps<{
    name: string;
    as?: Component | string;
  }>(),
  {
    as: 'span',
  }
);

const vm: any = getCurrentInstance();
const formContext: FormContext | undefined =
  vm?.provides[FORM_CONTEXT_KEY] || inject(FORM_CONTEXT_KEY, undefined);

if (!formContext) throw new Error('Lunar error needs a Form Context.');

const error = computed(() => formContext.errors.value[props.name]);
</script>

<template>
  <Component v-if="error" :is="props.as">
    {{ error }}
  </Component>
</template>
