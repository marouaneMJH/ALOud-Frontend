import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
    PerfumeDto,
    CreatePerfumeDto,
    UpdatePerfumeDto,
    PaginationMeta,
} from "../types/api";
import { perfumesApi } from "../api/perfumes";

export const usePerfumesStore = defineStore("perfumes", () => {
    const perfumes = ref<PerfumeDto[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const pagination = ref<PaginationMeta | null>(null);
    const currentPage = ref(1);
    const isLoading = computed(() => loading.value);
    const hasError = computed(() => error.value !== null);

    async function fetchPerfumes(page: number = 1, pageSize: number = 10) {
        loading.value = true;
        error.value = null;
        try {
            const result = await perfumesApi.getPerfumes(page, pageSize);
            perfumes.value = result.items;
            pagination.value = { ...result };
            delete (pagination.value as any).items;
            currentPage.value = result.pageIndex;
        } catch (err: any) {
            error.value = err.message || "Failed to fetch perfumes";
            console.error("[Pinia] Perfumes error:", err);
        } finally {
            loading.value = false;
        }
    }

    async function createPerfume(data: CreatePerfumeDto) {
        loading.value = true;
        error.value = null;
        try {
            const newPerfume = await perfumesApi.createPerfume(data);
            perfumes.value.push(newPerfume);
            total.value++;
            return newPerfume;
        } catch (err: any) {
            error.value = err.message || "Failed to create perfume";
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function updatePerfume(id: string, data: UpdatePerfumeDto) {
        loading.value = true;
        error.value = null;
        try {
            const updatedPerfume = await perfumesApi.updatePerfume(id, data);
            const index = perfumes.value.findIndex((p) => p.id === id);
            if (index !== -1) {
                perfumes.value[index] = updatedPerfume;
            }
            return updatedPerfume;
        } catch (err: any) {
            error.value = err.message || "Failed to update perfume";
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function deletePerfume(id: string) {
        loading.value = true;
        error.value = null;
        try {
            await perfumesApi.deletePerfume(id);
            perfumes.value = perfumes.value.filter((p) => p.id !== id);
            total.value--;
        } catch (err: any) {
            error.value = err.message || "Failed to delete perfume";
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function reset() {
        perfumes.value = [];
        error.value = null;
        currentPage.value = 1;
    }

    return {
        perfumes,
        loading,
        error,
        pagination,
        currentPage,
        isLoading,
        hasError,
        fetchPerfumes,
        createPerfume,
        updatePerfume,
        deletePerfume,
        reset,
    };
});
