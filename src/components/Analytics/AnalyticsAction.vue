<script setup lang="ts">
import { Copy, Edit, Edit3, Trash } from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Label } from '../ui/label';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import UpdateUser from '../dialogs/UpdateUser.vue';
import Dialog from '../Dialog.vue';
import { useUser } from '@/composables/user';

const { loading, DeleteUser } = useUser()

const isOpen = ref(false);
const isDelete = ref(false);
const itemMenu = [
  {
    name: "Copy Id",
    icon: Copy,
    action: () => {
      navigator.clipboard.writeText(props.userId as string)
      Swal.fire({
        showConfirmButton: false,
        timer: 2000,
        title: "Berhasil menyalin userId",
        icon: "success"
      })
    }
  },
  {
    name: "Edit data",
    icon: Edit3,
    action: () => {
      isOpen.value = true
    }
  },
  {
    name: "Hapus data",
    icon: Trash,
    action: () => {
      isDelete.value = true
    }
  }
]

const handleDelete = async () => {
  await DeleteUser(props.userId as string)
  isDelete.value = false
}

const props = defineProps({
  userId: String
})

</script>

<template>
  <Dialog message="Konfirmasi" :is-open="isDelete" :is-loading="loading" title="Apakah anda yakin?"
    v-on:confirm="handleDelete" @close="isDelete = false" />
  <UpdateUser :is-open="isOpen" :user-id="props.userId" @close="() => isOpen = false" />
  <div class="w-full">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Edit class="w-5 h-5 text-blue-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel class="items-center text-blue-500 justify-center flex">Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="item.action" v-for="item in itemMenu" :key="item.name"
          class="w-full flex items-center justify-start gap-2">
          <component :is="item.icon" class="w-5 h-5 text-black" />
          <Label class="font-semibold text-sm">{{ item.name }}</Label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
