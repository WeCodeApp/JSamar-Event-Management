<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { useRouter } from 'vue-router'
import { Home, Calendar, LogOut } from 'lucide-vue-next'
import { ref } from 'vue'

const router = useRouter()
const isCollapsed = ref(false)
const headerTitle = ref('Hello, User')

const items = [
  {
    title: 'Events',
    url: '/events',
    icon: Home,
  },
  {
    title: 'Event Management',
    url: '/event-management',
    icon: Calendar,
  },
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<template>
  <SidebarProvider>
    <div class="group/sidebar flex min-h-screen w-full">
      <div
        :class="[
          'bg-gray-900 text-gray-100 min-h-screen h-full transition-all duration-300 ease-in-out flex flex-col',
          isCollapsed ? 'w-18' : 'w-64',
        ]"
      >
        <SidebarHeader
          class="flex items-center px-4 py-4 text-xl font-bold border-b border-gray-800"
        >
          <span v-if="!isCollapsed" class="flex-1 text-center">Event Manager</span>
          <SidebarTrigger
            @click="toggleSidebar"
            :class="[
              'transition-all duration-300',
              isCollapsed ? 'w-5 h-5 text-gray-400 ml-2.5 mt-2' : 'w-5 h-5 text-gray-400 ml-auto',
            ]"
          />
        </SidebarHeader>

        <SidebarContent class="flex-1 py-4">
          <SidebarGroup v-for="item in items" :key="item.title" class="mb-1">
            <router-link
              :to="item.url"
              class="w-full text-left px-2 py-2
               flex items-center gap-3 hover:bg-gray-800 rounded-md transition"
            >
              <component :is="item.icon" class="w-6 h-6 text-gray-400" />
              <span v-if="!isCollapsed" class="text-md font-medium">
                {{ item.title }}
              </span>
            </router-link>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter class="text-center py-4 border-t border-gray-800 text-sm">
          <div class="flex items-center justify-center gap-2 cursor-pointer">
            <LogOut class="w-5 h-5 text-gray-400 cursor-pointer" @click="handleLogout" />
            <span v-if="!isCollapsed" @click="handleLogout">Logout</span>
          </div>
        </SidebarFooter>
      </div>

      <div class="flex-1 flex flex-col">
        <div class="bg-gray-800 text-gray-100 py-4 px-6 shadow-md w-full h-[6.2vh]">
          <h1 class="text-end text-2xl font-bold">{{ headerTitle }}</h1>
        </div>

        <div class="flex-1 p-6 bg-background overflow-auto">
          <router-view />
        </div>
      </div>
    </div>
  </SidebarProvider>
</template>
