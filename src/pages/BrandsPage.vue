<template>
    <CrudLayout page-title="Brands Management">
        <div class="space-y-6">
            <!-- Create/Edit Modal -->
            <Modal
                v-if="showModal"
                @close="closeModal"
                :title="editingBrand ? 'Edit Brand' : 'Create New Brand'"
            >
                <form @submit.prevent="submitBrand" class="space-y-4">
                    <div>
                        <label
                            class="block text-sm font-medium text-foreground mb-2"
                            >Brand Name</label
                        >
                        <input
                            v-model="formData.name"
                            type="text"
                            placeholder="e.g., Chanel"
                            required
                            class="w-full px-4 py-2 border border-border bg-white text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div class="flex gap-4 pt-4">
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 text-muted font-medium rounded-lg hover:shadow-md transition duration-300 disabled:opacity-50"
                        >
                            {{
                                isSubmitting
                                    ? "Saving..."
                                    : editingBrand
                                      ? "Update Brand"
                                      : "Create Brand"
                            }}
                        </button>
                        <button
                            type="button"
                            @click="closeModal"
                            class="flex-1 px-4 py-2 border border-border text-muted-foreground font-medium rounded-lg hover:bg-muted transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>

                    <div
                        v-if="formError"
                        class="p-3 bg-red-950 border border-red-800 text-red-200 rounded-lg text-sm"
                    >
                        {{ formError }}
                    </div>
                </form>
            </Modal>

            <!-- Delete Confirmation Modal -->
            <Modal
                v-if="showDeleteModal"
                @close="closeDeleteModal"
                title="Delete Brand"
            >
                <div class="space-y-4">
                    <p class="text-foreground">
                        Are you sure you want to delete this brand? This action
                        cannot be undone.
                    </p>
                    <div class="flex gap-4 pt-4">
                        <button
                            @click="confirmDelete"
                            :disabled="isDeleting"
                            class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
                        >
                            {{ isDeleting ? "Deleting..." : "Delete" }}
                        </button>
                        <button
                            @click="closeDeleteModal"
                            class="flex-1 px-4 py-2 border border-border text-muted-foreground font-medium rounded-lg hover:bg-muted transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <!-- Data Table -->
            <DataTable
                :items="brands"
                :columns="columns"
                entity-name="Brand"
                :is-loading="isLoading"
                :has-error="hasError"
                :error="error"
                @create="openCreateModal"
                @edit="openEditModal"
                @delete="startDelete"
            />
        </div>
    </CrudLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CrudLayout from "@/components/common/CrudLayout.vue";
import DataTable from "@/components/common/DataTable.vue";
import Modal from "@/components/common/Modal.vue";
import { brandsApi } from "@/api/brands";
import type { BrandDto, CreateBrandDto } from "@/types/api";

// State
const brands = ref<BrandDto[]>([]);
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

// Lifecycle
onMounted(async () => {
    await loadBrands();
});

// Functions
const loadBrands = async () => {
    isLoading.value = true;
    hasError.value = false;
    error.value = "";

    try {
        const response = await brandsApi.getBrands();
        brands.value = Array.isArray(response)
            ? response
            : response.items || response.data || [];
    } catch (err: any) {
        hasError.value = true;
        error.value = err?.message || "Failed to load brands";
        console.error("Error loading brands:", err);
    } finally {
        isLoading.value = false;
    }
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
        console.error("Error saving brand:", err);
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
        await loadBrands();
    } catch (err: any) {
        error.value = err?.message || "Failed to delete brand";
        console.error("Error deleting brand:", err);
    } finally {
        isDeleting.value = false;
    }
};
</script>
