<template>
  <nav class="flex space-x-2 text-sm text-gray-700">
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link v-if="crumb.link" :to="crumb.link" class="text-blue-500 hover:underline">{{ crumb.label }}</router-link>
      <span v-else>{{ crumb.label }}</span>
      <span v-if="index < breadcrumbs.length - 1">/</span>
    </span>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
    default: () => [],
  }
})
</script>

<style scoped>
</style>
