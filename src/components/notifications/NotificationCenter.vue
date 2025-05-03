<template>
  <div class="notification-center">
    <button @click="toggleOpen" class="icon-button">
      🔔
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <div v-if="open" class="dropdown">
      <div class="actions">
        <button @click="store.markAllAsRead">Mark all as read</button>
        <button @click="store.clearAll">Clear all</button>
      </div>

      <div v-for="n in store.notifications" :key="n.id" class="notif-item" :class="{ unread: !n.read }">
        <strong>{{ n.type.toUpperCase() }}</strong>: {{ n.message }}
        <div class="meta">{{ new Date(n.timestamp).toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNotificationStore } from '@/store/notificationStore';

const open = ref(false);
const toggleOpen = () => open.value = !open.value;

const store = useNotificationStore();
const unreadCount = computed(() => store.notifications.filter(n => !n.read).length);
</script>

<style scoped>
.icon-button {
  position: relative;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}
.badge {
  background: red;
  color: white;
  font-size: 0.75rem;
  border-radius: 50%;
  padding: 2px 6px;
  position: absolute;
  top: 0;
  right: 0;
}
.dropdown {
  position: absolute;
  right: 0;
  top: 2rem;
  width: 300px;
  background: white;
  border: 1px solid #ccc;
  padding: 0.5rem;
  z-index: 1000;
}
.notif-item {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
.notif-item.unread {
  font-weight: bold;
  background: #f9f9f9;
}
.meta {
  font-size: 0.75rem;
  color: #666;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
</style>

