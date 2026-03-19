<template>
    <CrudLayout page-title="Tags Management">
        <div class="space-y-6">
            <Modal
                v-if="showModal"
                @close="closeModal"
                :title="editingItem ? 'Edit Tag' : 'Create New Tag'"
            >
                <form @submit.prevent="submitForm" class="space-y-4">
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                            >Tag Name</label
                        >
                        <input
                            v-model="formData.name"
                            type="text"
                            placeholder="e.g., Bestseller"
                            required
                            class="w-full px-4 py-2 border border-gold-700 bg-gold-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                            >Description</label
                        >
                        <textarea
                            v-model="formData.description"
                            placeholder="Tag description..."
                            rows="3"
                            class="w-full px-4 py-2 border border-gold-700 bg-gold-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        />
                    </div>
                    <div class="flex gap-4 pt-4">
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="flex-1 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-gray-900 font-medium rounded-lg hover:shadow-golden-glow transition duration-300 disabled:opacity-50"
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
                            class="flex-1 px-4 py-2 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300"
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
                    <p class="text-gray-300">
                        Are you sure you want to delete this tag?
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
                            class="flex-1 px-4 py-2 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <DataTable
                :items="items"
                :columns="columns"
                entity-name="Tag"
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
import { tagsApi } from "@/api/tags";
import type { TagDto, CreateTagDto } from "@/types/api";

const items = ref<TagDto[]>([]);
const isLoading = ref(false);
const hasError = ref(false);
const error = ref("");
const isSubmitting = ref(false);
const isDeleting = ref(false);
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingItem = ref<TagDto | null>(null);
const deletingItem = ref<TagDto | null>(null);
const formError = ref("");

const formData = ref<CreateTagDto>({ name: "", description: "" });
const columns = [
    { key: "name", label: "Tag Name" },
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
        const response = await tagsApi.getTags();
        items.value = Array.isArray(response) ? response : response.data || [];
    } catch (err: any) {
        hasError.value = true;
        error.value = err?.message || "Failed to load tags";
    } finally {
        isLoading.value = false;
    }
};

const openCreateModal = () => {
    editingItem.value = null;
    formData.value = { name: "", description: "" };
    formError.value = "";
    showModal.value = true;
};

const openEditModal = (item: TagDto) => {
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
        formError.value = "Tag name is required";
        return;
    }
    isSubmitting.value = true;
    try {
        if (editingItem.value) {
            await tagsApi.updateTag(editingItem.value.id, {
                id: editingItem.value.id,
                ...formData.value,
            });
        } else {
            await tagsApi.createTag(formData.value);
        }
        closeModal();
        await loadData();
    } catch (err: any) {
        formError.value = err?.message || "Failed to save tag";
    } finally {
        isSubmitting.value = false;
    }
};

const startDelete = (item: TagDto) => {
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
        await tagsApi.deleteTag(deletingItem.value.id);
        closeDeleteModal();
        await loadData();
    } catch (err: any) {
        error.value = err?.message || "Failed to delete tag";
    } finally {
        isDeleting.value = false;
    }
};
</script>
