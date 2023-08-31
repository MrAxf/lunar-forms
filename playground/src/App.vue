<script setup lang="ts">
import {
  useField,
  required,
  LunarForm,
  LunarField,
  minLength,
  useForm,
  useFieldArray,
} from '@lunar-forms/core';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import { Icon } from '@iconify/vue';

const { values, errors, formProps } = useForm({
  initialValues: {
    hola: ['1', '2', '3'],
  },
  handleSubmit(values) {
    console.log(values);
  },
});
const { fields, error, push, swap, remove, prepend, replace, update, insert } =
  useFieldArray('hola', { validate: [minLength('Max Len', 4)] });

const [parent] = useAutoAnimate();
</script>

<template>
  <main class="container mx-auto flex flex-col gap-20 py-10">
    <h1
      class="mb-5 bg-gradient-to-br from-purple-600 to-fuchsia-300 bg-clip-text text-8xl font-bold text-transparent"
    >
      Lunar Forms
    </h1>
    <div class="flex gap-5">
      <section class="flex-1 flex-grow">
        <form v-bind="formProps" class="m-5 flex flex-col items-start gap-5">
          <div ref="parent" class="flex flex-col gap-5">
            <div
              v-for="(field, idx) in fields"
              :key="field.key"
              class="flex flex-row gap-5"
            >
              <input
                type="text"
                v-model="field.value"
                class="input bg-base-300"
              />
              <button
                :disabled="idx === fields.length - 1"
                class="btn btn-square"
                @click="swap(idx, idx + 1)"
              >
                <Icon icon="material-symbols:arrow-downward" width="1.5rem" />
              </button>
              <button
                :disabled="idx === 0"
                class="btn btn-square"
                @click="swap(idx, idx - 1)"
              >
                <Icon icon="material-symbols:arrow-upward" width="1.5rem" />
              </button>
              <button class="btn btn-square" @click="update(idx, 5)">
                <Icon icon="material-symbols:update" width="1.5rem" />
              </button>
              <button class="btn btn-square" @click="remove(idx)">
                <Icon icon="material-symbols:delete" width="1.5rem" />
              </button>
            </div>
          </div>
          <div class="flex flex-wrap gap-5">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-primary">Reset</button>
          </div>
          <div class="flex flex-wrap gap-5">
            <button
              type="button"
              class="btn btn-accent"
              @click="prepend('hola')"
            >
              Prepend
            </button>
            <button type="button" class="btn btn-accent" @click="push('hola')">
              Push
            </button>
            <button
              type="button"
              class="btn btn-accent"
              @click="replace([3, 2, 1])"
            >
              Replace
            </button>
            <button type="button" class="btn btn-accent" @click="insert(2, 9)">
              Insert
            </button>
          </div>
        </form>
      </section>
      <section class="bg-base-300 rounded-box flex-1 flex-grow p-5">
        <pre>{{ { error, values, errors, fields } }}</pre>
      </section>
    </div>

    <LunarForm class="flex gap-5" v-slot="{ error, values, errors, fields }">
      <section class="flex-1 flex-grow flex-col">
        <label for="nombre">Nombre:</label>
        <LunarField name="nombre" class="input bg-base-300" />
        <span class="text-xs text-red-500">{{ error?.['nombre'] }}</span>
      </section>
      <section class="bg-base-300 rounded-box flex-1 flex-grow p-5">
        <pre>{{ { error, values, errors, fields } }}</pre>
      </section>
    </LunarForm>
  </main>
</template>
