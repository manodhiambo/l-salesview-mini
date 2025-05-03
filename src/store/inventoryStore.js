import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    warehouses: [
      // Example structure of warehouse data
      { id: 1, name: 'Warehouse A', products: [{ productId: 101, availableStock: 50 }] },
      { id: 2, name: 'Warehouse B', products: [{ productId: 101, availableStock: 20 }] },
    ],
  }),
  actions: {
    transferStock({ sourceWarehouse, destinationWarehouse, productId, quantity }) {
      // Find the source and destination warehouse objects
      const source = this.warehouses.find(w => w.id === sourceWarehouse);
      const destination = this.warehouses.find(w => w.id === destinationWarehouse);

      if (source && destination) {
        // Find the product in both warehouses
        const sourceProduct = source.products.find(p => p.productId === productId);
        const destinationProduct = destination.products.find(p => p.productId === productId);

        if (sourceProduct && destinationProduct) {
          // Validate the available stock and update accordingly
          if (sourceProduct.availableStock >= quantity) {
            sourceProduct.availableStock -= quantity;
            destinationProduct.availableStock += quantity;
            console.log(`Transferred ${quantity} from ${source.name} to ${destination.name}`);
          } else {
            console.error('Not enough stock in source warehouse');
          }
        }
      }
    },
  },
});
