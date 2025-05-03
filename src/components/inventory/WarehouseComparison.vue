<template>
  <div class="warehouse-comparison">
    <h2>Compare Warehouses</h2>
    <div class="filters">
      <label for="warehouseSelector">Select Warehouses:</label>
      <select v-model="selectedWarehouses" multiple id="warehouseSelector">
        <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
          {{ warehouse.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedWarehouses.length > 0" class="comparison-table">
      <div class="header-row">
        <div class="cell">Product</div>
        <div v-for="warehouse in selectedWarehouses" :key="warehouse" class="cell">
          {{ getWarehouseName(warehouse) }}
        </div>
      </div>

      <div v-for="product in products" :key="product.productId" class="product-row">
        <div class="cell">{{ product.name }}</div>
        <div v-for="warehouse in selectedWarehouses" :key="warehouse" class="cell">
          {{ getStockForWarehouse(product.productId, warehouse) }}
        </div>
      </div>
    </div>
    <div v-else>
      <p>Please select at least one warehouse to compare.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useInventoryStore } from '../../store/inventoryStore';

const store = useInventoryStore();
const selectedWarehouses = ref([]);
const warehouses = computed(() => store.warehouses);
const products = computed(() => store.warehouses.flatMap(w => w.products));

const getWarehouseName = (warehouseId) => {
  const warehouse = warehouses.value.find(w => w.id === warehouseId);
  return warehouse ? warehouse.name : '';
};

const getStockForWarehouse = (productId, warehouseId) => {
  const warehouse = warehouses.value.find(w => w.id === warehouseId);
  const product = warehouse?.products.find(p => p.productId === productId);
  return product ? product.availableStock : 'N/A';
};
</script>

<style scoped>
.warehouse-comparison {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.comparison-table {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr repeat(3, 1fr); /* Adjust to the number of warehouses */
  gap: 10px;
}

.header-row {
  display: flex;
  font-weight: bold;
}

.cell {
  padding: 10px;
  border: 1px solid #ddd;
}

.product-row {
  display: flex;
}

select {
  width: 100%;
}
</style>

