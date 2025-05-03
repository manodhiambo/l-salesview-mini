import { defineStore } from 'pinia';

export const useSalesStore = defineStore('sales', {
  state: () => ({
    customers: [], // Load from API
    products: [], // Load from API
    selectedCustomer: null,
    orderItems: [],
  }),
  actions: {
    setSelectedCustomer(customer) {
      this.selectedCustomer = customer;
    },
    addProductToOrder(product) {
      const existingItem = this.orderItems.find(item => item.id === product.id);
      if (!existingItem) {
        this.orderItems.push({
::contentReference[oaicite:0]{index=0}
 

