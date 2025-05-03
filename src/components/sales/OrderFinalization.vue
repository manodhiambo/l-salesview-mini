i<template>
  <q-card>
    <q-card-section>
      <q-input v-model="specialInstructions" label="Special Instructions" />
      <q-select
        v-model="paymentTerms"
        :options="paymentOptions"
        label="Payment Terms"
      />
      <q-input
        v-model="deliveryDate"
        type="date"
        label="Expected Delivery Date"
      />
      <q-checkbox
        v-model="acceptTerms"
        label="I accept the terms and conditions"
      />
      <q-btn
        label="Submit Order"
        :disable="!acceptTerms"
        @click="submitOrder"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
import { useSalesStore } from '../../store/salesStore';

const salesStore = useSalesStore();
const specialInstructions = ref('');
const paymentTerms = ref('');
const deliveryDate = ref('');
const acceptTerms = ref(false);
const paymentOptions = ['Cash', 'Credit', 'Net 30'];

const submitOrder = () => {
  if (acceptTerms.value) {
    salesStore.submitOrder({
      specialInstructions: specialInstructions.value,
      paymentTerms: paymentTerms.value,
      deliveryDate: deliveryDate.value,
    });
  }
};
</script>

