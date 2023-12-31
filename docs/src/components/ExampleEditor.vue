<script setup lang="ts">
import { ReplStore } from '@vue/repl';
import { computed, onMounted, ref, withDefaults } from 'vue';

import ReplEditor from './ReplEditor.vue';

const examples = import.meta.glob('../examples/**/**', { as: 'raw' });

const props = withDefaults(defineProps<{
  height: number;
  example: string;
}>(), {
  height: 40
});

const heightCss = computed(() => `${props.height}rem`)

const exampleSrc: string = examples[`../examples/${props.example}.vue`] ? await examples[`../examples/${props.example}.vue`]() : '';

const store = ref<ReplStore | undefined>();

onMounted(() => {
  store.value = new ReplStore();

  store.value.setImportMap({
    imports: {
      '@lunar-forms/core':
        'https://unpkg.com/@lunar-forms/core@0.6.0/dist/index.js',
      ...store.value.getImportMap().imports,
    },
  });
});
</script>

<template>
  <section class="not-content mt-6">
    <div
      class="main h-[--height] bg-[--astro-code-color-background] outline outline-1 outline-[--sl-color-gray-5]"
    >
      <Suspense>
        <div v-if="store" class="h-full text-black dark">
          <ReplEditor :store="store" :example="exampleSrc" />
        </div>
        <div v-else class="animate-pulse h-full bg-black bg-opacity-50"></div>
        <template #fallback>
          <div class="animate-pulse h-full bg-black bg-opacity-50"></div>
        </template>
      </Suspense>
    </div>
  </section>
</template>

<style scoped>
.main {
  --height: v-bind(heightCss);
}
</style>
