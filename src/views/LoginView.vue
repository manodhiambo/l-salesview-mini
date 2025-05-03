<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login to SalesView</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label>Username</label>
          <input v-model="username" class="w-full border p-2 rounded" required />
        </div>
        <div>
          <label>Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full border p-2 rounded"
              required
            />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-2 top-2 text-sm">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" v-model="remember" />
          <label>Remember me</label>
        </div>
        <div>
          <button :disabled="!formValid || loading" class="w-full bg-blue-600 text-white p-2 rounded">
            <span v-if="loading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </div>
        <p class="text-red-600" v-if="error">{{ error }}</p>
        <router-link to="/reset" class="text-sm text-blue-600 block text-right">Forgot Password?</router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)

const loading = computed(() => auth.loading)
const error = computed(() => auth.error)

const formValid = computed(() =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value)
)

const handleLogin = async () => {
  await auth.login(username.value, password.value, remember.value)
  if (auth.isAuthenticated) {
    router.push('/dashboard')
  }
}

onMounted(() => {
  auth.checkAuth()
  if (auth.isAuthenticated) router.push('/dashboard')
})
</script>

