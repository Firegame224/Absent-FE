<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAbsen } from '@/composables/absen';
import { convertDate } from '@/lib/helpers/date';
import { useabsenStores } from '@/stores/absen-store';
import type { userAbsen, AbsenTodayType } from '@/types/absen';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute()
const absenById = ref<AbsenTodayType>()
const userAbsensi = ref<userAbsen>()
const selected = ref<string>("")

const radioItem = [
  {
    key: "Hadir",
    value: "hadir"
  },
  {
    key: "Izin",
    value: "izin"
  },
  {
    key: "Terlambat",
    value: "terlambat"
  },
  {
    key: "Alpha",
    value: "alpha"
  }
]

const { getAbsenById, getUserAbsenToday } = useabsenStores()

const { userAbsen, loading } = useAbsen()

const handleSubmit = async () => {
  await userAbsen(router.params.absenId as string, selected.value)
}

onMounted(async () => {
  const absen = await getAbsenById(router.params.absenId as string)
  const absenToday = await getUserAbsenToday()
  absenById.value = absen
  userAbsensi.value = absenToday
})

</script>

<template>
  <div class="w-full flex flex-col bg-gray-300 min-h-screen p-5 gap-2">
    <div class="w-full">
      <Label class="text-blue-500 font-bold text-lg">
        Absen page
      </Label>
    </div>
    <section class="w-full h-screen bg-white p-10 gap-2 rounded-md shadow shadow-gray-500 flex flex-col">
      <div class="w-full items-start justify-center flex flex-col">
        <Label class="text-black font-bold text-xl">Absen : {{ convertDate(new Date()) }} </Label>
        <Label class="text-gray-500 font-semibold text-sm">Isi Data Kehadiran Anda dibawah ini</Label>
      </div>
      <div class="w-full h-full">
        <form @submit.prevent="handleSubmit"
          class="w-full h-full p-14 bg-blue-500 shadow-black shadow-sm rounded-sm flex flex-col">
          <Label class="text-xl text-white font-semibold ">Silahkan pilih status kehadiran anda hari ini!</Label>
          <div class="w-full h-full mt-10">
            <RadioGroup v-model="selected" :default-value="userAbsensi?.status" orientation="horizontal"
              class="w-full items-center flex gap-5">
              <div v-for="item in radioItem" :key="item.key" class="flex items-center space-x-2">
                <RadioGroupItem :id="item.key" :value="item.value" />
                <Label class="cursor-pointer flex items-center gap-3 px-5 py-3 rounded-lg border text-white
             bg-blue-500 border-white font-semibold transition-all duration-300
             peer-checked:bg-white peer-checked:text-blue-600 peer-checked:border-white" :for="item.key">
                  {{ item.key }}
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div class="w-full flex items-center justify-center">
            <p class="text-white font-semibold text-sm">
              {{ selected ? `${selected} Terpilih` : "Belum ada status yg dipilih" }}
            </p>
          </div>
          <Button :disabled="loading" type="submit"
            class="mt-10 w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
            {{ loading ? "Loading...." : "Simpan Kehadiran" }}
          </Button>

        </form>
      </div>
    </section>
  </div>
</template>
