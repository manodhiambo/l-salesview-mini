<template>
  <div v-for="item in salesStore.orderItems" :key="item.id">
    <q-card>
      <q-card-section>
        <div class="row items-center">
          <div class="col">
            <p>{{ item.name }}</p>
            <p>Unit Price: {{ item.price }}</p>
            <p>Available Stock: {{ item.stock }}</p>
          </div>
          <div class="col">
            <q-input
              v-model.number="item.quantity"
              type="number"
              label="Quantity"
              :rules="[val => val > 0 && val <= item.stock || 'Invalid quantity']"
            />
            <q-input
              v-model.number="item.discount"
              type="number"
              label="Discount (%)"
              :rules="[val => val >= 0 && val <= 100 || 'Invalid discount']"
            />
            <p>Line Total: {{ calculateLineTotal(item) }}</p>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSalesStore } from '../../store/salesStore';

const salesStore = useSalesStore();

const calculateLineTotal = (item) => {
  const discountAmount = (item.price * item.quantity) * (item.discount / 100);
  return (item.price * item.quantity) - discountAmount;
};
</script>
