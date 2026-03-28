<script setup lang="ts">
import { ref, onMounted } from "vue";
import Layout from "@/components/layout/Layout.vue";
import DataTable from "@/components/common/DataTable.vue";
import Modal from "@/components/common/Modal.vue";
import Input from "@/components/ui/Input.vue";
import Textarea from "@/components/ui/Textarea.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import Alert from "@/components/ui/Alert.vue";
import { perfumesApi } from "@/api/perfumes";
import type { PerfumeDto, CreatePerfumeDto } from "@/types/api";
import type { PaginationMeta } from "@/types/api";

const items = ref<PerfumeDto[]>([]);
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
const editingItem = ref<PerfumeDto | null>(null);
const deletingItem = ref<PerfumeDto | null>(null);
const formError = ref("");

const formData = ref<CreatePerfumeDto>({
    name: "",
    brandId: "",
    price: 0,
    stockQuantity: 0,
    description: "",
    intensity: "",
    genderProfile: "",
});

const columns = [
    { key: "name", label: "Perfume Name" },
    { key: "brandId", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "stockQuantity", label: "Stock" },
    { key: "intensity", label: "Intensity" },
];

onMounted(async () => {
    await loadData();
});

const loadData = async () => {
    isLoading.value = true;
    hasError.value = false;
    error.value = "";
    try {
        const response = await perfumesApi.getPerfumes({
            pageIndex: currentPage.value,
            query: searchQuery.value,
        });
        items.value = response.items;
        const { items: _, ...meta } = response;
        pagination.value = meta;
    } catch (err: any) {
        hasError.value = true;
        error.value = err?.message || "Failed to load perfumes";
    } finally {
        isLoading.value = false;
    }
};

const handlePageChange = async (page: number) => {
    currentPage.value = page;
    await loadData();
};

const handleSearch = async (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
    await loadData();
};

const openCreateModal = () => {
    editingItem.value = null;
    formData.value = {
        name: "",
        brandId: "",
        price: 0,
        stockQuantity: 0,
        description: "",
        intensity: "",
        genderProfile: "",
    };
    formError.value = "";
    showModal.value = true;
};

const openEditModal = (item: PerfumeDto) => {
    editingItem.value = item;
    formData.value = {
        name: item.name,
        brandId: item.brandId,
        price: item.price,
        stockQuantity: item.stockQuantity,
        description: item.description || "",
        intensity: item.intensity || "",
        genderProfile: item.genderProfile || "",
    };
    formError.value = "";
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    editingItem.value = null;
    formData.value = {
        name: "",
        brandId: "",
        price: 0,
        stockQuantity: 0,
        description: "",
        intensity: "",
        genderProfile: "",
    };
    formError.value = "";
};

const submitForm = async () => {
    formError.value = "";
    if (!formData.value.name.trim()) {
        formError.value = "Perfume name is required";
        return;
    }
    if (!formData.value.brandId.trim()) {
        formError.value = "Brand ID is required";
        return;
    }
    if (formData.value.price < 0) {
        formError.value = "Price cannot be negative";
        return;
    }
    isSubmitting.value = true;
    try {
        if (editingItem.value) {
            await perfumesApi.updatePerfume(editingItem.value.id, {
                id: editingItem.value.id,
                ...formData.value,
            });
        } else {
            await perfumesApi.createPerfume(formData.value);
        }
        closeModal();
        await loadData();
    } catch (err: any) {
        formError.value = err?.message || "Failed to save perfume";
    } finally {
        isSubmitting.value = false;
    }
};

const startDelete = (item: PerfumeDto) => {
    deletingItem.value = item;
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    deletingItem.value = null;
};

const confirmDelete = async () => {
    if (!deletingItem.value) return;
    isDeleting.value = true;
    try {
        await perfumesApi.deletePerfume(deletingItem.value.id);
        closeDeleteModal();
        await loadData();
    } catch (err: any) {
        error.value = err?.message || "Failed to delete perfume";
    } finally {
        isDeleting.value = false;
    }
};
</script>

<template>
    <Layout page-title="Perfumes Management">
        <Modal
            v-if="showModal"
            @close="closeModal"
            :title="editingItem ? 'Edit Perfume' : 'Create New Perfume'"
        >
            <form
                @submit.prevent="submitForm"
                class="space-y-4 max-h-96 overflow-y-auto"
            >
                <div class="space-y-2">
                    <Label for="name">Perfume Name</Label>
                    <Input
                        id="name"
                        v-model="formData.name"
                        type="text"
                        placeholder="e.g., No. 5"
                        required
                    />
                </div>
                <div class="space-y-2">
                    <Label for="brandId">Brand ID</Label>
                    <Input
                        id="brandId"
                        v-model="formData.brandId"
                        type="text"
                        placeholder="Brand ID"
                        required
                    />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="price">Price</Label>
                        <Input
                            id="price"
                            v-model.number="formData.price"
                            type="number"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="stock">Stock Quantity</Label>
                        <Input
                            id="stock"
                            v-model.number="formData.stockQuantity"
                            type="number"
                            min="0"
                            required
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <Label for="description">Description</Label>
                    <Textarea
                        id="description"
                        v-model="formData.description"
                        rows="2"
                        placeholder="Description..."
                    />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="intensity">Intensity</Label>
                        <Input
                            id="intensity"
                            v-model="formData.intensity"
                            placeholder="e.g., Light, Medium, Strong"
                            type="text"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="gender">Gender Profile</Label>
                        <Input
                            id="gender"
                            v-model="formData.genderProfile"
                            placeholder="e.g., Men, Women, Unisex"
                            type="text"
                        />
                    </div>
                </div>

                <Alert v-if="formError" variant="destructive">
                    {{ formError }}
                </Alert>

                <div class="flex gap-3 pt-4">
                    <Button type="submit" class="flex-1" :disabled="isSubmitting">
                        {{
                            isSubmitting
                                ? "Saving..."
                                : editingItem
                                  ? "Update"
                                  : "Create"
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
            title="Confirm Deletion"
        >
            <div class="space-y-4">
                <p class="text-muted-foreground">
                    Are you sure you want to delete this perfume? This action
                    cannot be undone.
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
            :items="items"
            :columns="columns"
            :pagination="pagination"
            entity-name="Perfume"
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
