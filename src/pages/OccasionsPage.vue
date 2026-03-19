<template>
    <CrudLayout page-title="Occasions Management">
        <div class="space-y-6">
            <Modal
                v-if="showModal"
                @close="closeModal"
                :title="editingItem ? 'Edit Occasion' : 'Create New Occasion'"
            >
                <form
                    @submit.prevent="submitForm"
                    class="space-y-4 max-h-96 overflow-y-auto"
                >
                    <div>
                        <label
                            class="block text-sm font-medium text-foreground mb-2"
                            >Occasion Name</label
                        >
                        <input
                            v-model="formData.name"
                            type="text"
                            placeholder="e.g., Evening"
                            required
                            class="w-full px-4 py-2 border border-border bg-white text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-foreground mb-2"
                            >Description</label
                        >
                        <textarea
                            v-model="formData.description"
                            placeholder="Occasion description..."
                            rows="2"
                            class="w-full px-4 py-2 border border-border bg-white text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-foreground mb-2"
                            >Recommended Sillage</label
                        >
                        <input
                            v-model="formData.recommendedSillage"
                            placeholder="e.g., Light to Medium"
                            type="text"
                            class="w-full px-4 py-2 border border-border bg-white text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-foreground mb-2"
                            >Recommended Longevity</label
                        >
                        <input
                            v-model="formData.recommendedLongevity"
                            placeholder="e.g., 6-8 hours"
                            type="text"
                            class="w-full px-4 py-2 border border-border bg-white text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                                    : editingItem
                                      ? "Update"
                                      : "Create"
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

            <Modal
                v-if="showDeleteModal"
                @close="closeDeleteModal"
                title="Confirm Deletion"
            >
                <div class="space-y-4">
                    <p class="text-foreground">
                        Are you sure you want to delete this occasion?
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

            <DataTable
                :items="items"
                :columns="columns"
                entity-name="Occasion"
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
import { occasionsApi } from "@/api/occasions";
import type { OccasionDto, CreateOccasionDto } from "@/types/api";

const items = ref<OccasionDto[]>([]);
const isLoading = ref(false);
const hasError = ref(false);
const error = ref("");
const isSubmitting = ref(false);
const isDeleting = ref(false);
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingItem = ref<OccasionDto | null>(null);
const deletingItem = ref<OccasionDto | null>(null);
const formError = ref("");

const formData = ref<CreateOccasionDto>({
    name: "",
    description: "",
    recommendedSillage: "",
    recommendedLongevity: "",
});
const columns = [
    { key: "name", label: "Occasion Name" },
    { key: "description", label: "Description" },
    { key: "recommendedSillage", label: "Recommended Sillage" },
];

onMounted(async () => {
    await loadData();
});

const loadData = async () => {
    isLoading.value = true;
    hasError.value = false;
    error.value = "";
    try {
        const response = await occasionsApi.getOccasions();
        items.value = Array.isArray(response)
            ? response
            : response.items || response.data || [];
    } catch (err: any) {
        hasError.value = true;
        error.value = err?.message || "Failed to load occasions";
    } finally {
        isLoading.value = false;
    }
};

const openCreateModal = () => {
    editingItem.value = null;
    formData.value = {
        name: "",
        description: "",
        recommendedSillage: "",
        recommendedLongevity: "",
    };
    formError.value = "";
    showModal.value = true;
};

const openEditModal = (item: OccasionDto) => {
    editingItem.value = item;
    formData.value = {
        name: item.name,
        description: item.description,
        recommendedSillage: item.recommendedSillage || "",
        recommendedLongevity: item.recommendedLongevity || "",
    };
    formError.value = "";
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    editingItem.value = null;
    formData.value = {
        name: "",
        description: "",
        recommendedSillage: "",
        recommendedLongevity: "",
    };
    formError.value = "";
};

const submitForm = async () => {
    formError.value = "";
    if (!formData.value.name.trim()) {
        formError.value = "Occasion name is required";
        return;
    }
    isSubmitting.value = true;
    try {
        if (editingItem.value) {
            await occasionsApi.updateOccasion(editingItem.value.id, {
                id: editingItem.value.id,
                ...formData.value,
            });
        } else {
            await occasionsApi.createOccasion(formData.value);
        }
        closeModal();
        await loadData();
    } catch (err: any) {
        formError.value = err?.message || "Failed to save occasion";
    } finally {
        isSubmitting.value = false;
    }
};

const startDelete = (item: OccasionDto) => {
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
        await occasionsApi.deleteOccasion(deletingItem.value.id);
        closeDeleteModal();
        await loadData();
    } catch (err: any) {
        error.value = err?.message || "Failed to delete occasion";
    } finally {
        isDeleting.value = false;
    }
};
</script>
