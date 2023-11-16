<script setup lang="ts">
import { ReplStore } from '@vue/repl';
import { onMounted, ref } from 'vue';

import ReplEditor from './ReplEditor.vue';

const props = defineProps<{
  example: string;
}>();

const store = ref<ReplStore | undefined>();

onMounted(() => {
  store.value = new ReplStore();

  store.value.setImportMap({
    imports: {
      '@lunar-forms/core':
        'https://unpkg.com/@lunar-forms/core@0.5.0/dist/index.js',
      ...store.value.getImportMap().imports,
    },
  });
});
</script>

<template>
  <section class="not-content mt-6">
    <div
      class="h-[40rem] bg-[--astro-code-color-background] outline outline-1 outline-[--sl-color-gray-5]"
    >
      <Suspense>
        <div v-if="store" class="h-full text-black dark">
          <ReplEditor :store="store" :example="props.example" />
        </div>
        <div v-else class="animate-pulse h-full bg-black bg-opacity-50"></div>
        <template #fallback>
          <div class="animate-pulse h-full bg-black bg-opacity-50"></div>
        </template>
      </Suspense>
    </div>
  </section>
</template>
