<script setup lang="ts">
import { useField, required, useForm } from '@lunar-forms/core';

const { values, errors, formProps } = useForm({
  initialValues: {
    quetal: 'hey',
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
  <form v-bind="formProps" class="m-5 flex flex-col items-start gap-5">
    <input type="text" v-model="value" v-bind="fieldProps" />
    <input type="text" v-model="v" v-bind="f" />
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>
  <pre>{{ { values, errors } }}</pre>
</template>
