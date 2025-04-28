<template>
  <div class="overflow-auto h-[70vh]">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="event in events"
        :key="event.id"
        class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ event.title }}</h3>
        <p class="text-lg text-gray-700 mb-2">{{ event.name }}</p>
        <!-- Added event name -->
        <div class="text-sm text-gray-600">
          <p class="mb-1">📅 {{ event.date }}</p>
          <p class="mb-1">📍 {{ event.location }}</p>
        </div>
        <button
          @click="handleJoin(event.id)"
          class="bg-gray-500 hover:bg-gray-700 text-white rounded-sm px-4 py-2 text-sm"
        >
          Join Event
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface User {
  id: number
  name: string
  email: string
  password: string
}

interface Event {
  id: number
  title: string
  name: string
  date: string
  location: string
  participants?: User[] // Updated participants property to store User objects
}

export default defineComponent({
  setup() {
    const events = ref<Event[]>([])

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

    const handleJoin = async (eventId: number) => {
      const userJson = localStorage.getItem('user')
      if (!userJson) {
        alert('User not found in localStorage.')
        return
      }

      const user: User = JSON.parse(userJson) 

      try {
        const event = events.value.find((event) => event.id === eventId)
        if (!event) {
          throw new Error('Event not found.')
        }

        if (
          event.participants &&
          event.participants.some((participant) => participant.id === user.id)
        ) {
          alert('You are already a participant in this event.')
          return
        }

        const updatedParticipants = event.participants ? [...event.participants, user] : [user]

        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participants: updatedParticipants,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        event.participants = updatedParticipants
        alert('You have joined the event!')
        console.log('Event joined:', eventId)
      } catch (error) {
        console.error('Error joining event:', error)
      }
    }

    onMounted(() => {
      fetchEvents()
    })

    return {
      handleJoin,
      events,
    }
  },
})
</script>
