<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ warehouse?.name }} - Details</h2>
      <p><strong>Location:</strong> {{ warehouse?.location }}</p>
      <p><strong>Contact:</strong> {{ warehouse?.contact }}</p>
      <p><strong>Capacity:</strong> {{ warehouse?.capacity }}</p>
      <button @click="closeModal" class="close">Close</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  warehouseId: Number,
});

const emit = defineEmits(['close']);

const warehouse = computed(() => {
  return props.warehouseId ? warehouses.find(w => w.id === props.warehouseId) : null;
});

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

button.close {
  background: #f44336;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-top: 10px;
}
</style>

