<script setup lang="ts">
import { ref, onMounted } from "vue";
import Layout from "@/components/layout/Layout.vue";
import DataTable from "@/components/common/DataTable.vue";
import Modal from "@/components/common/Modal.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import Alert from "@/components/ui/Alert.vue";
import { brandsApi } from "@/api/brands";
import type { BrandDto, CreateBrandDto } from "@/types/api";

import type { PaginationMeta } from "@/types/api";

const brands = ref<BrandDto[]>([]);
const pagination = ref<PaginationMeta | null>(null);
const currentPage = ref(1);
const searchQuery = ref("");

const isLoading = ref(false);
const hasError = ref(false);
const error = ref("");
const isSubmitting = ref(false);
const isDeleting = ref(false);
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingBrand = ref<BrandDto | null>(null);
const deletingBrand = ref<BrandDto | null>(null);
const formError = ref("");

const formData = ref<CreateBrandDto>({
    name: "",
});

const columns = [
    { key: "name", label: "Brand Name" },
    { key: "perfumeCount", label: "Product Count" },
];

onMounted(async () => {
    await loadBrands();
});

const loadBrands = async () => {
    isLoading.value = true;
    hasError.value = false;
    error.value = "";

    try {
        const response = await brandsApi.getBrands({
            pageIndex: currentPage.value,
            query: searchQuery.value,
        });
        // response.data holds { items, pageIndex, totalPages, ... }
        brands.value = response.items;
        // Use all pagination meta directly from backend
        const { items, ...meta } = response;
        pagination.value = meta;
    } catch (err: any) {
        hasError.value = true;
        error.value = err?.message || "Failed to load brands";
    } finally {
        isLoading.value = false;
    }
};

const handlePageChange = async (page: number) => {
    currentPage.value = page;
    await loadBrands();
};

const handleSearch = async (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1; // reset to first page on new search
    await loadBrands();
};

const openCreateModal = () => {
    editingBrand.value = null;
    formData.value = { name: "" };
    formError.value = "";
    showModal.value = true;
};

const openEditModal = (brand: BrandDto) => {
    editingBrand.value = brand;
    formData.value = { name: brand.name };
    formError.value = "";
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    editingBrand.value = null;
    formData.value = { name: "" };
    formError.value = "";
};

const submitBrand = async () => {
    formError.value = "";

    if (!formData.value.name.trim()) {
        formError.value = "Brand name is required";
        return;
    }

    isSubmitting.value = true;

    try {
        if (editingBrand.value) {
            await brandsApi.updateBrand(editingBrand.value.id, {
                id: editingBrand.value.id,
                name: formData.value.name,
            });
        } else {
            await brandsApi.createBrand(formData.value);
        }
        closeModal();
        await loadBrands();
    } catch (err: any) {
        formError.value = err?.message || "Failed to save brand";
    } finally {
        isSubmitting.value = false;
    }
};

const startDelete = (brand: BrandDto) => {
    deletingBrand.value = brand;
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    deletingBrand.value = null;
};

const confirmDelete = async () => {
    if (!deletingBrand.value) return;

    isDeleting.value = true;

    try {
        await brandsApi.deleteBrand(deletingBrand.value.id);
        closeDeleteModal();
        // If we deleted the last item on this page, go back one page
        if (brands.value.length === 1 && currentPage.value > 1) {
            currentPage.value--;
        }
        await loadBrands();
    } catch (err: any) {
        error.value = err?.message || "Failed to delete brand";
    } finally {
        isDeleting.value = false;
    }
};
</script>

<template>
    <Layout page-title="Brands Management">
        <Modal
            v-if="showModal"
            @close="closeModal"
            :title="editingBrand ? 'Edit Brand' : 'Create New Brand'"
        >
            <form @submit.prevent="submitBrand" class="space-y-4">
                <div class="space-y-2">
                    <Label for="name">Brand Name</Label>
                    <Input
                        id="name"
                        v-model="formData.name"
                        type="text"
                        placeholder="e.g., Chanel"
                        required
                    />
                </div>

                <Alert v-if="formError" variant="destructive">
                    {{ formError }}
                </Alert>

                <div class="flex gap-3 pt-4">
                    <Button
                        type="submit"
                        class="flex-1"
                        :disabled="isSubmitting"
                    >
                        {{
                            isSubmitting
                                ? "Saving..."
                                : editingBrand
                                  ? "Update Brand"
                                  : "Create Brand"
                        }}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        class="flex-1"
                        @click="closeModal"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>

        <Modal
            v-if="showDeleteModal"
            @close="closeDeleteModal"
            title="Delete Brand"
        >
            <div class="space-y-4">
                <p class="text-muted-foreground">
                    Are you sure you want to delete
                    <span class="font-medium text-foreground">{{
                        deletingBrand?.name
                    }}</span
                    >? This action cannot be undone.
                </p>
                <div class="flex gap-3 pt-4">
                    <Button
                        variant="destructive"
                        class="flex-1"
                        :disabled="isDeleting"
                        @click="confirmDelete"
                    >
                        {{ isDeleting ? "Deleting..." : "Delete" }}
                    </Button>
                    <Button
                        variant="outline"
                        class="flex-1"
                        @click="closeDeleteModal"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>

        <DataTable
            :items="brands"
            :columns="columns"
            :pagination="pagination"
            entity-name="Brand"
            :is-loading="isLoading"
            :has-error="hasError"
            :error="error"
            @create="openCreateModal"
            @edit="openEditModal"
            @delete="startDelete"
            @page-change="handlePageChange"
            @search="handleSearch"
        />
    </Layout>
</template>
