import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { OccasionDto, CreateOccasionDto, UpdateOccasionDto, PaginationMeta } from '../types/api';
import { occasionsApi } from '../api/occasions';

export const useOccasionsStore = defineStore('occasions', () => {
  const occasions = ref<OccasionDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<PaginationMeta | null>(null);
  const currentPage = ref(1);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);

  async function fetchOccasions(page: number = 1, pageSize: number = 10) {
    loading.value = true;
    error.value = null;
    try {
      const result = await occasionsApi.getOccasions(page, pageSize);
      occasions.value = result.items;
      pagination.value = { ...result };
      delete (pagination.value as any).items;
      currentPage.value = result.pageIndex;
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
    pagination,
    currentPage,
    isLoading,
    hasError,
    fetchOccasions,
    createOccasion,
    updateOccasion,
    deleteOccasion,
    reset
  };
  };
});
