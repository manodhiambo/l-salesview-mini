<template>
  <div class="toast-wrapper">
    <div
      v-for="n in visibleToasts"
      :key="n.id"
      :class="['toast', n.type]"
    >
      <span class="message">{{ n.message }}</span>
      <span class="timestamp">{{ formatTime(n.timestamp) }}</span>
      <button class="close" @click="remove(n.id)">×</button>
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '../../store/notificationStore';
import { computed } from 'vue';

const store = useNotificationStore();

const visibleToasts = computed(() =>
  store.notifications.filter(n => !n.persistent)
);

const remove = store.removeNotification;

const formatTime = (timestamp) => new Date(timestamp).toLocaleTimeString();
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.toast {
  padding: 1rem;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  position: relative;
  animation: slide-in 0.3s ease-out;
}
.toast.success { background: #28a745; }
.toast.warning { background: #ffc107; color: black; }
.toast.error { background: #dc3545; }
.toast.info { background: #17a2b8; }

.toast .close {
  position: absolute;
  top: 4px;
  right: 8px;
  background: transparent;
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
.timestamp {
  font-size: 0.7rem;
  opacity: 0.8;
}
@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
</style>

