<template>
  <div>
    <CustomerSelector />
    <ProductSelector />
    <QuantityPricing />
    <OrderSummary />
    <OrderFinalization />
  </div>
</template>

<script setup>
import CustomerSelector from '../components/sales/CustomerSelector.vue';
import ProductSelector from '../components/sales/ProductSelector.vue';
import QuantityPricing from '../components/sales/QuantityPricing.vue';
import OrderSummary from '../components/sales/OrderSummary.vue';
import OrderFinalization from '../components/sales/OrderFinalization.vue';
</script>

