<script setup>
import { minLength, required, useField } from '@lunar-forms/core';

const { value, fieldProps, valid, error } = useField('name', {
  validate: [
    required('The field is required.'),
    minLength('The text must have at least {requirement} characters.', 5),
  ],
});
</script>

<template>
  <label for="name">
    Name
    <input
      id="name"
      type="text"
      v-model="value"
      v-bind="fieldProps"
      :aria-invalid="error ? true : valid ? false : null"
    />
    <span v-if="error" class="error">{{ error }}</span>
  </label>
</template>
