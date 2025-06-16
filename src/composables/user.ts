import { useUserStores } from "@/stores/user-store";
import type { UpdateUser } from "@/types/user";
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useUser() {
  const { updateUser, deleteUser } = useUserStores()
  const loading = ref(false);
  const router = useRouter()
  async function UpdateUser(form: UpdateUser) {
    loading.value = true
    try {
      const result = await updateUser({ email: form.email, name: form.name, role: form.role, userId: form.userId })
      Swal.fire({
        allowEscapeKey: true,
        cancelButtonText: 'Oke',
        icon: 'success',
        title: 'Update Berhasil',
        text: result
      })

      router.go(0)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          allowEscapeKey: true,
          cancelButtonText: 'Oke',
          icon: 'error',
          title: 'Update Gagal',
          text: error.response?.data.message,
        })
      }
    } finally {
      loading.value = false
    }
  }
  async function DeleteUser(userId: string) {
    loading.value = true
    try {
      const result = await deleteUser(userId)
      await Swal.fire({
        allowEscapeKey: true,
        timer: 3000,
        showConfirmButton: false,
        icon: 'success',
        title: 'Berhasil menghapus user',
        text: result
      })

      router.go(0)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          allowEscapeKey: true,
          cancelButtonText: 'Oke',
          icon: 'error',
          title: 'Gagal menghapus user',
          text: error.response?.data.message,
        })
      }
    } finally {
      loading.value = false
    }
  }

  return { UpdateUser, DeleteUser, loading }
}
