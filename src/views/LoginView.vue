<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative">
    <div class="bg-img"></div>
    <div
      class="bg-black/30 border border-gray-700 backdrop-blur-lg shadow-2xl rounded-xl p-8 w-full max-w-sm md:max-w-md z-20"
    >
      <h2 class="text-3xl font-bold text-center text-white mb-6">Welcome Back!</h2>
      <p class="text-sm text-center text-gray-300 mb-6">
        Access your events and stay connected. Manage your schedules and never miss an important
        moment.
      </p>
      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label for="email" class="block text-lg font-medium text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="mt-2 block w-full px-4 py-3 bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg backdrop-blur-md focus:ring-gray-500 focus:border-gray-500 sm:text-base"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-lg font-medium text-gray-300">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="mt-2 block w-full px-4 py-3 bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg backdrop-blur-md focus:ring-gray-500 focus:border-gray-500 sm:text-base"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-gray-800 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
      <p class="text-base text-center text-gray-300 mt-6">
        Don't have an account?
        <span
          class="underline cursor-pointer text-white hover:text-gray-400"
          @click="navigateToRegister"
        >
          Sign up
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref<string>('')
    const password = ref<string>('')
    const router = useRouter()

    const handleLogin = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'GET',
        })
        const users = await response.json()
        const user = users.find((user: { email: string; password: string }) => {
          return user.email === email.value && user.password === password.value
        })

        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          alert('Login successful!')
          router.push('/')
        } else {
          alert('Invalid email or password. Please try again.')
        }
      } catch (error) {
        console.error('Error during login:', error)
        alert('An error occurred. Please try again later.')
      }
    }

    const navigateToRegister = (): void => {
      router.push('/register')
    }

    return {
      email,
      password,
      handleLogin,
      navigateToRegister,
    }
  },
}
</script>

<style scoped>
.bg-img {
  background-image: url('@/assets/eventbg.jpg');
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(8px);
}
</style>
