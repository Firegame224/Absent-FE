<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import { useUserStores } from '@/stores/user-store';
import type { User } from '@/types/user';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useUser } from '@/composables/user';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { CheckIcon, Users } from 'lucide-vue-next';

const props = defineProps({
  isOpen: Boolean,
  userId: String
})

const roles = [
  {
    key: "User",
    value: "user"
  },
  {
    key: "Admin",
    value: "admin"
  }
]
const emits = defineEmits(["close"])

const email = ref("")
const name = ref("")
const role = ref("")
const selected = ref("")

const onOpen = ref(false)

const userdata = ref<User>()
const { UpdateUser, loading } = useUser()

const handleSubmit = async () => {
  await UpdateUser({ email: email.value, name: name.value, role: role.value, userId: props.userId as string })
}

const handleSelected = (selectedKey: string, selecteedValue: string) => {
  selected.value = selectedKey
  role.value = selecteedValue
  onOpen.value = false
}

onMounted(async () => {
  const { userById } = useUserStores()
  const data = await userById(props.userId as string)
  userdata.value = data
  email.value = userdata.value?.email as string
  name.value = userdata.value?.name as string
  role.value = userdata.value?.role as string
  selected.value = role.value
})

</script>

<template>
  <AlertDialog :open="isOpen">
    <AlertDialogContent>
      <AlertDialogTitle>Update User</AlertDialogTitle>
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col items-center justify-between h-full gap-5">
        <div class="w-full gap-1 flex flex-col">
          <Label for="email" class="text-[15px]">Email:</Label>
          <Input v-model="email" id="email" type="email" placeholder="Email user" required
            class="w-full p-3 rounded-sm h-10 text-sm focus-visible:ring-0" />
        </div>
        <div class="w-full gap-1 flex flex-col">
          <Label for="password" class="text-[15px]">Nama :</Label>
          <Input v-model="name" id="password" type="text" placeholder="Nama user" required
            class="w-full p-3 text-sm rounded-sm h-10 focus-visible:ring-0" />
        </div>
        <div class="w-full flex items-start justify-center flex-col gap-1">
          <Label for="password" class="text-[16px]">Role :</Label>
          <Popover :open="onOpen">
            <PopoverTrigger>
              <Button @click="onOpen = true" type="button" :variant="selected ? 'default' : 'outline'"
                :class="[selected ? 'bg-blue-500 text-white' : 'text-blue-500', 'gap-2 w-[200px] h-10 flex justify-center bg-blue-500 text-white font-semibold hover:bg-blue-200 transition duration-700']">
                <Users class="w-5 h-5 " />
                {{ selected ? selected : role || "Pilih role" }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-2">
              <Command>
                <CommandList class="p-0">
                  <CommandGroup class="w-full p-0 gap-2 flex flex-col">
                    <CommandItem v-on:select="() => handleSelected(role.key, role.value)" v-for="role in roles"
                      :class="[selected === role.key ? 'bg-blue-500 text-white' : 'text-blue-500', 'gap-2 w-full flex justify-between']"
                      :key="role.key" :value="role.key">
                      {{ role.key }}
                      <CheckIcon v-if="selected === role.key" class="text-green-500 w-7 h-7 items-end justify-end" />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
