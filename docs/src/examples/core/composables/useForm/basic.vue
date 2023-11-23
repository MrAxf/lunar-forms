<script setup>
import { minLength, required, useField, useForm } from '@lunar-forms/core';

const { formProps } = useForm({
  handleSubmit: (data) => {
    alert(JSON.stringify(data, null, 2));
  },
});
const {
  value: nameValue,
  fieldProps: nameFieldProps,
  valid: nameValid,
  error: nameError,
} = useField('name', {
  validate: [
    required('The field is required.'),
    minLength('The text must have at least {requirement} characters.', 5),
  ],
});

const {
  value: passwordValue,
  fieldProps: passwordFieldProps,
  valid: passwordValid,
  error: passwordError,
} = useField('password', {
  validate: [
    required('The field is required.'),
    minLength('The text must have at least {requirement} characters.', 5),
  ],
});
</script>

<template>
  <form v-bind="formProps">
    <label for="name">
      Name
      <input
        id="name"
        type="text"
        v-model="nameValue"
        v-bind="nameFieldProps"
        :aria-invalid="nameError ? true : nameValid ? false : null"
      />
      <span v-if="nameError" class="error">{{ nameError }}</span>
    </label>
    <label for="password">
      Password
      <input
        id="password"
        type="password"
        v-model="passwordValue"
        v-bind="passwordFieldProps"
        :aria-invalid="passwordError ? true : passwordValid ? false : null"
      />
      <span v-if="passwordError" class="error">{{ passwordError }}</span>
    </label>
    <div class="row gap">
      <button class="col" type="submit" role="button">Submit</button>
      <button class="col secondary" type="reset" role="button">Reset</button>
    </div>
  </form>
</template>
