<template>
  <div>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      v-if="showModal"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <header class="flex justify-between items-center p-4 border-b">
          <h2 class="text-lg font-semibold">Event Details</h2>
          <button class="text-gray-500 hover:text-gray-700" @click="closeModal">
            <span class="sr-only">Close</span>
            &times;
          </button>
        </header>
        <section class="p-4">
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700">Event Name</h3>
            <p class="text-lg text-gray-800">{{ eventData.name }}</p>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700">Date</h3>
            <p class="text-lg text-gray-800">{{ formatDate(eventData.date) }}</p>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700">Location</h3>
            <p class="text-lg text-gray-800">{{ eventData.location }}</p>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700">Description</h3>
            <p class="text-lg text-gray-800">{{ eventData.description }}</p>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700">Participants</h3>
            <ul class="list-disc list-inside text-gray-800">
              <li v-for="participant in eventData.participants" :key="participant.id">
                {{ participant.name }}
              </li>
            </ul>
          </div>
        </section>
        <footer class="flex justify-end p-4 border-t">
          <button
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            @click="closeModal"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    eventData: {
      type: Object,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const fetchedEventData = ref(null)

    const closeModal = (): void => {
      emit('close')
    }

    const formatDate = (dateString: string): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' }
      return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
    }

    const fetchEventData = async (): Promise<void> => {
      try {
        const response = await fetch('/events')
        if (!response.ok) {
          throw new Error('Failed to fetch event data')
        }
        fetchedEventData.value = await response.json()
      } catch (error) {
        console.error('Error fetching event data:', error)
      }
    }

    watch(
      () => props.showModal,
      (newVal) => {
        if (newVal) {
          fetchEventData()
        }
      },
    )

    return {
      fetchedEventData,
      closeModal,
      formatDate,
    }
  },
})
</script>
