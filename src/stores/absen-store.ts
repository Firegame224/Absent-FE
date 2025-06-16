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

  async function getAbsenToday() {
    try {
      const response = await axios.get(`${baseUrl}/absen/today`, {
        withCredentials: true
      })

      const data = response.data.data;

      return data
    } catch (error) {
      throw error
    }
  }

  async function getAbsenById(absenId: string) {
    try {
      const response = await axios.get(`${baseUrl}/absen/${absenId}`)

      return response.data.data;
    } catch (error) {
      throw error
    }
  }
  async function getUserAbsenToday() {
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

  async function userAbsenToday(absenId: string, status: string) {
    try {
      const response = await axios.post(`${baseUrl}/absen/today-user`, {
        absenId,
        status
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
      const response = await axios.post(`${baseUrl}/absen/today`, {}, {
        withCredentials: true
      })

      return response.data.message;
    } catch (error) {
      throw error
    }
  }



  return { getAllAbsenUsers, getAbsenById, getAbsenToday, userAbsenToday, createAbsenToday, getUserAbsenToday }
})
