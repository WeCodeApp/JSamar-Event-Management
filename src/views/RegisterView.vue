<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative">
    <div class="bg-img"></div>
    <div
      class="bg-black/30 border border-gray-700 shadow-2xl rounded-xl p-8 w-full max-w-sm md:max-w-md z-20"
    >
      <h2 class="text-3xl font-bold text-center text-white mb-6">Create an Account</h2>
      <p class="text-sm text-center text-gray-300 mb-6">
        Join our platform to manage your events effortlessly. Create, update, and stay connected
        with ease.
      </p>
      <form @submit.prevent="handleRegister">
        <div class="mb-6">
          <label for="name" class="block text-lg font-medium text-gray-300">Name</label>
          <input
            id="name"
            type="text"
            v-model="name"
            class="mt-2 block w-full px-4 py-3 bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-gray-500 focus:border-gray-500 sm:text-base"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="mb-6">
          <label for="email" class="block text-lg font-medium text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="mt-2 block w-full px-4 py-3 bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-gray-500 focus:border-gray-500 sm:text-base"
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
            class="mt-2 block w-full px-4 py-3 bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-gray-500 focus:border-gray-500 sm:text-base"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-lg font-medium text-gray-300"
            >Confirm Password</label
          >
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="mt-2 block w-full px-4 py-3 bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-gray-500 focus:border-gray-500 sm:text-base"
            placeholder="Confirm your password"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-gray-800 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
      <p class="text-base text-center text-gray-300 mt-6">
        Already have an account?
        <span
          class="underline cursor-pointer text-white hover:text-gray-400"
          @click="navigateToLogin"
        >
          Login
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
    const name = ref<string>('')
    const email = ref<string>('')
    const password = ref<string>('')
    const confirmPassword = ref<string>('')
    const router = useRouter()

    const handleRegister = async (): Promise<void> => {
      if (password.value !== confirmPassword.value) {
        alert('Passwords do not match!')
        return
      }

      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: Date.now(),
            name: name.value,
            email: email.value,
            password: password.value,
          }),
        })

        if (response.ok) {
          alert('Registration successful!')
          router.push('/login')
        } else {
          alert('Registration failed!')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('An error occurred during registration.')
      }
    }

    const navigateToLogin = (): void => {
      router.push('/login')
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      handleRegister,
      navigateToLogin,
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
