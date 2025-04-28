<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Pencil, Trash2, BookUser } from 'lucide-vue-next'
import UpdateEventModal from './UpdateEventModal.vue'
import ViewEventModal from './ViewEventModal.vue'

interface Event {
  id: number
  name: string
  date: string
  location: string
  description: string
}

export default defineComponent({
  name: 'Event',
  components: {
    UpdateEventModal,
    ViewEventModal,
    Pencil,
    Trash2,
    BookUser,
  },
  setup() {
    const events = ref<Event[]>([])
    const showEditModal = ref(false)
    const showViewModal = ref(false)
    const selectedEvent = ref<Event | null>(null)

    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        events.value = await response.json()
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    const formatDate = (dateString: string): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' }
      return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
    }

    const openEditModal = (event: Event) => {
      selectedEvent.value = event
      showEditModal.value = true
    }

    const closeEditModal = () => {
      showEditModal.value = false
      selectedEvent.value = null
    }

    const handleEventUpdate = (updatedEvent: Event) => {
      const index = events.value.findIndex((event) => event.id === updatedEvent.id)
      if (index !== -1) {
        events.value[index] = updatedEvent
      }
      closeEditModal()
    }

    const deleteEvent = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        console.log(`Event with ID ${id} deleted successfully.`)
        events.value = events.value.filter((event) => event.id !== id)
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }

    const viewEvent = (id: number) => {
      const event = events.value.find((event) => event.id === id)
      if (event) {
        selectedEvent.value = event
        showViewModal.value = true
      }
    }

    const closeViewModal = () => {
      showViewModal.value = false
      selectedEvent.value = null
    }

    onMounted(() => {
      fetchEvents()
    })

    return {
      events,
      showEditModal,
      showViewModal,
      selectedEvent,
      fetchEvents,
      formatDate,
      openEditModal,
      closeEditModal,
      handleEventUpdate,
      deleteEvent,
      viewEvent,
      closeViewModal,
    }
  },
})
</script>

<template>
  <div class="overflow-x-auto h-[70vh]">
    <table
      class="table-auto border-collapse border border-gray-300 w-full text-left shadow-lg rounded-lg"
    >
      <thead class="bg-gray-500 text-white">
        <tr>
          <th class="border border-gray-300 px-6 py-3 text-sm font-semibold uppercase">
            Event Name
          </th>
          <th class="border border-gray-300 px-6 py-3 text-sm font-semibold uppercase">Date</th>
          <th class="border border-gray-300 px-6 py-3 text-sm font-semibold uppercase">Location</th>
          <th class="border border-gray-300 px-6 py-3 text-sm font-semibold uppercase">
            Description
          </th>
          <th class="border border-gray-300 px-6 py-3 text-sm font-semibold uppercase">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="event in events"
          :key="event.id"
          class="hover:bg-gray-100 transition-colors even:bg-gray-50"
        >
          <td class="border border-gray-300 px-6 py-4 text-gray-800">{{ event.name }}</td>
          <td class="border border-gray-300 px-6 py-4 text-gray-800">
            {{ formatDate(event.date) }}
          </td>
          <td class="border border-gray-300 px-6 py-4 text-gray-800">{{ event.location }}</td>
          <td class="border border-gray-300 px-6 py-4 text-gray-800">{{ event.description }}</td>
          <td class="border border-gray-300 px-6 py-4 flex gap-3 justify-center">
            <button
              class="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition"
              @click="openEditModal(event)"
            >
              <Pencil class="w-5 h-5" />
            </button>
            <button
              class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
              @click="deleteEvent(event.id)"
            >
              <Trash2 class="w-5 h-5" />
            </button>
            <button
              class="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-100 transition"
              @click="viewEvent(event.id)"
            >
              <BookUser class="w-5 h-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Update Event Modal -->
    <UpdateEventModal
      v-if="showEditModal"
      :showModal="showEditModal"
      :eventData="selectedEvent || {}"
      @close="closeEditModal"
      @update="handleEventUpdate"
    />

    <!-- View Event Modal -->
    <ViewEventModal
      v-if="showViewModal"
      :showModal="showViewModal"
      :eventData="selectedEvent || {}"
      @close="closeViewModal"
    />
  </div>
</template>
