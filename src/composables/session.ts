import router from "@/router"
import { signSchema, type signInForm } from "@/schema/login-schema"
import { useSessionStore } from "@/stores/session-store"
import axios from "axios"
import Swal from "sweetalert2"
import { ref } from "vue"
import { z } from "zod"

export function useSession() {
  const loading = ref(false);
  const errors = ref<Partial<Record<keyof signInForm, string>>>({})

  const { signIn, signUp, logout } = useSessionStore()
  async function Register(form: signInForm) {
    loading.value = true
    try {
      signSchema.parse({ email: form.email, password: form.password })
      const result = await signUp(form.email, form.password)
      Swal.fire({
        allowEscapeKey: true,
        cancelButtonText: 'Oke',
        icon: 'success',
        title: 'Berhasil membuat user',
      })

      if (result === 'User') {
        router.push('/home')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const issue of error.issues) {
          errors.value[issue.path[0] as keyof signInForm] = issue.message
        }
      } else if (axios.isAxiosError(error)) {
        Swal.fire({
          allowEscapeKey: true,
          cancelButtonText: 'Oke',
          icon: 'error',
          title: 'Gagal membuat user',
          text: error.response?.data.message,
        })
      }
    } finally {
      loading.value = false
    }
  }
  async function Login(form: signInForm) {
    loading.value = true
    try {
      signSchema.parse({ email: form.email, password: form.password })
      const result = await signIn(form.email, form.password)
      Swal.fire({
        allowEscapeKey: true,
        cancelButtonText: 'Oke',
        icon: 'success',
        title: 'login Berhasil',
      })

      if (result === 'User') {
        router.push('/home')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const issue of error.issues) {
          errors.value[issue.path[0] as keyof signInForm] = issue.message
        }
      } else if (axios.isAxiosError(error)) {
        Swal.fire({
          allowEscapeKey: true,
          cancelButtonText: 'Oke',
          icon: 'error',
          title: 'login gagal',
          text: error.response?.data.message,
        })
      }
    } finally {
      loading.value = false
    }
  }
  async function Logout() {
    try {
      const result = await logout()
      Swal.fire({
        allowEscapeKey: true,
        cancelButtonText: "Oke",
        cancelButtonColor: "Blue",
        icon: "success",
        title: "Logout berhasil",
        text: result
      })
      router.push("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          allowEscapeKey: true,
          cancelButtonText: 'Oke',
          icon: 'error',
          title: 'logout gagal',
          text: error.response?.data.message,
        })
      } else {
        console.error(error)
      }
    }
  }
  return { Login, Logout, Register, errors: errors.value, loading: loading.value }
}
