<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const value = ref('')
const action = useAuthStore()

const checkedName = ref([])
const array = [
  {
    name: 'Fiky',
    kelas: 10,
  },
  {
    name: 'Al',
    kelas: 12,
  },
  {
    name: 'Rasya',
    kelas: 11,
  },
]
</script>

<template>
  <form @submit.prevent="action.signIn(value)">
    <input type="text" v-model="value" />
    <p>{{ value }}</p>
    <button class="w-full p-5 bg-red-500 rounded-md font-semibold text-white" type="submit">
      Submit
    </button>
  </form>

  <div v-for="(item, index) in array" :key="index" class="flex items-center w-full">
    <p class="text-red-600 font-bold">{{ item.name }}</p>
    <p>{{ item.kelas }}</p>
  </div>
  <input type="text" >
  <div>Names :{{ checkedName }}</div>

  <select v-model="checkedName" multiple>
    <option>Fiky</option>
    <option>Ganteng</option>
    <option>Banget</option>
    <option>Hehe</option>
  </select>
</template>
