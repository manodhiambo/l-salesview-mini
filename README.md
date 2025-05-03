# L-SalesView Mini

A mini sales automation dashboard built with **Vue 3**, simulating a professional enterprise-grade sales portal with support for **inventory**, **sales transactions**, **customers**, and **performance insights**. The app is highly modular, responsive, and follows best practices.

---

## 🔧 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/l-salesview-mini.git
cd l-salesview-mini
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Then open your browser at: [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
```

---

## 📦 Component Architecture

```
src/
├── assets/                # App-wide images and styles
├── components/            # Reusable components
│   ├── layout/            # TopNav, SideNav, Breadcrumb
│   ├── ui/                # UI widgets (Card, Button, Modal)
│   └── charts/            # Chart.js or ApexChart components
├── modules/               # Business logic modules
│   ├── auth/              # Login, Password Reset
│   ├── dashboard/         # Metrics, Overview charts
│   ├── inventory/         # Inventory list, product details
│   ├── sales/             # Sales flow
│   └── customers/         # Map view
├── router/                # Vue Router configuration
├── store/                 # Vuex or Pinia store
├── utils/                 # Helper functions, composables
└── App.vue
```

---

## 🧱 `ui/card/` Components

To support modular card UIs, create these components:

### 1. `Card.vue`

```vue
<template>
  <div class="rounded-xl shadow p-4 bg-white dark:bg-gray-800">
    <slot />
  </div>
</template>
<script setup></script>
```

### 2. `CardHeader.vue`

```vue
<template>
  <div class="mb-2 text-lg font-semibold">
    <slot />
  </div>
</template>
<script setup></script>
```

### 3. `CardTitle.vue`

```vue
<template>
  <div class="text-xl font-bold">
    <slot />
  </div>
</template>
<script setup></script>
```

### 4. `CardContent.vue`

```vue
<template>
  <div class="text-sm text-gray-600 dark:text-gray-300">
    <slot />
  </div>
</template>
<script setup></script>
```

### 5. `CardDescription.vue`

```vue
<template>
  <div class="text-xs text-gray-500">
    <slot />
  </div>
</template>
<script setup></script>
```

### 6. `index.js`

```js
export { default as Card } from './Card.vue';
export { default as CardHeader } from './CardHeader.vue';
export { default as CardTitle } from './CardTitle.vue';
export { default as CardContent } from './CardContent.vue';
export { default as CardDescription } from './CardDescription.vue';
```

Then import as:

```js
import { Card, CardContent, CardTitle } from '@/components/ui/card';
```

---

## 🧠 Architecture Decisions

### ✅ Composition API

* All components use `<script setup>` for cleaner and modern syntax.

### ✅ Module-based folders

* Each major feature (`auth`, `sales`, `inventory`) has its own module directory.

### ✅ Dummy API

* Simulated with static JSON files placed in `/src/data` for API realism.

### ✅ Pinia over Vuex (recommended)

* Lightweight and modern store for managing authentication, metrics, etc.

### ✅ Dark/Light Mode

* Toggle theme saved in `localStorage` and applied globally via Tailwind or CSS vars.

### ✅ Error & Loading States

* Encapsulated as composables and reused in forms, charts, and list views.

---

## 📚 Assumptions Made

* No real backend — all data is static or mocked.
* Auth is simulated (login saves a token to `localStorage` only).
* JSON files mimic real API responses for dashboard and product data.
* Customer map uses mock coordinates and a lightweight map library.
* App uses Tailwind CSS for rapid and responsive styling.

---

## ✅ Features Implemented

* [x] Responsive dashboard layout
* [x] Mock authentication + remember me
* [x] Sales, inventory, product visualizations
* [x] Inventory with filters, sort, pagination
* [x] Sales order creation UI flow
* [x] Customer map view with markers
* [x] Notification center with types
* [x] Dark/light mode toggle
* [x] Error and loading UI states

---

## ✨ Bonus Ideas (For Future)

* ✅ TypeScript migration
* ☐ Unit tests using Vitest or Jest
* ☐ Advanced form components (date picker, multi-select)
* ☐ Web performance optimization

---

## 🧪 Example Screens

(Include screenshots of login, dashboard, charts, and inventory)

---

## 🙌 Author

**Kevin Owino Odhiambo**
