import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { SeasonDto, CreateSeasonDto, UpdateSeasonDto } from '../types/api';
import { seasonsApi } from '../api/seasons';

export const useSeasonsStore = defineStore('seasons', () => {
  const seasons = ref<SeasonDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  async function fetchSeasons(page: number = 1) {
    loading.value = true;
    error.value = null;
    console.log('[Pinia] Starting to fetch seasons...');
    try {
      const result = await seasonsApi.getSeasons(page, pageSize.value);
      console.log('[Pinia] Received seasons:', result);
      seasons.value = result.data;
      currentPage.value = result.page;
      total.value = result.total;
      console.log('[Pinia] Seasons stored in state:', seasons.value);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch seasons';
      console.error('[Pinia] Seasons error:', err);
    } finally {
      loading.value = false;
    }
  }

  async function createSeason(data: CreateSeasonDto) {
    loading.value = true;
    error.value = null;
    try {
      const newSeason = await seasonsApi.createSeason(data);
      seasons.value.push(newSeason);
      total.value++;
      return newSeason;
    } catch (err: any) {
      error.value = err.message || 'Failed to create season';
      console.error('Create season error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateSeason(id: string, data: UpdateSeasonDto) {
    loading.value = true;
    error.value = null;
    try {
      const updatedSeason = await seasonsApi.updateSeason(id, data);
      const index = seasons.value.findIndex(s => s.id === id);
      if (index !== -1) {
        seasons.value[index] = updatedSeason;
      }
      return updatedSeason;
    } catch (err: any) {
      error.value = err.message || 'Failed to update season';
      console.error('Update season error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteSeason(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await seasonsApi.deleteSeason(id);
      seasons.value = seasons.value.filter(s => s.id !== id);
      total.value--;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete season';
      console.error('Delete season error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    seasons.value = [];
    error.value = null;
    currentPage.value = 1;
  }

  return {
    seasons,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    totalPages,
    isLoading,
    hasError,
    fetchSeasons,
    createSeason,
    updateSeason,
    deleteSeason,
    reset,
  };
});
