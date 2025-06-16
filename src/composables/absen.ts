import { useabsenStores } from "@/stores/absen-store"
import axios from "axios"
import Swal from "sweetalert2"
import { ref } from "vue"
import { useRouter } from "vue-router"

export function useAbsen() {
  const loading = ref(false)
  const { createAbsenToday, userAbsenToday } = useabsenStores()
  const router = useRouter()
  async function createAbsen() {
    loading.value = true
    try {
      const result = await createAbsenToday()
      await Swal.fire({
        allowEscapeKey: true,
        cancelButtonText: 'Oke',
        timer : 3000,
        showConfirmButton :false,
        icon: 'success',
        title: 'Berhasil membuat absen',
        text: result
      })
      router.go(0)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          Swal.fire({
            allowEscapeKey: true,
            cancelButtonText: 'Oke',
            icon: 'error',
            title: 'Absen Hari ini sudah ada',
          })
        } else {
          Swal.fire({
            allowEscapeKey: true,
            cancelButtonText: 'Oke',
            icon: 'error',
            title: 'Gagal membuat absen',
            text: error.response?.data.message,
          })
        }
      }
    } finally {
      loading.value = false
    }
  }

  async function userAbsen(absenId: string, status: string) {
    loading.value = true
    try {
      const result = await userAbsenToday(absenId, status)
      await Swal.fire({
        allowEscapeKey: true,
        cancelButtonText: 'Oke',
        icon: 'success',
        title: 'Berhasil Melakukan Absensi',
        text: result
      })

      router.push("/dashboard/home")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          Swal.fire({
            allowEscapeKey: true,
            cancelButtonText: 'Oke',
            icon: 'error',
            title: 'Kamu sudah absen hari ini',
          })
          router.push("/dashboard/home")
        } else {
          Swal.fire({
            allowEscapeKey: true,
            cancelButtonText: 'Oke',
            icon: 'error',
            title: 'Gagal Melakukan absensi',
            text: error.response?.data.message,
          })
        }
      }
    } finally {
      loading.value = false
    }
  }

  return { createAbsen, userAbsen , loading }
}
