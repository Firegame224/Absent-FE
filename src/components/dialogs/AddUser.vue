<script setup lang="ts">
import { ref } from 'vue';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import { useSession } from '@/composables/session';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
const props = defineProps({
  isOpen: Boolean
})

const emits = defineEmits(['close'])
const email = ref<string>("")
const password = ref<string>("")
const isPassword = ref<boolean>(false)

const { Register, errors, loading } = useSession()
const handleSubmit = async () => {
  const add = await Register({ email: email.value, password: password.value })
  if (add.success === true) {
    email.value = ""
    password.value = ""
    emits('close')
  }
}

</script>
<template>
  <AlertDialog :open="props.isOpen">
    <AlertDialogContent>
      <AlertDialogTitle>Tambahkan User</AlertDialogTitle>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col items-center justify-between h-full gap-5">
        <div class="w-full gap-1 flex flex-col">
          <Label for="email" class="text-[15px]"> Email:</Label>
          <Input v-model="email" :disabled="loading" id="email" type="email" placeholder="Masukan email..." required
            class="w-full p-3 rounded-sm h-10 text-sm focus-visible:ring-0" />
          <p v-if="errors.email" class="text-red-500 text-[14px] font-semibold">
            {{ errors.email }}
          </p>
        </div>
        <div class="w-full gap-1 flex flex-col">
          <Label for="password" class="text-[15px]"> Password:</Label>
          <Input v-model="password" :disabled="loading" id="password" v-bind:type="isPassword ? 'text' : 'password'"
            placeholder="Masukan password..." required
            class="w-full p-3 text-sm rounded-sm h-10 focus-visible:ring-0" />
          <div class="w-full flex gap-2 items-center">
            <input type="checkbox" v-model="isPassword" class="w-3 h-3" />
            <Label class="text-[12px]">Tampilkan Password !!</Label>
          </div>
          <p v-if="errors.password" class="text-red-500 text-[14px] font-semibold">
            {{ errors.password }}
          </p>
        </div>
        <div class="w-full flex items-center justify-end gap-2">
          <Button @click="emits('close')" variant="ghost" type="button"
            class="w-20 p-3 bg-transparent transition duration-700 hover:bg-blue-300 hover:opacity-70 cursor-pointer">
            <Label class="text-blue-500 font-semibold text-[15px]">
              Batal
            </Label>
          </Button>
          <Button type="submit" :disabled="loading"
            class="w-[30%] p-3 bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 transition duration-700 hover:opacity-70 cursor-pointer">
            <Label class="text-white font-semibold text-[15px]">
              {{ loading ? 'Mengirim...' : "Tambahkan" }}
            </Label>
          </Button>
        </div>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>
