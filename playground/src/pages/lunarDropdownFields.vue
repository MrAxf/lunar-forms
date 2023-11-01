<!-- eslint-disable vue/attribute-hyphenation -->
<script lang="ts" setup>
import { FieldValue, LunarForm } from '@lunar-forms/core';
import {
  AutocompleteField,
  SelectMenuField,
} from '@lunar-forms/dropdown-fields';

async function asyncOptions({
  page,
  hasMore,
  signal,
}: {
  page: number;
  hasMore: () => void;
  signal: AbortSignal;
}) {
  const data = await fetch(`https://swapi.dev/api/people/?page=${page}`, {
    signal,
  }).then((response) => response.json());

  if (data.next) hasMore();

  return data.results.map((item: { name: string; url: string }) => ({
    label: item.name,
    value: item.url,
  }));
}

async function autocompleteAsyncOptions({
  page,
  hasMore,
  search,
  signal,
}: {
  page: number;
  hasMore: () => void;
  search: string;
  signal: AbortSignal;
}) {
  const data = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`,
    {
      signal,
    }
  ).then((response) => response.json());

  if (data.next) hasMore();

  return data.results.map((item: { name: string; url: string }) => ({
    label: item.name,
    value: item.url,
  }));
}

async function loadOption(val: FieldValue, cache?: string) {
  if (cache) return cache;

  const item = await fetch(val as string).then((response) => response.json());

  return { label: item.name, value: item.url };
}
</script>

<template>
  <LunarForm
    class="flex gap-5"
    v-slot="{ values, errors }"
    @submit="(value) => console.log(value)"
  >
    <section class="grid w-[60%] flex-grow grid-cols-2">
      <SelectMenuField
        v-auto-animate
        name="selectMenuList"
        label="Select Menu List"
        help="Texto de prueba"
        placeholder="Select ..."
        multiple
        :options="[
          { label: 'Opción 1', value: 1 },
          { label: 'Opción 2', value: 2 },
          { label: 'Opción 3', value: 3 },
          { label: 'Opción 4', value: 4 },
          { label: 'Opción 5', value: 5 },
          { label: 'Opción 6', value: 6 },
          { label: 'Opción 7', value: 7 },
          { label: 'Opción 8', value: 8 },
        ]"
      />
      <SelectMenuField
        v-auto-animate
        name="selectMenuAsync"
        label="Select Menu Async"
        help="Texto de prueba"
        placeholder="Select ..."
        multiple
        :options="asyncOptions"
        :initial-value="[
          'https://swapi.dev/api/people/1/',
          'https://swapi.dev/api/people/2/',
          'https://swapi.dev/api/people/3/',
        ]"
        :load-option="loadOption"
      />

      <AutocompleteField
        v-auto-animate
        name="autocompleteAsync"
        label="Autocomplete Async"
        help="Texto de prueba"
        placeholder="Select ..."
        search-placeholder="Buscar..."
        :options="autocompleteAsyncOptions"
        :load-option="loadOption"
        multiple
      />

      <div class="m-3 flex place-items-center gap-5">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-accent" type="reset">Reset</button>
      </div>
    </section>
    <section
      class="bg-base-300 rounded-box sticky top-[5vh] h-[90vh] w-[40%] flex-grow-0 p-5 overflow-x-hidden"
    >
      <pre>{{ { values, errors } }}</pre>
    </section>
  </LunarForm>
</template>
