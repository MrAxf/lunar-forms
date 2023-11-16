<script setup>
import { LunarField, LunarForm, email, minLength, confirm } from '@lunar-forms/core'
</script>

<template>
  <h3>User</h3>

  <LunarForm>
    <label for="name">
      Name
      <LunarField
        id="name"
        type="text"
        name="name"
        :validate="minLength('The text must have at least {requirement} characters.', 5)"
      />
    </label>
    <label for="email">
      Email
      <LunarField
        id="email"
        type="email"
        name="email"
        :validate="email('The email is not valid')"
      />
    </label>
    <label for="password">
      Password
      <LunarField
        id="password"
        type="password"
        name="password"
        :validate="minLength('The text must have at least {requirement} characters.', 5)"
      />
    </label>
    <label for="password-confirm">
      Repeat the password
      <LunarField
        id="password-confirm"
        type="password-confirm"
        name="password-confirm"
        :validate="confirm(`Passwords doesn't match.`, 'password')"
      />
    </label>
    <button type="submit" role="button">Submit</button>
    <button type="reset" role="button">Reset</button>
  </LunarForm>
</template>
