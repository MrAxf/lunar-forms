<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl';
import headHTML from "../examples/headHtml.html?raw";
import headHsTML from "../examples/lunar-forms-core/getting-started.vue?raw";


const props = defineProps<{
  store: ReplStore;
  example: string;
}>();

const { default: Monaco } = await import('@vue/repl/monaco-editor');

// const { default: exampleCode } = await import(
//   `../examples/${props.example}.vue?raw`
// );

await props.store.setFiles({
  ...props.store.getFiles(),
  'src/App.vue': headHsTML,
});
</script>

<template>
  <Repl
    :editor="Monaco"
    :theme="'dark'"
    :show-ts-config="false"
    :show-compile-output="false"
    :store="props.store"
    layout="vertical"
    :preview-options="{
      headHTML,
      customCode: {
        importCode: `console.log('previous setup')`,
        useCode: `console.log('setup vue app here')`,
      }
    }"
  />
</template>

<style src="@vue/repl/style.css"></style>
