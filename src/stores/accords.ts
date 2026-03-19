import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { AccordDto, CreateAccordDto, UpdateAccordDto } from '../types/api';
import { accordsApi } from '../api/accords';

export const useAccordsStore = defineStore('accords', () => {
  const accords = ref<AccordDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  async function fetchAccords(page: number = 1) {
    loading.value = true;
    error.value = null;
    try {
      const result = await accordsApi.getAccords(page, pageSize.value);
      accords.value = result.data;
      currentPage.value = result.page;
      total.value = result.total;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch accords';
      console.error('[Pinia] Accords error:', err);
    } finally {
      loading.value = false;
    }
  }

  async function createAccord(data: CreateAccordDto) {
    loading.value = true;
    error.value = null;
    try {
      const newAccord = await accordsApi.createAccord(data);
      accords.value.push(newAccord);
      total.value++;
      return newAccord;
    } catch (err: any) {
      error.value = err.message || 'Failed to create accord';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateAccord(id: string, data: UpdateAccordDto) {
    loading.value = true;
    error.value = null;
    try {
      const updatedAccord = await accordsApi.updateAccord(id, data);
      const index = accords.value.findIndex(a => a.id === id);
      if (index !== -1) {
        accords.value[index] = updatedAccord;
      }
      return updatedAccord;
    } catch (err: any) {
      error.value = err.message || 'Failed to update accord';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteAccord(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await accordsApi.deleteAccord(id);
      accords.value = accords.value.filter(a => a.id !== id);
      total.value--;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete accord';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    accords.value = [];
    error.value = null;
    currentPage.value = 1;
  }

  return { accords, loading, error, currentPage, pageSize, total, totalPages, isLoading, hasError, fetchAccords, createAccord, updateAccord, deleteAccord, reset };
});
