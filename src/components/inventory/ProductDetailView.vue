<template>
  <div class="product-detail">
    <div class="tabs">
      <button @click="activeTab = 'overview'">Overview</button>
      <button @click="activeTab = 'specifications'">Specifications</button>
      <button @click="activeTab = 'stock'">Stock Info</button>
      <button @click="activeTab = 'pricing'">Pricing</button>
    </div>

    <div v-if="activeTab === 'overview'" class="tab-content">
      <h2>Product Overview</h2>
      <p><strong>Name:</strong> {{ product.name }}</p>
      <p><strong>SKU:</strong> {{ product.sku }}</p>
      <p><strong>Category:</strong> {{ product.category }}</p>
      <p><strong>Description:</strong> {{ product.description }}</p>
    </div>

    <div v-if="activeTab === 'specifications'" class="tab-content">
      <h2>Product Specifications</h2>
      <p><strong>Material:</strong> {{ product.specifications.material }}</p>
      <p><strong>Size:</strong> {{ product.specifications.size }}</p>
    </div>

    <div v-if="activeTab === 'stock'" class="tab-content">
      <h2>Stock Information</h2>
      <p><strong>Total Stock:</strong> {{ product.stock.total }}</p>
      <p><strong>Available Stock:</strong> {{ product.stock.available }}</p>
      <p><strong>Reorder Level:</strong> {{ product.stock.reorderLevel }}</p>
    </div>

    <div v-if="activeTab === 'pricing'" class="tab-content">
      <h2>Pricing Information</h2>
      <p><strong>Unit Price:</strong> {{ product.pricing.unitPrice | currency }}</p>
      <p><strong>Tax:</strong> {{ product.pricing.tax }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const product = ref({
  name: 'Product A',
  sku: '12345',
  category: 'Electronics',
  description: 'A great product.',
  specifications: {
    material: 'Metal',
    size: 'Large',
  },
  stock: {
    total: 100,
    available: 90,
    reorderLevel: 10,
  },
  pricing: {
    unitPrice: 100,
    tax: 15,
  },
})

const activeTab = ref('overview')
</script>

<style scoped>
.tabs button {
  margin: 0 10px;
  padding: 10px;
  cursor: pointer;
}

.tab-content {
  margin-top: 20px;
}
</style>

