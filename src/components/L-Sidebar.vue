<template>
  <aside :class="['l-sidebar', { collapsed }]">
    <div class="sidebar-header">
      <img class="profile-pic" :src="user.profilePicture" alt="Profile" />
      <div class="user-info" v-if="!collapsed">
        <h4>{{ user.name }}</h4>
        <p class="role">{{ user.role }}</p>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li
          v-for="item in navItems"
          :key="item.name"
          :class="{ active: activeItem === item.name }"
          @click="navigate(item.name)"
        >
          <component :is="item.icon" class="icon" />
          <span v-if="!collapsed">{{ item.name }}</span>
        </li>
      </ul>
    </nav>

    <button class="collapse-toggle" @click="toggleCollapse">
      <ChevronLeftIcon v-if="!collapsed" />
      <ChevronRightIcon v-else />
    </button>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { HomeIcon, BarChartIcon, BoxesIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';

const router = useRouter();
const collapsed = ref(false);
const activeItem = ref('Dashboard');

const user = {
  name: 'Kevin Odhiambo',
  role: 'Admin',
  profilePicture: 'https://via.placeholder.com/100'
};

const navItems = [
  { name: 'Dashboard', icon: HomeIcon },
  { name: 'Sales', icon: BarChartIcon },
  { name: 'Inventory', icon: BoxesIcon },
];

function navigate(name) {
  activeItem.value = name;
  router.push(`/${name.toLowerCase()}`);
}

function toggleCollapse() {
  collapsed.value = !collapsed.value;
}
</script>

<style scoped>
.l-sidebar {
  background-color: #f9fafb;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  transition: width 0.3s;
}
.l-sidebar.collapsed {
  width: 80px;
}
.sidebar-header {
  padding: 1rem;
  display: flex;
  align-items: center;
}
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
}
.user-info h4 {
  margin: 0;
  font-size: 1rem;
}
.user-info .role {
  font-size: 0.8rem;
  color: #6b7280;
}
.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
.sidebar-nav li {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #374151;
  transition: background 0.2s;
}
.sidebar-nav li:hover {
  background-color: #e5e7eb;
}
.sidebar-nav li.active {
  background-color: #d1d5db;
  font-weight: bold;
}
.sidebar-nav .icon {
  margin-right: 1rem;
}
.collapse-toggle {
  margin-top: auto;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  align-self: center;
}
</style>

