<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import AnalysticsChart from '@/components/Analytics/AnalyticsChart.vue';
import { Label } from '@/components/ui/label';
import UserTable from '@/components/Analytics/AnalyticsTable.vue';

</script>

<template>
  <div class="w-full flex flex-col bg-gray-300 min-h-screen p-5 gap-2">
    <div class="w-full">
      <Label class="text-blue-500 font-bold text-lg">
        Analytic page
      </Label>
    </div>
    <section class="w-full bg-white p-5 rounded-md shadow shadow-gray-500 flex flex-col">
      <AnalysticsChart />
    </section>
    <section class="w-full bg-white p-5 flex-col gap-5 rounded-md shadow shadow-gray-500 flex">
      <UserTable />
    </section>
  </div>
</template>
