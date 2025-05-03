<template>
  <div>
    <q-select
      v-model="selectedCategory"
      :options="categories"
      label="Select Category"
      @update:model-value="filterProducts"
    />
    <q-input
      v-model="productSearch"
      label="Search Product"
      @input="filterProducts"
      debounce="300"
    />
    <q-list>
      <q-item
        v-for="product in filteredProducts"
        :key="product.id"
        clickable
        @click="selectProduct(product)"
      >
        <q-item-section avatar>
          <q-img :src="product.image" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ product.name }}</q-item-label>
          <q-item-label caption>SKU: {{ product.sku }}</q-item-label>
          <q-item-label caption>Price: {{ product.price }}</q-item-label>
          <q-item-label caption>Stock: {{ product.stock }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSalesStore } from '../../store/salesStore';

const salesStore = useSalesStore();
const selectedCategory = ref(null);
const productSearch = ref('');

const categories = computed(() =>
  [...new Set(salesStore.products.map(product => product.category))]
);

const filteredProducts = computed(() =>
  salesStore.products.filter(product =>
    (!selectedCategory.value || product.category === selectedCategory.value) &&
    product.name.toLowerCase().includes(productSearch.value.toLowerCase())
  )
);

const selectProduct = (product) => {
  salesStore.addProductToOrder(product);
};
</script>

