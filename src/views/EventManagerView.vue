<template>
  <div class="max-w-full mx-10 mt-8 p-4 border border-gray-700 rounded-lg shadow-lg h-[82vh]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Event Management</h2>
      <button
        class="bg-gray-500 hover:bg-gray-700 text-white mr-4 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors"
        @click="showModal = true"
      >
        Add Event
      </button>
    </div>
    <div class="bg-white p-4 rounded-lg">
      <Event />
    </div>
    <AddEventModal :showModal="showModal" @close="showModal = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Event from '@/components/Event.vue'
import AddEventModal from '@/components/AddEventModal.vue'

export default defineComponent({
  components: {
    Event,
    AddEventModal,
  },
  data() {
    return {
      showModal: false as boolean,
    }
  },
})
</script>
