<script setup lang="ts">
import lunarFormLogo from './assets/logo.svg';
</script>

<template>
  <header class="bg-base-300">
    <div class="container m-auto flex items-center justify-between py-5">
      <div class="flex items-center gap-5">
        <img
          :src="lunarFormLogo"
          alt="Lunar Forms logotype"
          class="h-16 w-auto"
        />
        <h1
          class="bg-gradient-to-br from-purple-600 to-fuchsia-300 bg-clip-text text-5xl font-bold text-transparent"
        >
          Lunar Forms
        </h1>
      </div>
      <nav>
        <ul class="menu menu-horizontal gap-5">
          <li>
            <router-link to="/" active-class="bg-base-100">Core</router-link>
          </li>
          <li>
            <router-link to="/fields" active-class="bg-base-100"
              >Fields</router-link
            >
          </li>
          <li>
            <router-link to="/dropdown-fields" active-class="bg-base-100"
              >Dropdown Fields</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <main class="container mx-auto flex flex-col gap-20 py-10">
    <router-view />
  </main>
</template>
