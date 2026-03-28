import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
    TagDto,
    CreateTagDto,
    UpdateTagDto,
    PaginationMeta,
} from "../types/api";
import { tagsApi } from "../api/tags";

export const useTagsStore = defineStore("tags", () => {
    const tags = ref<TagDto[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const pagination = ref<PaginationMeta | null>(null);
    const currentPage = ref(1);
    const isLoading = computed(() => loading.value);
    const hasError = computed(() => error.value !== null);

    async function fetchTags(
        params: { page?: number; pageSize?: number; search?: string } = {},
    ) {
        loading.value = true;
        error.value = null;
        try {
            const result = await tagsApi.getTags(params);
            tags.value = result.items;
            pagination.value = { ...result };
            delete (pagination.value as any).items;
            currentPage.value = result.pageIndex;
        } catch (err: any) {
            error.value = err.message || "Failed to fetch tags";
            console.error("[Pinia] Tags error:", err);
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
            error.value = err.message || "Failed to create tag";
            console.error("Create tag error:", err);
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
            const index = tags.value.findIndex((t) => t.id === id);
            if (index !== -1) {
                tags.value[index] = updatedTag;
            }
            return updatedTag;
        } catch (err: any) {
            error.value = err.message || "Failed to update tag";
            console.error("Update tag error:", err);
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
            tags.value = tags.value.filter((t) => t.id !== id);
            total.value--;
        } catch (err: any) {
            error.value = err.message || "Failed to delete tag";
            console.error("Delete tag error:", err);
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
        pagination,
        currentPage,
        isLoading,
        hasError,
        fetchTags,
        createTag,
        updateTag,
        deleteTag,
        reset,
    };
});
