import { defineStore } from 'pinia';

let idCounter = 0;

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: []
  }),
  actions: {
    addNotification({ type, message, action = null, persistent = false }) {
      this.notifications.push({
        id: idCounter++,
        type,
        message,
        action,
        timestamp: new Date(),
        read: false,
        persistent
      });
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },
    markAllAsRead() {
      this.notifications.forEach(n => n.read = true);
    },
    clearAll() {
      this.notifications = [];
    }
  }
});

