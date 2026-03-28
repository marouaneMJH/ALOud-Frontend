import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
    FamilyDto,
    CreateFamilyDto,
    UpdateFamilyDto,
    PaginationMeta,
} from "../types/api";
import { familiesApi } from "../api/families";

export const useFamiliesStore = defineStore("families", () => {
    const families = ref<FamilyDto[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const pagination = ref<PaginationMeta | null>(null);
    const currentPage = ref(1);
    const isLoading = computed(() => loading.value);
    const hasError = computed(() => error.value !== null);

    async function fetchFamilies(
        params: { page?: number; pageSize?: number; search?: string } = {},
    ) {
        loading.value = true;
        error.value = null;
        try {
            const result = await familiesApi.getFamilies(params);
            families.value = result.items;
            pagination.value = { ...result };
            delete (pagination.value as any).items;
            currentPage.value = result.pageIndex;
        } catch (err: any) {
            error.value = err.message || "Failed to fetch families";
            console.error("[Pinia] Families error:", err);
        } finally {
            loading.value = false;
        }
    }

    async function createFamily(data: CreateFamilyDto) {
        loading.value = true;
        error.value = null;
        try {
            const newFamily = await familiesApi.createFamily(data);
            families.value.push(newFamily);
            total.value++;
            return newFamily;
        } catch (err: any) {
            error.value = err.message || "Failed to create family";
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function updateFamily(id: string, data: UpdateFamilyDto) {
        loading.value = true;
        error.value = null;
        try {
            const updatedFamily = await familiesApi.updateFamily(id, data);
            const index = families.value.findIndex((f) => f.id === id);
            if (index !== -1) {
                families.value[index] = updatedFamily;
            }
            return updatedFamily;
        } catch (err: any) {
            error.value = err.message || "Failed to update family";
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function deleteFamily(id: string) {
        loading.value = true;
        error.value = null;
        try {
            await familiesApi.deleteFamily(id);
            families.value = families.value.filter((f) => f.id !== id);
            total.value--;
        } catch (err: any) {
            error.value = err.message || "Failed to delete family";
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function reset() {
        families.value = [];
        error.value = null;
        currentPage.value = 1;
    }

    return {
        families,
        loading,
        error,
        pagination,
        currentPage,
        isLoading,
        hasError,
        fetchFamilies,
        createFamily,
        updateFamily,
        deleteFamily,
        reset,
    };
});
