import { defineStore } from "pinia";
import Swal from "sweetalert2";


export const useAuthStore = defineStore("auth", () => {
  function signIn(email: string) {
    try {
      Swal.fire({
        title: `Halooo ${email}`,
        icon: "success",
        allowEscapeKey: true,
        cancelButtonText: "Okay",
      })
    } catch (error) {
      console.error(error);
    }
  }

  return { signIn }

})
