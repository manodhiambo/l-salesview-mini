<template>
  <div>
    <q-input
      v-model="searchQuery"
      label="Search Customer"
      @input="filterCustomers"
      debounce="300"
    />
    <q-list>
      <q-item
        v-for="customer in filteredCustomers"
        :key="customer.id"
        clickable
        @click="selectCustomer(customer)"
      >
        <q-item-section>
          <q-item-label>{{ customer.name }}</q-item-label>
          <q-item-label caption>{{ customer.location }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="selectedCustomer">
      <h3>Selected Customer</h3>
      <p>Name: {{ selectedCustomer.name }}</p>
      <p>Contact: {{ selectedCustomer.contact }}</p>
      <p>Credit Limit: {{ selectedCustomer.creditLimit }}</p>
      <p>Balance: {{ selectedCustomer.balance }}</p>
      <p>Available Credit: {{ availableCredit }}</p>
      <q-input
        v-model="deliveryAddress"
        label="Delivery Address"
        :placeholder="selectedCustomer.address"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSalesStore } from '../../store/salesStore';

const salesStore = useSalesStore();
const searchQuery = ref('');
const selectedCustomer = ref(null);
const deliveryAddress = ref('');

const filteredCustomers = computed(() =>
  salesStore.customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const selectCustomer = (customer) => {
  selectedCustomer.value = customer;
  deliveryAddress.value = customer.address;
  salesStore.setSelectedCustomer(customer);
};

const availableCredit = computed(() =>
  selectedCustomer.value
    ? selectedCustomer.value.creditLimit - selectedCustomer.value.balance
    : 0
);
</script>

