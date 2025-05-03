<template>
  <div class="inventory-table">
    <!-- Filtering panel -->
    <div class="filter-panel">
      <label for="category">Category:</label>
      <select v-model="selectedCategory" @change="filterData">
        <option value="">All</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>

      <label for="warehouse">Warehouse:</label>
      <select v-model="selectedWarehouse" @change="filterData">
        <option value="">All</option>
        <option v-for="warehouse in warehouses" :key="warehouse" :value="warehouse">{{ warehouse }}</option>
      </select>
    </div>

    <!-- Data Table -->
    <table class="data-table">
      <thead>
        <tr>
          <th @click="sortData('productId')">Product ID</th>
          <th @click="sortData('productName')">Product Name</th>
          <th @click="sortData('category')">Category</th>
          <th @click="sortData('totalStock')">Total Stock</th>
          <th @click="sortData('availableStock')">Available Stock</th>
          <th @click="sortData('warehouse')">Warehouse Breakdown</th>
          <th @click="sortData('reorderLevel')">Reorder Level</th>
          <th>Status</th>
          <th @click="sortData('unitPrice')">Unit Price</th>
          <th @click="sortData('lastUpdated')">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.productId">
          <td>{{ product.productId }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.totalStock }}</td>
          <td>{{ product.availableStock }}</td>
          <td>{{ product.warehouse }}</td>
          <td>{{ product.reorderLevel }}</td>
          <td :class="statusClass(product.status)">{{ product.status }}</td>
          <td>{{ product.unitPrice | currency }}</td>
          <td>{{ product.lastUpdated }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { productId: 1, productName: 'Product A', category: 'Electronics', totalStock: 100, availableStock: 90, warehouse: 'Warehouse 1', reorderLevel: 10, status: 'OK', unitPrice: 100, lastUpdated: '2023-03-01' },
  // Add more products here
])

const categories = ['Electronics', 'Furniture', 'Clothing']
const warehouses = ['Warehouse 1', 'Warehouse 2']

// Filter and pagination
const selectedCategory = ref('')
const selectedWarehouse = ref('')
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    return (
      (selectedCategory.value === '' || product.category === selectedCategory.value) &&
      (selectedWarehouse.value === '' || product.warehouse === selectedWarehouse.value)
    )
  })
})

const currentPage = ref(1)
const pageSize = 10
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize))

const sortData = (column) => {
  // Sorting logic here (ascending/descending)
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const filterData = () => {
  // Filtering logic
}

const statusClass = (status) => {
  switch (status) {
    case 'OK':
      return 'status-ok'
    case 'Low':
      return 'status-low'
    case 'Critical':
      return 'status-critical'
    default:
      return ''
  }
}
</script>

<style scoped>
.inventory-table {
  width: 100%;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 8px;
  text-align: left;
}

.filter-panel {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
}

.status-ok {
  color: green;
}

.status-low {
  color: orange;
}

.status-critical {
  color: red;
}
</style>

