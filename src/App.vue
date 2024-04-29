<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Counter.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld />
    </div>
  </header>

  <RouterView />
</template>

<style></style>
