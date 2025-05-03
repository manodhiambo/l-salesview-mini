<script setup>
defineProps({
  // Define any props you need for CardContent, for example:
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="p-4 bg-white rounded-md shadow-md">
    <!-- Optional title section -->
    <h3 v-if="title" class="text-xl font-semibold mb-2">{{ title }}</h3>

    <!-- Content section -->
    <p v-if="content" class="text-sm text-gray-700">{{ content }}</p>

    <!-- Slot for custom content -->
    <slot />
  </div>
</template>

<style scoped>
/* You can customize the styles for CardContent here */
</style>
