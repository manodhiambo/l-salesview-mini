<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Transfer Stock</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="sourceWarehouse">Source Warehouse</label>
          <select v-model="sourceWarehouse" id="sourceWarehouse">
            <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
              {{ warehouse.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="destinationWarehouse">Destination Warehouse</label>
          <select v-model="destinationWarehouse" id="destinationWarehouse">
            <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
              {{ warehouse.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input type="number" v-model="quantity" id="quantity" :max="maxTransferableQuantity" required />
          <span v-if="quantity && quantity > maxTransferableQuantity" class="error-message">
            Insufficient stock in source warehouse
          </span>
        </div>

        <button type="submit" :disabled="quantity <= 0 || quantity > maxTransferableQuantity">Transfer</button>
      </form>
      <button class="close" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  warehouses: Array,
  productId: Number,
});

const emit = defineEmits(['close', 'transfer']);

const sourceWarehouse = ref(null);
const destinationWarehouse = ref(null);
const quantity = ref(0);
const maxTransferableQuantity = computed(() => {
  // Logic to fetch current stock level for the selected product in the source warehouse
  const source = props.warehouses.find(w => w.id === sourceWarehouse.value);
  const product = source?.products.find(p => p.productId === props.productId);
  return product ? product.availableStock : 0;
});

const handleSubmit = () => {
  // Submit transfer logic
  if (quantity.value <= maxTransferableQuantity.value && quantity.value > 0) {
    emit('transfer', {
      sourceWarehouse: sourceWarehouse.value,
      destinationWarehouse: destinationWarehouse.value,
      productId: props.productId,
      quantity: quantity.value,
    });
    closeModal();
  }
};

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

button:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>

