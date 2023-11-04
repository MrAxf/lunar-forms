<script setup lang="ts">
import { ReplStore } from '@vue/repl';

import single from '../examples/single.vue?raw';
import ReplEditor from './ReplEditor.vue';

const props = defineProps<{
  example: string
}>();

const store = new ReplStore();

store.setImportMap({
  imports: {
    "@lunar-forms/core": "https://unpkg.com/@lunar-forms/core@0.4.0/dist/index.js",
    ...store.getImportMap().imports,
  },
});
</script>

<template>
  <Suspense>
    <div class="h-[20rem] text-black mt-6 not-content dark">
      <ReplEditor :store="store" :example="example" />
    </div>
  </Suspense>
</template>
