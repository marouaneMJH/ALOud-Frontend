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
import { familiesApi } from "@/api/families";
import type { FamilyDto, CreateFamilyDto } from "@/types/api";
import type { PaginationMeta } from "@/types/api";

const items = ref<FamilyDto[]>([]);
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
const editingItem = ref<FamilyDto | null>(null);
const deletingItem = ref<FamilyDto | null>(null);
const formError = ref("");

const formData = ref<CreateFamilyDto>({
    name: "",
    description: "",
});

const columns = [
    { key: "name", label: "Family Name" },
    { key: "description", label: "Description" },
];

onMounted(async () => {
    await loadData();
});

const loadData = async () => {
    isLoading.value = true;
    hasError.value = false;
    error.value = "";

    try {
        const response = await familiesApi.getFamilies({
            pageIndex: currentPage.value,
            query: searchQuery.value,
        });
        items.value = response.items;
        const { items: _, ...meta } = response;
        pagination.value = meta;
    } catch (err: any) {
        hasError.value = true;
        error.value = err?.message || "Failed to load families";
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
    formData.value = { name: "", description: "" };
    formError.value = "";
    showModal.value = true;
};

const openEditModal = (item: FamilyDto) => {
    editingItem.value = item;
    formData.value = { name: item.name, description: item.description };
    formError.value = "";
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    editingItem.value = null;
    formData.value = { name: "", description: "" };
    formError.value = "";
};

const submitForm = async () => {
    formError.value = "";

    if (!formData.value.name.trim()) {
        formError.value = "Family name is required";
        return;
    }

    isSubmitting.value = true;

    try {
        if (editingItem.value) {
            await familiesApi.updateFamily(editingItem.value.id, {
                id: editingItem.value.id,
                name: formData.value.name,
                description: formData.value.description,
            });
        } else {
            await familiesApi.createFamily(formData.value);
        }
        closeModal();
        await loadData();
    } catch (err: any) {
        formError.value = err?.message || "Failed to save family";
    } finally {
        isSubmitting.value = false;
    }
};

const startDelete = (item: FamilyDto) => {
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
        await familiesApi.deleteFamily(deletingItem.value.id);
        closeDeleteModal();
        await loadData();
    } catch (err: any) {
        error.value = err?.message || "Failed to delete family";
    } finally {
        isDeleting.value = false;
    }
};
</script>

<template>
    <Layout page-title="Families Management">
        <Modal
            v-if="showModal"
            @close="closeModal"
            :title="editingItem ? 'Edit Family' : 'Create New Family'"
        >
            <form @submit.prevent="submitForm" class="space-y-4">
                <div class="space-y-2">
                    <Label for="name">Family Name</Label>
                    <Input
                        id="name"
                        v-model="formData.name"
                        type="text"
                        placeholder="e.g., Floral"
                        required
                    />
                </div>
                <div class="space-y-2">
                    <Label for="description">Description</Label>
                    <Textarea
                        id="description"
                        v-model="formData.description"
                        placeholder="Family description..."
                        rows="3"
                    />
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
                    Are you sure you want to delete this family? This action
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
            entity-name="Family"
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
