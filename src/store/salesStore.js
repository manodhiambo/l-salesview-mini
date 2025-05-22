// src/store/salesStore.js
import { defineStore } from 'pinia';

export const useSalesStore = defineStore('sales', {
  state: () => ({
    customers: [], // Load from API
    products: [],  // Load from API
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
          ...product,
          quantity: 1,
        });
      } else {
        existingItem.quantity += 1;
      }
    },
    removeProductFromOrder(productId) {
      this.orderItems = this.orderItems.filter(item => item.id !== productId);
    },
    clearOrder() {
      this.orderItems = [];
      this.selectedCustomer = null;
    },
    setCustomers(customers) {
      this.customers = customers;
    },
    setProducts(products) {
      this.products = products;
    }
  }
});

