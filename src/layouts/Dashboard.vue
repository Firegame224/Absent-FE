<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <Sidebar />
  <div class="w-full pl-80 bg-gray-200">
    <RouterView />
  </div>
</template>
