<template>
  <l-map
    style="height: 90vh; width: 100%;"
    :zoom="zoom"
    :center="mapCenter"
    @update:center="updateMapCenter"
  >
    <!-- Base Tile Layer -->
    <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttr" />

    <!-- Current Location Marker -->
    <l-marker v-if="userLocation" :lat-lng="userLocation">
      <l-popup>You are here</l-popup>
    </l-marker>

    <!-- Customer Markers -->
    <l-marker
      v-for="(customer, index) in customersWithCoordinates"
      :key="index"
      :lat-lng="[customer.lat, customer.lng]"
    >
      <l-popup>
        <div>
          <strong>{{ customer.name }}</strong><br />
          {{ customer.contact }}<br />
          <q-btn
            dense flat
            label="View"
            color="primary"
            @click="goToCustomer(customer.id)"
          />
        </div>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue-leaflet';
import 'leaflet/dist/leaflet.css';
import customerData from '../../assets/customers.json';
import { useRouter } from 'vue-router';

const zoom = ref(12);
const mapCenter = ref([0.0236, 37.9062]); // default Kenya center
const userLocation = ref(null);
const router = useRouter();

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileLayerAttr = '&copy; OpenStreetMap contributors';

const customersWithCoordinates = customerData.filter(c => c.lat && c.lng);

const updateMapCenter = (newCenter) => {
  mapCenter.value = newCenter;
};

const goToCustomer = (id) => {
  router.push(`/customers/${id}`);
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = [
        position.coords.latitude,
        position.coords.longitude,
      ];
      mapCenter.value = userLocation.value;
    },
    () => {
      console.warn('Could not fetch current location');
    }
  );
});
</script>

