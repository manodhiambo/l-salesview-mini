<template>
  <Card class="w-full h-full">
    <CardContent class="flex flex-col gap-2 p-4">
      <div class="flex items-center justify-between">
        <div class="text-sm font-medium text-muted-foreground">{{ title }}</div>
        <component :is="icon" class="w-5 h-5 text-primary" />
      </div>
      <div class="text-2xl font-bold">{{ value }}</div>
      <div v-if="subtitle" class="text-xs text-muted-foreground">{{ subtitle }}</div>
    </CardContent>
  </Card>
</template>

<script setup>
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import { computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  subtitle: String,
  icon: Object
})
</script>

<style scoped>
/* Additional styling can go here if needed */
</style>
