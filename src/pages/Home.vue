<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import AbsenToday from '@/components/cards/AbsenToday.vue';
import { Label } from '@/components/ui/label';
import { useSessionStore } from '@/stores/session-store';
const { profile } = useSessionStore()


</script>

<template>
  <div class="w-full flex flex-col bg-gray-300 min-h-screen p-5 gap-2">
    <div class="w-full">
      <Label class="text-blue-500 font-bold text-lg">
        Home page
      </Label>
    </div>
    <section class="w-full h-full bg-white p-5 rounded-md shadow shadow-gray-500 flex flex-col">
      <div class="w-full flex flex-col justify-center items-center gap-10">
        <Label class="text-4xl text-black font-semibold">Selamat Datang,
          <span class="text-blue-500">{{ profile?.name || "Nama user" }}</span>
        </Label>
        <div class="w-full items-center justify-center h-60 gap-5 flex flex-col">
          <img :src=profile?.image alt="Profile" class="w-56 h-56 rounded-md">
          <p class="text-blue-500 font-semibold text-[15px]">Ini adalah website absensi yg dibuat sebagai latihan CRUD dasar</p>
        </div>
      </div>
    </section>
    <section class="w-full pb-16 bg-white p-5 rounded-md shadow shadow-gray-500 flex flex-col gap-10">
      <div class="w-full flex justify-start px-5 items-center gap-10">
        <Label class="text-blue-500 font-bold text-lg">
          Absen Hari Ini :
        </Label>
      </div>
      <div class="w-full h-full">
        <AbsenToday/>
      </div>
    </section>
  </div>
</template>
