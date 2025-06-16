<script setup lang="ts">
import { convertDate } from '@/lib/helpers/date';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Label } from '../ui/label';
import { Calendar } from 'lucide-vue-next';
import type { userAbsen, AbsenTodayType } from '@/types/absen';
import { onMounted, ref } from 'vue';
import { useabsenStores } from '@/stores/absen-store';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const absenToday = ref<AbsenTodayType>()
const absenUserToday = ref<userAbsen>()
const router = useRouter()
const handleClick = () => {
  if (absenUserToday.value?.absen_status === true) {
    Swal.fire({
      allowEscapeKey: true,
      cancelButtonText: 'Oke',
      icon: 'error',
      title: 'Kamu sudah absen hari ini',
    })
  } else {
    router.push(`/dashboard/home/${absenToday.value?.id}`)
  }
}

onMounted(async () => {
  const { getAbsenToday, getUserAbsenToday } = useabsenStores()
  const absen = await getAbsenToday()
  const userAbsen = await getUserAbsenToday()

  absenUserToday.value = userAbsen
  absenToday.value = absen
})

</script>

<template>
  <div class="w-full grid grid-cols-2 px-5">
    <Card @click="handleClick"
      class="bg-gray-200 shadow-sm shadow-black relative hover:opacity-70 transition duration-700 cursor-pointer">
      <div
        :class="[absenUserToday?.absen_status === true ? 'bg-blue-500' : 'bg-red-500', 'absolute top-0 right-0 rounded-tr-xl p-2']">
        <Label class="text-white font-semibold text-sm">{{ absenUserToday?.absen_status === true ? "Sudah Absen" :
          "Belum Absen" }}</Label>
      </div>
      <CardHeader class="w-full flex items-center justify-between">
        <Label class="text-sm font-semibold">{{ convertDate(new Date()) }}</Label>
      </CardHeader>
      <CardContent class="w-full flex items-center justify-between">
        <div class="w-[12%]  h-full flex items-">
          <Calendar class="w-full h-auto " />
        </div>
        <div class="w-[90%] h-full flex flex-col pt-1 px-5">
          <Label class="text-sm font-semibold">Jumlah Pengguna :{{ absenToday?.userAbsens?.length }}</Label>
          <Label class="text-[12px] text-gray-500 font-semibold h-full">Silahkan melakukan absensi jika memang belum
            melakukan absensi
          </Label>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
