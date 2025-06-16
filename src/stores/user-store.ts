import { baseUrl } from "@/lib/base-url";
import type { User } from "@/types/user";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStores = defineStore("user", () => {
  const data = ref<User[]>()

  async function getAllUser() {
    try {
      const response = await axios.get(`${baseUrl}/user`, {
        withCredentials: true
      })

      data.value = await response.data.data
      return response.data.data
    } catch (error) {
      throw error
    }
  }

  async function updateUser(data: { email: string, name: string, role: string, userId: string }) {
    try {
      const response = await axios.patch(`${baseUrl}/user`, {
        email: data.email,
        name: data.name,
        role: data.role,
        userId: data.userId
      }, {
        withCredentials: true
      })

      return response.data.message
    } catch (error) {
      throw error
    }
  }

  async function userById(userId: string) {
    try {
      const response = await axios.get(`${baseUrl}/user/${userId}`, {
        withCredentials: true
      })
      return response.data.data
    } catch (error) {
      throw error
    }
  }

  async function deleteUser(userId: string) {
    try {
      const response = await axios.delete(`${baseUrl}/user`, {
        data: { userId },
        withCredentials: true
      })
      return response.data.message
    } catch (error) {
      throw error
    }
  }
  return { data: data.value, getAllUser, userById, updateUser , deleteUser }
})
