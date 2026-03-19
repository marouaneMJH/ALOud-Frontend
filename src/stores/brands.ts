import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { BrandDto, CreateBrandDto, UpdateBrandDto } from '../types/api';
import { brandsApi } from '../api/brands';

export const useBrandsStore = defineStore('brands', () => {
  const brands = ref<BrandDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  async function fetchBrands(page: number = 1) {
    loading.value = true;
    error.value = null;
    console.log('[Pinia] Starting to fetch brands...');
    try {
      const result = await brandsApi.getBrands(page, pageSize.value);
      console.log('[Pinia] Received brands:', result);
      brands.value = result.data;
      currentPage.value = result.page;
      total.value = result.total;
      console.log('[Pinia] Brands stored in state:', brands.value);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch brands';
      console.error('[Pinia] Brands error:', err);
    } finally {
      loading.value = false;
    }
  }

  async function createBrand(data: CreateBrandDto) {
    loading.value = true;
    error.value = null;
    try {
      const newBrand = await brandsApi.createBrand(data);
      brands.value.push(newBrand);
      total.value++;
      return newBrand;
    } catch (err: any) {
      error.value = err.message || 'Failed to create brand';
      console.error('Create brand error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateBrand(id: string, data: UpdateBrandDto) {
    loading.value = true;
    error.value = null;
    try {
      const updatedBrand = await brandsApi.updateBrand(id, data);
      const index = brands.value.findIndex(b => b.id === id);
      if (index !== -1) {
        brands.value[index] = updatedBrand;
      }
      return updatedBrand;
    } catch (err: any) {
      error.value = err.message || 'Failed to update brand';
      console.error('Update brand error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteBrand(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await brandsApi.deleteBrand(id);
      brands.value = brands.value.filter(b => b.id !== id);
      total.value--;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete brand';
      console.error('Delete brand error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    brands.value = [];
    error.value = null;
    currentPage.value = 1;
  }

  return {
    brands,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    totalPages,
    isLoading,
    hasError,
    fetchBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    reset,
  };
});
