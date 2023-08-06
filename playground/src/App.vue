<script setup lang="ts">
import { useField, required, useForm } from '@lunar-forms/core';

const { values, errors, formProps } = useForm();
const { value, fieldProps } = useField('hola.name[0]', {
  validate: [required('El elemento es requerido')],
});
</script>

<template>
  <form v-bind="formProps">
    <input type="text" v-model="value" v-bind="fieldProps" />
  </form>
  <pre>{{ { values, errors } }}</pre>
</template>
