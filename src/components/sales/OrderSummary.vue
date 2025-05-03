<template>
  <q-card>
    <q-card-section>
      <q-table
        :rows="salesStore.orderItems"
        :columns="columns"
        row-key="id"
      />
      <div class="text-right">
        <p>Subtotal: {{ subtotal }}</p>
        <p>Tax ({{ taxRate }}%): {{ tax }}</p>
        <p>Total: {{ total }}</p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue';
import { useSalesStore } from '../../store/salesStore';

const salesStore = useSalesStore();
const taxRate = 10; // Example tax rate

const columns = [
  { name: 'name', label: 'Product', field: 'name' },
  { name: 'quantity', label: 'Quantity', field: 'quantity' },
  { name: 'price', label: 'Unit Price', field: 'price' },
  { name: 'discount', label: 'Discount (%)', field: 'discount' },
  { name: 'total', label: 'Total', field: row => calculateLineTotal(row) },
];

const calculateLineTotal = (item) => {
  const discountAmount = (item.price * item.quantity) * (item.discount / 100);
  return (item.price * item.quantity) - discountAmount;
};

const subtotal = computed(() =>
  salesStore.orderItems.reduce((sum, item) => sum + calculateLineTotal(item), 0)
);

const tax = computed(() => (subtotal.value * taxRate) / 100);
const total = computed(() => subtotal.value + tax.value);
</script>

