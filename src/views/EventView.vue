<template>
  <div class="max-w-full h-[82vh] mx-10 mt-8 p-4 border border-gray-700 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Events</h2>
    <div class="bg-white p-4 rounded-lg">
      <EventList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EventList from '@/components/EventList.vue'

export default defineComponent({
  components: {
    EventList,
  },
})
</script>
