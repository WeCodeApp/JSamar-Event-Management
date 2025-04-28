<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface User {
  id: number
  name: string
}

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
  emits: ['close', 'update'],
  setup(props, { emit }) {
    const eventName = ref(props.eventData.name as string)
    const eventDate = ref(props.eventData.date as string)
    const eventLocation = ref(props.eventData.location as string)
    const eventDescription = ref(props.eventData.description as string)
    const participants = ref<User[]>(props.eventData.participants || [])
    const users = ref<User[]>([])
    const selectedParticipant = ref<User | null>(null)

    const closeModal = (): void => {
      emit('close')
    }

    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:3000/users')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        users.value = await response.json()
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    const addParticipant = (): void => {
      if (
        selectedParticipant.value &&
        !participants.value.find((p) => p.id === selectedParticipant.value!.id)
      ) {
        participants.value.push(selectedParticipant.value)
        selectedParticipant.value = null
      }
    }

    const removeParticipant = (participantId: number): void => {
      participants.value = participants.value.filter((p) => p.id !== participantId)
    }

    const updateEvent = async (): Promise<void> => {
      try {
        const updatedEvent = {
          id: props.eventData.id,
          name: eventName.value,
          date: eventDate.value,
          location: eventLocation.value,
          description: eventDescription.value,
          participants: participants.value,
        }
        const response = await fetch(`http://localhost:3000/events/${props.eventData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEvent),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        console.log('Event updated:', updatedEvent)
        alert('Event updated successfully!')
        emit('update', updatedEvent)
        closeModal()
      } catch (error) {
        console.error('Error updating event:', error)
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      eventName,
      eventDate,
      eventLocation,
      eventDescription,
      participants,
      users,
      selectedParticipant,
      closeModal,
      fetchUsers,
      addParticipant,
      removeParticipant,
      updateEvent,
    }
  },
})
</script>

<template>
  <div>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      v-if="showModal"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <header class="flex justify-between items-center p-4 border-b">
          <h2 class="text-lg font-semibold">Update Event</h2>
          <button class="text-gray-500 hover:text-gray-700" @click="closeModal">
            <span class="sr-only">Close</span>
            &times;
          </button>
        </header>
        <section class="p-4">
          <form @submit.prevent="updateEvent">
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
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Participants</label>
              <select
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg py-3 px-4"
                v-model="selectedParticipant"
              >
                <option value="" disabled>Select a participant</option>
                <option v-for="user in users" :key="user.id" :value="user">
                  {{ user.name }}
                </option>
              </select>
              <button
                class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                @click="addParticipant"
                type="button"
              >
                Add Participant
              </button>
              <ul class="mt-2 list-disc list-inside text-gray-800">
                <li v-for="participant in participants" :key="participant.id">
                  {{ participant.name }}
                  <button
                    class="text-red-500 hover:text-red-700 ml-2"
                    @click="removeParticipant(participant.id)"
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          </form>
        </section>
        <footer class="flex justify-end p-4 border-t">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            @click="updateEvent"
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
