<script setup>
import { ref } from 'vue'
import { LunarField } from '@lunar-forms/core'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <LunarField as="textarea" v-model="msg" />
</template>
