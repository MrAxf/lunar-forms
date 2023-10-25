<template>
  <div>
    Nuxt module playground!
    <LunarField v-model="a" name="hola"></LunarField>
    {{ a }}
  </div>
</template>

<script setup>
const a = ref('');
</script>
