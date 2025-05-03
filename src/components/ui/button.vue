<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <button
    :type="type"
    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    <slot />
  </button>
</template>
