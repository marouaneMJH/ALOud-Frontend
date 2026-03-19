<template>
    <CrudLayout page-title="Accords Management">
        <div class="space-y-6">
            <Modal
                v-if="showModal"
                @close="closeModal"
                :title="editingItem ? 'Edit Accord' : 'Create New Accord'"
            >
                <form
                    @submit.prevent="submitForm"
                    class="space-y-4 max-h-96 overflow-y-auto"
                >
                    <div>
                        <label
                            class="block text-sm font-medium text-amber-900 mb-2"
                            >Accord Name</label
                        >
                        <input
                            v-model="formData.name"
                            type="text"
                            placeholder="e.g., Warm"
                            required
                            class="w-full px-4 py-2 border border-amber-300 bg-white text-amber-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-amber-900 mb-2"
                            >Description</label
                        >
                        <textarea
                            v-model="formData.description"
                            placeholder="Accord description..."
                            rows="2"
                            class="w-full px-4 py-2 border border-amber-300 bg-white text-amber-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-amber-900 mb-2"
                            >Effect</label
                        >
                        <input
                            v-model="formData.effect"
                            placeholder="e.g., Fresh"
                            type="text"
                            class="w-full px-4 py-2 border border-amber-300 bg-white text-amber-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-amber-900 mb-2"
                            >Popularity (0-100)</label
                        >
                        <input
                            v-model.number="formData.popularity"
                            type="number"
                            min="0"
                            max="100"
                            class="w-full px-4 py-2 border border-amber-300 bg-white text-amber-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div class="flex gap-4 pt-4">
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-amber-100 font-medium rounded-lg hover:shadow-md transition duration-300 disabled:opacity-50"
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
                            class="flex-1 px-4 py-2 border border-amber-300 text-amber-700 font-medium rounded-lg hover:bg-amber-100 transition duration-300"
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
                    <p class="text-amber-900">
                        Are you sure you want to delete this accord?
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
                            class="flex-1 px-4 py-2 border border-amber-300 text-amber-700 font-medium rounded-lg hover:bg-amber-100 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <DataTable
                :items="items"
                :columns="columns"
                entity-name="Accord"
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
import { accordsApi } from "@/api/accords";
import type { AccordDto, CreateAccordDto } from "@/types/api";

const items = ref<AccordDto[]>([]);
const isLoading = ref(false);
const hasError = ref(false);
const error = ref("");
const isSubmitting = ref(false);
const isDeleting = ref(false);
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingItem = ref<AccordDto | null>(null);
const deletingItem = ref<AccordDto | null>(null);
const formError = ref("");

const formData = ref<CreateAccordDto>({
    name: "",
    description: "",
    effect: "",
    popularity: 50,
});
const columns = [
    { key: "name", label: "Accord Name" },
    { key: "description", label: "Description" },
    { key: "effect", label: "Effect" },
    { key: "popularity", label: "Popularity" },
];

onMounted(async () => {
    await loadData();
});

const loadData = async () => {
    isLoading.value = true;
    hasError.value = false;
    error.value = "";
    try {
        const response = await accordsApi.getAccords();
        items.value = Array.isArray(response)
            ? response
            : response.items || response.data || [];
    } catch (err: any) {
        hasError.value = true;
        error.value = err?.message || "Failed to load accords";
    } finally {
        isLoading.value = false;
    }
};

const openCreateModal = () => {
    editingItem.value = null;
    formData.value = { name: "", description: "", effect: "", popularity: 50 };
    formError.value = "";
    showModal.value = true;
};

const openEditModal = (item: AccordDto) => {
    editingItem.value = item;
    formData.value = {
        name: item.name,
        description: item.description,
        effect: item.effect || "",
        popularity: item.popularity || 50,
    };
    formError.value = "";
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    editingItem.value = null;
    formData.value = { name: "", description: "", effect: "", popularity: 50 };
    formError.value = "";
};

const submitForm = async () => {
    formError.value = "";
    if (!formData.value.name.trim()) {
        formError.value = "Accord name is required";
        return;
    }
    isSubmitting.value = true;
    try {
        if (editingItem.value) {
            await accordsApi.updateAccord(editingItem.value.id, {
                id: editingItem.value.id,
                ...formData.value,
            });
        } else {
            await accordsApi.createAccord(formData.value);
        }
        closeModal();
        await loadData();
    } catch (err: any) {
        formError.value = err?.message || "Failed to save accord";
    } finally {
        isSubmitting.value = false;
    }
};

const startDelete = (item: AccordDto) => {
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
        await accordsApi.deleteAccord(deletingItem.value.id);
        closeDeleteModal();
        await loadData();
    } catch (err: any) {
        error.value = err?.message || "Failed to delete accord";
    } finally {
        isDeleting.value = false;
    }
};
</script>
