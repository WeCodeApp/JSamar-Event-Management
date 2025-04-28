<template>
  <div>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      v-if="showModal"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <header class="flex justify-between items-center p-4 border-b">
          <h2 class="text-lg font-semibold">Create Event</h2>
          <button class="text-gray-500 hover:text-gray-700" @click="closeModal">
            <span class="sr-only">Close</span>
            &times;
          </button>
        </header>
        <section class="p-4">
          <form @submit.prevent="createEvent">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg py-3 px-4"
                type="text"
                v-model="eventName"
                placeholder="Enter event name"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Date</label>
              <input
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg py-3 px-4"
                type="date"
                v-model="eventDate"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Location</label>
              <input
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg py-3 px-4"
                type="text"
                v-model="eventLocation"
                placeholder="Enter event location"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg py-3 px-4"
                v-model="eventDescription"
                placeholder="Enter event description"
              ></textarea>
            </div>
          </form>
        </section>
        <footer class="flex justify-end p-4 border-t">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            @click="createEvent"
          >
            Save
          </button>
          <button
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            @click="closeModal"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const eventName = ref('')
    const eventDate = ref('')
    const eventLocation = ref('')
    const eventDescription = ref('')

    const closeModal = (): void => {
      emit('close')
    }

    const createEvent = async (): Promise<void> => {
      try {
        const newEvent = {
          id: Date.now(),
          name: eventName.value,
          date: eventDate.value,
          location: eventLocation.value,
          description: eventDescription.value,
          participants: [],
        }
        const response = await fetch('http://localhost:3000/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEvent),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        console.log('Event added:', newEvent)
        alert('Event added successfully!')
        closeModal()
      } catch (error) {
        console.error('Error adding event:', error)
      }
    }

    return {
      eventName,
      eventDate,
      eventLocation,
      eventDescription,
      closeModal,
      createEvent,
    }
  },
})
</script>
