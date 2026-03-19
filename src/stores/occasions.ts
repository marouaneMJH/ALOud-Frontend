import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { OccasionDto, CreateOccasionDto, UpdateOccasionDto } from '../types/api';
import { occasionsApi } from '../api/occasions';

export const useOccasionsStore = defineStore('occasions', () => {
  const occasions = ref<OccasionDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  async function fetchOccasions(page: number = 1) {
    loading.value = true;
    error.value = null;
    console.log('[Pinia] Starting to fetch occasions...');
    try {
      const result = await occasionsApi.getOccasions(page, pageSize.value);
      console.log('[Pinia] Received occasions:', result);
      occasions.value = result.data;
      currentPage.value = result.page;
      total.value = result.total;
      console.log('[Pinia] Occasions stored in state:', occasions.value);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch occasions';
      console.error('[Pinia] Occasions error:', err);
    } finally {
      loading.value = false;
    }
  }

  async function createOccasion(data: CreateOccasionDto) {
    loading.value = true;
    error.value = null;
    try {
      const newOccasion = await occasionsApi.createOccasion(data);
      occasions.value.push(newOccasion);
      total.value++;
      return newOccasion;
    } catch (err: any) {
      error.value = err.message || 'Failed to create occasion';
      console.error('Create occasion error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateOccasion(id: string, data: UpdateOccasionDto) {
    loading.value = true;
    error.value = null;
    try {
      const updatedOccasion = await occasionsApi.updateOccasion(id, data);
      const index = occasions.value.findIndex(o => o.id === id);
      if (index !== -1) {
        occasions.value[index] = updatedOccasion;
      }
      return updatedOccasion;
    } catch (err: any) {
      error.value = err.message || 'Failed to update occasion';
      console.error('Update occasion error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteOccasion(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await occasionsApi.deleteOccasion(id);
      occasions.value = occasions.value.filter(o => o.id !== id);
      total.value--;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete occasion';
      console.error('Delete occasion error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    occasions.value = [];
    error.value = null;
    currentPage.value = 1;
  }

  return {
    occasions,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    totalPages,
    isLoading,
    hasError,
    fetchOccasions,
    createOccasion,
    updateOccasion,
    deleteOccasion,
    reset,
  };
});
