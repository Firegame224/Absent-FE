<script setup lang="ts">
import { convertDate } from '@/lib/helpers/date'
import { useabsenStores } from '@/stores/absen-store'
import type { Absen } from '@/types/absen'
import { onMounted, ref } from 'vue'
import { Label } from '../ui/label'
import { Plus } from 'lucide-vue-next'
import { Button } from '../ui/button'
import Dialog from '../Dialog.vue'
import { useAbsen } from '@/composables/absen'

const date = convertDate(new Date())
const isOpen = ref(false)

const { createAbsen, loading } = useAbsen()

const handleCreate = async () => {
  await createAbsen();
  isOpen.value = false
}

// Untuk data semua absen
const absensi = ref<Absen[]>([])
const chartOptions = ref({
  chart: {
    id: '',
  },
  xaxis: {
    categories: [] as string[]
  }
})

const series = ref([
  { name: 'Izin', data: [] as number[] },
  { name: "Hadir", data: [] as number[] },
  { name: "Terlambat", data: [] as number[] },
  { name: "Alpha", data: [] as number[] }
])

// untuk data satuan / singgle absens (hari ini)
const absensiToday = ref<Absen[]>([])
const singgle = ref<Absen>()

const donutOptions = {
  labels: ['Izin', 'Hadir', 'Terlambat', 'Alpha']
}

const donutSeries = ref([
  singgle.value?.Izin,
  singgle.value?.Hadir,
  singgle.value?.Terlambat,
  singgle.value?.Alpha
])

onMounted(async () => {
  const { getAllAbsenUsers, } = useabsenStores()
  const absens = await getAllAbsenUsers()

  // Untuk data banyak absen
  absensi.value = absens;
  chartOptions.value = {
    chart: {
      id: "Absen-chart"
    }, xaxis: {
      categories: absensi.value.map(item => item.tanggal)
    }
  }

  series.value[0].data = absensi.value.map(item => item.Izin)
  series.value[1].data = absensi.value.map(item => item.Hadir)
  series.value[2].data = absensi.value.map(item => item.Terlambat)
  series.value[3].data = absensi.value.map(item => item.Alpha)

  // Untuk data satu absen
  absensiToday.value = absensi.value.filter(item => item.tanggal === date)
  singgle.value = absensiToday.value[0]

  donutSeries.value[0] = absensiToday.value[0].Izin
  donutSeries.value[1] = absensiToday.value[0].Hadir
  donutSeries.value[2] = absensiToday.value[0].Terlambat
  donutSeries.value[3] = absensiToday.value[0].Alpha
})

</script>

<template>
  <Dialog :is-loading="loading" message="Buat Absen" title="Buat Absen Hari Ini ?" :is-open="isOpen" v-on:confirm="handleCreate"
    @close="isOpen = false" />
  <div class="w-full flex items-center justify-between">
    <Label class="text-blue-500 font-bold text-lg">
      Absen Charts
    </Label>
    <Button :disabled="singgle" @click="() => isOpen = true"
      class="bg-blue-500 flex hover:bg-blue-400 gap-1 cursor-pointer">
      <Plus class="w-5 h-5 text-white" />
      <p class="text-white font-semibold">Tambah</p>
    </Button>
  </div>
  <div class="w-full flex justify-between items-center h-full">
    <div class="w-[30%] flex-col flex gap-2 h-full">
      <Label class="w-full items-center justify-center flex">
        Absen Today
      </Label>
      <Label v-if="!singgle" class="w-full flex items-center justify-center h-full">
        Belum ada Absen Hari ini
      </Label>
      <apexchart v-if="singgle" type="donut" :series="donutSeries" :options="donutOptions" />
    </div>
    <div class="w-[70%] flex flex-col h-full">
      <Label class="w-full items-center justify-center flex">
        All Absens
      </Label>
      <apexchart type="line" height="250" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>
