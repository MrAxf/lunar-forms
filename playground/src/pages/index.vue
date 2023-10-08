<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { LunarField, LunarForm } from '@lunar-forms/core';
</script>

<template>
  <LunarForm class="flex gap-5" v-slot="{ values, errors }">
    <section class="grid h-auto w-[60%] flex-grow grid-cols-2 gap-5">
      <LunarField
        name="Prueba texto"
        class="input bg-base-300"
        placeholder="Prueba texto..."
      />
      <LunarField
        name="select"
        class="select bg-base-300"
        placeholder="select"
        validate-on="change"
        as="select"
      >
        <option value="Opción 1">Opción 1</option>
        <option value="Opción 2">Opción 2</option>
        <option value="Opción 3">Opción 3</option>
      </LunarField>
      <label
        ><LunarField name="radio" type="radio" class="radio" value="Opción 1" />
        Opción 1</label
      >
      <label
        ><LunarField name="radio" type="radio" class="radio" value="Opción 2" />
        Opción 2</label
      >
      <label
        ><LunarField name="radio" type="radio" class="radio" value="Opción 3" />
        Opción 3</label
      >
      <label
        ><LunarField
          name="checkbox"
          type="checkbox"
          class="checkbox"
          value="Opción 1"
          :initial-value="[]"
        />
        Opción 1</label
      >
      <label
        ><LunarField
          name="checkbox"
          type="checkbox"
          class="checkbox"
          value="Opción 2"
        />
        Opción 2</label
      >
      <label
        ><LunarField
          name="checkbox"
          type="checkbox"
          class="checkbox"
          value="Opción 3"
        />
        Opción 3</label
      >
      <label
        ><LunarField
          name="checkbox2"
          type="checkbox"
          class="checkbox"
          :true-value="1"
          :false-value="0"
        />
        TrueFalseValue</label
      >
    </section>
    <section
      class="bg-base-300 rounded-box sticky top-[5vh] h-[90vh] w-[40%] flex-grow-0 p-5"
    >
      <pre>{{ { values, errors } }}</pre>
    </section>
  </LunarForm>
</template>
