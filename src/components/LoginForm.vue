<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSession } from '@/composables/session'
import { ref } from 'vue'

const isPassword = ref(true)
const email = ref('')
const password = ref('')

const { Login, errors, loading } = useSession()

async function handleSubmit() {
  await Login({ email: email.value, password: password.value })
}

</script>

<template>
  <Card class="w-[30%] p-3 py-5 h-full relative">
    <CardHeader class="p-5 flex flex-col">
      <p class="text-black font-bold text-3xl">
        SignIn to <span class="text-blue-500">Kyy-Absent</span>
      </p>
      <p class="text-gray-400 text-[14px]">Silahkan masuk dengan akun yang disediakan.</p>
    </CardHeader>
    <CardContent class="py-5">
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col items-center justify-between h-full gap-5">
        <div class="w-full gap-1 flex flex-col">
          <Label for="email"> Email Anda :</Label>
          <Input v-model="email" :disabled="loading" id="email" type="email" placeholder="Masukan email anda.." required
            class="w-full p-5 rounded-sm focus-visible:ring-0" />
          <p v-if="errors.email" class="text-red-500 text-[14px] font-semibold">
            {{ errors.email }}
          </p>
        </div>
        <div class="w-full gap-1 flex flex-col">
          <Label for="password"> Password anda :</Label>
          <Input v-model="password" :disabled="loading" id="password" v-bind:type="isPassword ? 'text' : 'password'"
            placeholder="Masukan password anda.." required class="w-full p-5 rounded-sm focus-visible:ring-0" />
          <div class="w-full flex gap-2 items-center">
            <input type="checkbox" v-model="isPassword" class="w-3 h-3" />
            <Label class="text-[12px]">Tampilkan Password !!</Label>
          </div>
          <p v-if="errors.password" class="text-red-500 text-[14px] font-semibold">
            {{ errors.password }}
          </p>
        </div>
        <Button type="submit" :disabled="loading"
          class="w-full mt-10 p-5 bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 transition duration-700 hover:opacity-70 cursor-pointer">
          <Label class="text-white font-semibold text-[15px]">
            {{ loading ? 'Mengirim...' : 'SignIn' }}
          </Label>
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
