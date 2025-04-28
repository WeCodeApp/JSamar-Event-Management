<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  collapsible?: boolean
}>()

const emit = defineEmits(['toggle-collapse'])
</script>

<template>
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    :class="cn('flex items-center justify-between p-2', props.class)"
  >
    <slot />
    <button
      v-if="collapsible"
      class="text-sidebar-foreground hover:text-sidebar-primary transition"
      @click="$emit('toggle-collapse')"
    >
      <ChevronLeft v-if="!$attrs['data-collapsed']" class="w-5 h-5" />
      <ChevronRight v-else class="w-5 h-5" />
    </button>
  </div>
</template>
