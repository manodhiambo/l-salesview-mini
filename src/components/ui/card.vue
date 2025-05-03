<template>
  <div class="card shadow-lg rounded-lg border border-gray-200 overflow-hidden">
    <div class="card-header p-4 bg-gray-100 border-b">
      <slot name="header" />
    </div>
    <div class="card-body p-4">
      <slot name="body" />
    </div>
    <div class="card-footer p-4 bg-gray-100 border-t">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  // You can define props here if you want to pass dynamic values
})
</script>

<style scoped>
.card {
  max-width: 400px;
  width: 100%;
}
.card-header {
  font-weight: bold;
}
.card-body {
  padding: 1rem;
}
.card-footer {
  text-align: right;
}
</style>

