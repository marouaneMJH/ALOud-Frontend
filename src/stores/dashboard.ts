import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { DashboardStatsDto } from '../types/api';
import { dashboardApi } from '../api/dashboard';

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<DashboardStatsDto | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);

  async function fetchStats() {
    loading.value = true;
    error.value = null;
    console.log('[Pinia] Starting to fetch stats...');
    try {
      const data = await dashboardApi.getStats();
      console.log('[Pinia] Received stats:', data);
      stats.value = data;
      console.log('[Pinia] Stats stored in state:', stats.value);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch dashboard stats';
      console.error('[Pinia] Dashboard stats error:', err);
    } finally {
      loading.value = false;
      console.log('[Pinia] Loading finished, loading =', loading.value);
    }
  }

  function reset() {
    stats.value = null;
    error.value = null;
  }

  return {
    stats,
    loading,
    error,
    isLoading,
    hasError,
    fetchStats,
    reset,
  };
});
