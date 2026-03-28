import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { SeasonDto, CreateSeasonDto, UpdateSeasonDto, PaginationMeta } from '../types/api';
import { seasonsApi } from '../api/seasons';

export const useSeasonsStore = defineStore('seasons', () => {
  const seasons = ref<SeasonDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<PaginationMeta | null>(null);
  const currentPage = ref(1);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);

  async function fetchSeasons(page: number = 1, pageSize: number = 10) {
    loading.value = true;
    error.value = null;
    try {
      const result = await seasonsApi.getSeasons(page, pageSize);
      seasons.value = result.items;
      pagination.value = { ...result };
      delete (pagination.value as any).items;
      currentPage.value = result.pageIndex;
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
    pagination,
    currentPage,
    isLoading,
    hasError,
    fetchSeasons,
    createSeason,
    updateSeason,
    deleteSeason,
    reset
  };
  };
});
