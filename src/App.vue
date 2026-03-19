<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

// Initialize auth from localStorage on app startup
onMounted(() => {
  authStore.loadFromStorage();
  console.log('[App] Auth initialized');
});
</script>

<style scoped>
</style>
