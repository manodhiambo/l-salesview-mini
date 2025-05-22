<template>
  <nav class="flex items-center justify-between p-4 shadow bg-white dark:bg-gray-900">
    <div class="flex items-center space-x-4">
      <img src="@/assets/images/logo.png" alt="Logo" class="h-8" />
      <span class="text-xl font-bold text-gray-800 dark:text-white">Dashboard</span>
    </div>
    <div class="flex items-center space-x-4">
      <button @click="toggleTheme" class="focus:outline-none">
        <i :class="themeIcon"></i>
      </button>
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2">
          <img src="https://i.pravatar.cc/40" class="rounded-full h-8 w-8" alt="Profile" />
          <span class="text-sm text-gray-800 dark:text-white">Admin</span>
        </button>
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-md">
          <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
          <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'; // ✅ FIXED: added computed
import NotificationCenter from './notifications/NotificationCenter.vue';

const dropdownOpen = ref(false);
const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value);

const isDark = ref(false);
const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
};

const themeIcon = computed(() =>
  isDark.value ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-gray-700'
);
</script>

<style scoped>
nav {
  transition: background-color 0.3s;
}
</style>
