import { baseUrl } from "@/lib/base-url";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
  id: string
  email: string
  name: string
  image: string
  role: string
}


export const useSessionStore = defineStore("auth", () => {
  const profile = ref<null | User>();
  const isloggedIn = ref(false)

  async function fetchSession() {
    try {
      const response = await axios.get(`${baseUrl}/user/details`, {
        withCredentials: true
      })

      const data = response.data.data;
      profile.value = data;
      isloggedIn.value = true
    } catch (error) {
      isloggedIn.value = false
      profile.value = null
      console.error(error)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}/user/signIn`, {
        email,
        password
      }, {
        withCredentials: true
      })

      isloggedIn.value = true
      return response.data.data
    } catch (error) {
      throw error
    }
  }

  async function signUp(email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}/user/create`, {
        email,
        password
      });

      return response.data.message;
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    try {
      const response = await axios.post(`${baseUrl}/user/logout`, {}, {
        withCredentials: true
      })

      isloggedIn.value = false
      profile.value = null
      return response.data.message;
    } catch (error) {
      throw error
    }
  }
  return { signIn, signUp, logout, fetchSession, profile, isloggedIn }

})
