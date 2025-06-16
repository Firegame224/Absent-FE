<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from './ui/button';
import { Label } from './ui/label';
import type { PropType } from 'vue';

const props = defineProps({
  title: String,
  message: String,
  isOpen: Boolean,
  isLoading: Boolean,
  onConfirm: {
    type: Function as PropType<() => void>,
    required: true
  }
})

const emits = defineEmits(['close'])
</script>

<template>
  <AlertDialog :open="isOpen">
    <AlertDialogContent>
      <AlertDialogTitle>{{ props.title }}</AlertDialogTitle>
      <div class="w-full flex items-center justify-end gap-2">
        <Button @click="emits('close')" variant="ghost" type="button"
          class="w-20 p-3 bg-transparent transition duration-700 hover:bg-blue-300 hover:opacity-70 cursor-pointer">
          <Label class="text-blue-500 font-semibold text-[15px]">
            Batal
          </Label>
        </Button>
        <Button @click="props.onConfirm" :disabled="props.isLoading"
          class="w-[30%] p-3 bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 transition duration-700 hover:opacity-70 cursor-pointer">
          <Label class="text-white font-semibold text-[15px]">
            {{ props.isLoading ? 'Loading...' : `${props.message}` }}
          </Label>
        </Button>
      </div>
    </AlertDialogContent>
  </AlertDialog>
</template>
