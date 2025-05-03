<!-- components/ui/skeleton.vue -->
<template>
  <div
    :class="[
      'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
      rounded,
      width,
      height
    ]"
  ></div>
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: 'w-full', // Tailwind class like 'w-32' or 'w-full'
  },
  height: {
    type: String,
    default: 'h-4', // Tailwind class like 'h-4' or 'h-6'
  },
  rounded: {
    type: String,
    default: 'rounded-md', // Tailwind class like 'rounded' or 'rounded-full'
  },
});
</script>

<style scoped>
/* Optional additional styling */
</style>
