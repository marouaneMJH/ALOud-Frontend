import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { TagDto, CreateTagDto, UpdateTagDto } from '../types/api';
import { tagsApi } from '../api/tags';

export const useTagsStore = defineStore('tags', () => {
  const tags = ref<TagDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  async function fetchTags(page: number = 1) {
    loading.value = true;
    error.value = null;
    console.log('[Pinia] Starting to fetch tags...');
    try {
      const result = await tagsApi.getTags(page, pageSize.value);
      console.log('[Pinia] Received tags:', result);
      tags.value = result.data;
      currentPage.value = result.page;
      total.value = result.total;
      console.log('[Pinia] Tags stored in state:', tags.value);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch tags';
      console.error('[Pinia] Tags error:', err);
    } finally {
      loading.value = false;
    }
  }

  async function createTag(data: CreateTagDto) {
    loading.value = true;
    error.value = null;
    try {
      const newTag = await tagsApi.createTag(data);
      tags.value.push(newTag);
      total.value++;
      return newTag;
    } catch (err: any) {
      error.value = err.message || 'Failed to create tag';
      console.error('Create tag error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateTag(id: string, data: UpdateTagDto) {
    loading.value = true;
    error.value = null;
    try {
      const updatedTag = await tagsApi.updateTag(id, data);
      const index = tags.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tags.value[index] = updatedTag;
      }
      return updatedTag;
    } catch (err: any) {
      error.value = err.message || 'Failed to update tag';
      console.error('Update tag error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteTag(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await tagsApi.deleteTag(id);
      tags.value = tags.value.filter(t => t.id !== id);
      total.value--;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete tag';
      console.error('Delete tag error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    tags.value = [];
    error.value = null;
    currentPage.value = 1;
  }

  return {
    tags,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    totalPages,
    isLoading,
    hasError,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
    reset,
  };
});
