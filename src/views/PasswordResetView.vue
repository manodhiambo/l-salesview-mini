<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-xl font-bold text-center mb-4">Reset Password</h2>
      <form @submit.prevent="handleReset" class="space-y-4">
        <input v-model="username" placeholder="Username" class="w-full border p-2 rounded" required />
        <input v-model="email" placeholder="Email Address" class="w-full border p-2 rounded" required type="email" />
        <button class="w-full bg-blue-600 text-white p-2 rounded" :disabled="!formValid">Reset Password</button>
        <router-link to="/" class="text-sm text-blue-600 block text-center mt-2">Back to Login</router-link>
        <p class="text-green-600 mt-2" v-if="success">Reset instructions sent (simulated)</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const username = ref('')
const email = ref('')
const success = ref(false)

const formValid = computed(() => username.value.length >= 3 && email.value.includes('@'))

const handleReset = () => {
  success.value = true
}
</script>
