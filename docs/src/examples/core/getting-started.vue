<script setup>
import {
  LunarError,
  LunarField,
  LunarForm,
  confirm,
  email,
  minLength,
  required,
} from '@lunar-forms/core';

function submit(data) {
  alert(JSON.stringify(data, null, 2));
}
</script>

<template>
  <h3>User</h3>

  <LunarForm @submit="submit" v-slot="{ errors }">
    <label for="name">
      Name
      <LunarField
        id="name"
        type="text"
        name="name"
        :validate="[
          required('The field is required.'),
          minLength('The text must have at least {requirement} characters.', 5),
        ]"
        :aria-invalid="errors.value['name'] ? true : null"
      />
      <LunarError name="name" class="error" />
    </label>
    <label for="email">
      Email
      <LunarField
        id="email"
        type="email"
        name="email"
        :validate="[
          required('The field is required.'),
          email('The email is not valid'),
        ]"
        :aria-invalid="errors.value['email'] ? true : null"
      />
      <LunarError name="email" class="error" />
    </label>
    <label for="password">
      Password
      <LunarField
        id="password"
        type="password"
        name="password"
        :validate="[
          required('The field is required.'),
          minLength('The text must have at least {requirement} characters.', 5)
        ]"
        :aria-invalid="errors.value['password'] ? true : null"
      />
      <LunarError name="password" class="error" />
    </label>
    <label for="password-confirm">
      Repeat the password
      <LunarField
        id="password-confirm"
        type="password"
        name="password-confirm"
        :validate="[
          required('The field is required.'),
          confirm(`Passwords doesn't match.`, 'password')
        ]"
        :aria-invalid="errors.value['password-confirm'] ? true : null"
      />
      <LunarError name="password-confirm" class="error" />
    </label>
    <div class="row gap">
      <button class="col" type="submit" role="button">Submit</button>
      <button class="col secondary" type="reset" role="button">Reset</button>
    </div>
  </LunarForm>
</template>
