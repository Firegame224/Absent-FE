<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUserStores } from '@/stores/user-store'
import type { User } from '@/types/user';
import { computed, onMounted, ref } from 'vue';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import AnalyticsAction from './AnalyticsAction.vue'
import { Plus } from 'lucide-vue-next';
import AddUser from '../dialogs/AddUser.vue';
const isOpen = ref(false)

const admins = ref<User[]>()
const adminPage = ref<number>(1)
const adminLimit = ref<number>(10)
const adminTables = computed(() => {
  const start = (adminPage.value - 1) * adminLimit.value
  const end = start + userLimit.value
  return admins.value?.slice(start, end) || []
})
const adminMax = ref();

const users = ref<User[]>()
const userPage = ref<number>(1)
const userLimit = ref<number>(10)
const userTables = computed(() => {
  const start = (userPage.value - 1) * userLimit.value
  const end = start + userLimit.value

  return users.value?.slice(start, end) || []
})

const userMax = ref()


const tableHead = ["Name", "Email", "Role", "Bergabung", "Aksi"]

onMounted(async () => {
  const { getAllUser, } = useUserStores()
  const data = await getAllUser()

  admins.value = data.filter((item: User) => item.role === "Admin")
  adminMax.value = Math.ceil((admins?.value?.length ?? 0) / adminLimit.value)


  users.value = data.filter((item: User) => item.role === "User")
  userMax.value = Math.ceil((users.value?.length ?? 0) / userLimit.value)
})

</script>

<template>
  <AddUser :is-open="isOpen" @close="isOpen = false" />
  <div class="w-full flex items-center justify-between">
    <Label class="text-blue-500 font-bold text-lg">
      Users Table
    </Label>
    <Button @click="() => isOpen = true" class="bg-blue-500 flex hover:bg-blue-400 gap-1 cursor-pointer">
      <Plus class="w-5 h-5 text-white" />
      <p class="text-white font-semibold">Tambah</p>
    </Button>
  </div>
  <div class="w-full flex flex-col gap-5">
    <!-- Admin Table -->
    <Table class="border-gray-400 border">
      <TableCaption>All User With Role Admin</TableCaption>
      <TableHeader>
        <TableRow class="bg-blue-500 hover:bg-blue-500 rounded">
          <TableHead v-for="head in tableHead" :key="head" class="text-white font-semibold">
            {{ head }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="admin in adminTables" :key="admin.id">
          <TableCell>
            {{ admin.name }}
          </TableCell>
          <TableCell>
            {{ admin.email }}
          </TableCell>
          <TableCell>
            {{ admin.role }}
          </TableCell>
          <TableCell>
            {{ admin.createdAt.toLocaleString().split("T")[0] }}
          </TableCell>
          <TableCell>
            <AnalyticsAction :user-id="admin.id" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <section class="w-full flex items-center justify-end gap-3">
      <Button :disabled="adminPage === 1 || adminTables.length === 0" @click="() => adminPage--"
        class="bg-blue-500 flex hover:bg-blue-400 gap-1 cursor-pointer">Prev</Button>
      <Label class="text-blue-500 font-bold text-lg">{{ adminPage }}</Label>
      <Button :disabled="adminPage === adminMax || adminTables.length === 0" @click="() => adminPage++"
        class="bg-blue-500 flex hover:bg-blue-400 gap-1 cursor-pointer">Next</Button>
    </section>
    <!-- User Table -->
    <Table class="border-gray-400 border">
      <TableCaption>All User With Role User</TableCaption>
      <TableHeader>
        <TableRow class="bg-blue-500 hover:bg-blue-500 rounded">
          <TableHead v-for="head in tableHead" :key="head" class="text-white font-semibold">
            {{ head }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in userTables" :key="user.id">
          <TableCell>
            {{ user.name }}
          </TableCell>
          <TableCell>
            {{ user.email }}
          </TableCell>
          <TableCell>
            {{ user.role }}
          </TableCell>
          <TableCell>
            {{ user.createdAt.toLocaleString().split("T")[0] }}
          </TableCell>
          <TableCell>
            <AnalyticsAction :user-id="user.id" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <section class="w-full flex items-center justify-end gap-3">
      <Button :disabled="userPage === 1 || userTables?.length === 0" @click="() => userPage--"
        class="bg-blue-500 flex hover:bg-blue-400 gap-1 cursor-pointer">Prev</Button>
      <Label class="text-blue-500 font-bold text-sm">{{ userPage }}</Label>
      <Button :disabled="userPage === userMax || userTables?.length === 0"
        @click="() => userPage = Math.min(userMax, userPage + 1)"
        class="bg-blue-500 flex hover:bg-blue-400 gap-1 cursor-pointer">Next</Button>
    </section>
  </div>
</template>
