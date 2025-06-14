import { baseUrl } from "@/lib/base-url";
import axios from "axios";
import { defineStore } from "pinia";

export const useabsenStores = defineStore("absen", () => {

  async function getAllAbsenUsers() {
    try {
      const response = await axios.get(`${baseUrl}/absen`, {
        withCredentials: true
      })

      const data = response.data.data;

      return data
    } catch (error) {
      throw error
    }
  }

  async function getAbsenUserToday() {
    try {
      const response = await axios.get(`${baseUrl}/absen/today-user`, {
        withCredentials: true
      })

      const data = response.data.data;

      return data
    } catch (error) {
      throw error
    }
  }
  async function userAbsenToday(absenId: string) {
    try {
      const response = await axios.post(`${baseUrl}/absen/Today`, {
        absenId
      }, {
        withCredentials: true
      })

      return response.data.message;
    } catch (error) {
      throw error
    }
  }
  async function createAbsenToday() {
    try {
      const response = await axios.post(`${baseUrl}/absen`, {}, {
        withCredentials: true
      })

      return response.data.message;
    } catch (error) {
      throw error
    }
  }
  return { getAllAbsenUsers, getAbsenUserToday, userAbsenToday, createAbsenToday }
})
