import { baseUrl } from "@/lib/base-url";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

interface user {
  id: string
  email: string,
  name: string,
  image: string
}


export const useSessionStore = defineStore("auth", () => {
  const User = ref<user>();
  const isloggedIn = ref(false)

  async function userSession() {
    try {
      const response = await axios.get(`${baseUrl}/user/details`, {
        withCredentials: true
      })
      const data = response.data.data;
      if (data) {
        User.value = data;
      } else {
        User.value = undefined
      }
    } catch (error) {
      throw error
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
  return { signIn, userSession, User, isloggedIn }

})
