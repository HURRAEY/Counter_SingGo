<script setup lang="ts">
import DocumentationIcon from './icons/IconDocumentation.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>

    음원분리 바로가기
    <br />
    <a href="http://localhost:5174/" target="_blank" rel="noopener">SingGo</a>
  </WelcomeItem>
</template>
