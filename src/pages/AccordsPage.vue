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

<template>
    <Layout page-title="Accords Management">
        <Modal
            v-if="showModal"
            @close="closeModal"
            :title="editingItem ? 'Edit Accord' : 'Create New Accord'"
        >
            <form
                @submit.prevent="submitForm"
                class="space-y-4 max-h-96 overflow-y-auto"
            >
                <div class="space-y-2">
                    <Label for="name">Accord Name</Label>
                    <Input
                        id="name"
                        v-model="formData.name"
                        type="text"
                        placeholder="e.g., Warm"
                        required
                    />
                </div>
                <div class="space-y-2">
                    <Label for="description">Description</Label>
                    <Textarea
                        id="description"
                        v-model="formData.description"
                        placeholder="Accord description..."
                        rows="2"
                    />
                </div>
                <div class="space-y-2">
                    <Label for="effect">Effect</Label>
                    <Input
                        id="effect"
                        v-model="formData.effect"
                        placeholder="e.g., Fresh"
                        type="text"
                    />
                </div>
                <div class="space-y-2">
                    <Label for="popularity">Popularity (0-100)</Label>
                    <Input
                        id="popularity"
                        v-model.number="formData.popularity"
                        type="number"
                        min="0"
                        max="100"
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
                    Are you sure you want to delete this accord? This action
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
            entity-name="Accord"
            :is-loading="isLoading"
            :has-error="hasError"
            :error="error"
            @create="openCreateModal"
            @edit="openEditModal"
            @delete="startDelete"
        />
    </Layout>
</template>
