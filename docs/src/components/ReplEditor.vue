<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl';

const props = defineProps<{
  store: ReplStore;
  example: string;
}>();

const { default: Monaco } = await import('@vue/repl/monaco-editor');

const { default: exampleCode } = await import(
  `../examples/${props.example}.vue?raw`
);

props.store.setFiles({
  ...props.store.getFiles(),
  'src/App.vue': exampleCode,
});
</script>

<template>
  <Repl
    :editor="Monaco"
    :theme="'dark'"
    :show-ts-config="false"
    :show-compile-output="false"
    :store="props.store"
  />
</template>

<style src="@vue/repl/style.css"></style>
