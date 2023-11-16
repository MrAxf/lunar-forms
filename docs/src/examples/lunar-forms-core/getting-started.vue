<script setup>
import { LunarField, LunarForm, email } from '@lunar-forms/core'
</script>

<template>
  <h3>User</h3>

  <LunarForm>
    <label for="email">
      Email
      <LunarField
        id="email"
        type="email"
        name="email"
        :validate="email('The email is not valid')"
      />
    </label>
  </LunarForm>
</template>
