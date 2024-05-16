<script setup lang="ts">
import DocumentationIcon from './icons/IconDocumentation.vue'
import { defineComponent } from 'vue'

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>

    음원분리 바로가기
    <br />
    <router-link to="/separate">SingGo</router-link>
  </WelcomeItem>
</template>
