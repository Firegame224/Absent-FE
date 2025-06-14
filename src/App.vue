<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <KeepAlive>
    <RouterView class="bg-gray-200" />
  </KeepAlive>
</template>
