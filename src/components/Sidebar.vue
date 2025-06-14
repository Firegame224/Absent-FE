<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/composables/session';
import { useSessionStore } from '@/stores/session-store';
import { Calendar, ChartAreaIcon, LucideLogOut } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { path } = useRoute()
const items = [
  {
    name: "Absen",
    role: "absen",
    path: "/dashboard/absen",
    icon: Calendar
  },
  {
    name: "Analystic",
    role: "Admin",
    path: "/dashboard",
    icon: ChartAreaIcon
  }
]

const itemwithRole = computed(() => {
  return items.filter((item) => item.role === profile?.role)
})

const { profile } = useSessionStore()
const { Logout } = useSession();

const handleLogout = async () => {
  await Logout();
}

const router = useRouter()

</script>

<template>
  <aside class="w-80 fixed flex flex-col bg-blue-500 rounded-r-sm h-screen pb-5">
    <!-- User Detail -->
    <div class="w-full flex bg-transparent pl-5 pt-5 items-center justify-center gap-2">
      <div class="h-10 w-12">
        <img :src="profile?.image" class="w-full h-full rounded-full border-black border" />
      </div>
      <div class="w-full flex-col flex items-start justify-start">
        <p class="text-[15px] font-bold text-white">{{ profile?.name || "name" }}</p>
        <p class="text-[13px] font-semibold text-white">{{ profile?.email || "email" }}</p>
      </div>
    </div>
    <Separator class="my-5 border-1" />
    <!-- SideBar menu -->
    <div class="w-full flex flex-col h-full justify-between">
      <div class="w-full flex flex-col px-3 gap-2">
        <p class="text-white font-semibold text-[15px] w-full px-3">Sidebar Menu</p>
        <Button @click="router.push(item.path)" v-for="item in itemwithRole" :key="item.name"
          :class="['w-full bg-transparent justify-start items-start flex px-5 hover:bg-blue-600', path === item.path ? 'bg-blue-600' : 'bg-transparent']">
          <component :is="item.icon" class="w-5 h-5" />
          <p class="text-white font-semibold">{{ item.name }}</p>
        </Button>
      </div>
      <div class="w-full flex flex-col px-3 gap-2 items-center">
        <Button @click="handleLogout" class="w-full bg-transparent justify-start items-start flex px-5">
          <LucideLogOut class="w-5 h-5" />
          <p class="text-white font-semibold">Logout</p>
        </Button>
      </div>
    </div>
  </aside>
</template>
