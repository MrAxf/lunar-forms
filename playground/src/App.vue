<script setup lang="ts">
import { useField, required, useForm, useFieldArray } from '@lunar-forms/core';

const { values, errors, formProps } = useForm({
  initialValues: {
    quetal: 'hey',
    hola: ['un', 'dos', 'tres'],
  },
  handleSubmit(values: { 'hola.name[0]': string }) {
    console.log(values);
  },
});
const { value, fieldProps } = useField('hola.name[0]', {
  validate: [required('El elemento es requerido')],
});
const { value: v, fieldProps: f } = useField('quetal', {
  validate: [required('El elemento es requerido')],
  initialValue: 'eyeyeyeyeye',
});
</script>

<template>
  <main class="container mx-auto py-10">
    <h1
      class="mb-5 bg-gradient-to-br from-purple-600 to-fuchsia-300 bg-clip-text text-8xl font-bold text-transparent"
    >
      Lunar Forms
    </h1>
    <div class="flex gap-5">
      <section class="flex-1 flex-grow">
        <form v-bind="formProps" class="m-5 flex flex-col items-start gap-5">
          <input
            type="text"
            v-model="value"
            v-bind="fieldProps"
            class="input bg-base-300"
          />
          <input type="text" v-model="v" v-bind="f" class="input bg-base-300" />
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="reset" class="btn btn-primary">Reset</button>
        </form>
      </section>
      <section class="bg-base-300 rounded-box flex-1 flex-grow p-5">
        <pre>{{ { values, errors } }}</pre>
      </section>
    </div>
  </main>
</template>
