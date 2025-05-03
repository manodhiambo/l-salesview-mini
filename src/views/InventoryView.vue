<template>
  <div class="inventory-view">
    <h1>Inventory Management</h1>
    <L-InventoryDataTable :products="filteredProducts" @request-transfer="openTransferModal" />
    <StockTransferModal 
      v-if="isTransferModalVisible"
      :isVisible="isTransferModalVisible"
      :warehouses="warehouses"
      :productId="selectedProductId"
      @close="closeTransferModal"
      @transfer="handleTransfer"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import L-InventoryDataTable from '../components/inventory/InventoryDataTable.vue';
import StockTransferModal from '../components/inventory/StockTransferModal.vue';
import { useInventoryStore } from '../store/inventoryStore';
import WarehouseComparison from '../components/inventory/WarehouseComparison.vue';
import WarehouseDetailsModal from '../components/inventory/WarehouseDetailsModal.vue';

const store = useInventoryStore();
const isTransferModalVisible = ref(false);
const isWarehouseDetailsVisible = ref(false);
const selectedProductId = ref(null);
const selectedWarehouseId = ref(null);

const filteredProducts = computed(() => store.filteredProducts);
const warehouses = computed(() => store.warehouses);

const openTransferModal = (productId) => {
  selectedProductId.value = productId;
  isTransferModalVisible.value = true;
};

const closeTransferModal = () => {
  isTransferModalVisible.value = false;
  selectedProductId.value = null;
};

const handleTransfer = (transferData) => {
  store.transferStock(transferData);
  closeTransferModal();
};
const openWarehouseDetails = (warehouseId) => {
  selectedWarehouseId.value = warehouseId;
  isWarehouseDetailsVisible.value = true;
};

const closeWarehouseDetailsModal = () => {
  isWarehouseDetailsVisible.value = false;
  selectedWarehouseId.value = null;
};
</script>

<style scoped>
.inventory-view {
  padding: 20px;
}
</style>

