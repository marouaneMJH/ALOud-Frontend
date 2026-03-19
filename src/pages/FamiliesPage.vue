<template>
  <CrudLayout page-title="Families Management">
    <div class="space-y-6">
      <!-- Create/Edit Modal -->
      <Modal v-if="showModal" @close="closeModal" :title="editingItem ? 'Edit Family' : 'Create New Family'">
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Family Name</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="e.g., Floral"
              required
              class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Description</label>
            <textarea
              v-model="formData.description"
              placeholder="Family description..."
              rows="3"
              class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-gray-900 font-medium rounded-lg hover:shadow-golden-glow transition duration-300 disabled:opacity-50"
            >
              {{ isSubmitting ? 'Saving...' : editingItem ? 'Update' : 'Create' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300"
            >
              Cancel
            </button>
          </div>

          <div v-if="formError" class="p-3 bg-red-950 border border-red-800 text-red-200 rounded-lg text-sm">
            {{ formError }}
          </div>
        </form>
      </Modal>

      <!-- Delete Confirmation Modal -->
      <Modal v-if="showDeleteModal" @close="closeDeleteModal" title="Confirm Deletion">
        <div class="space-y-4">
          <p class="text-gray-300">Are you sure you want to delete this family? This action cannot be undone.</p>
          <div class="flex gap-4 pt-4">
            <button
              @click="confirmDelete"
              :disabled="isDeleting"
              class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
            >
              {{ isDeleting ? 'Deleting...' : 'Delete' }}
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

      <!-- Data Table -->
      <DataTable
        :items="items"
        :columns="columns"
        entity-name="Family"
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
import { ref, onMounted } from 'vue';
import CrudLayout from '@/components/common/CrudLayout.vue';
import DataTable from '@/components/common/DataTable.vue';
import Modal from '@/components/common/Modal.vue';
import { familiesApi } from '@/api/families';
import type { FamilyDto, CreateFamilyDto } from '@/types/api';

// State
const items = ref<FamilyDto[]>([]);
const isLoading = ref(false);
const hasError = ref(false);
const error = ref('');
const isSubmitting = ref(false);
const isDeleting = ref(false);
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingItem = ref<FamilyDto | null>(null);
const deletingItem = ref<FamilyDto | null>(null);
const formError = ref('');

const formData = ref<CreateFamilyDto>({
  name: '',
  description: '',
});

const columns = [
  { key: 'name', label: 'Family Name' },
  { key: 'description', label: 'Description' },
];

// Lifecycle
onMounted(async () => {
  await loadData();
});

// Functions
const loadData = async () => {
  isLoading.value = true;
  hasError.value = false;
  error.value = '';

  try {
    const response = await familiesApi.getFamilies();
    items.value = Array.isArray(response) ? response : response.data || [];
  } catch (err: any) {
    hasError.value = true;
    error.value = err?.message || 'Failed to load families';
    console.error('Error loading families:', err);
  } finally {
    isLoading.value = false;
  }
};

const openCreateModal = () => {
  editingItem.value = null;
  formData.value = { name: '', description: '' };
  formError.value = '';
  showModal.value = true;
};

const openEditModal = (item: FamilyDto) => {
  editingItem.value = item;
  formData.value = { name: item.name, description: item.description };
  formError.value = '';
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingItem.value = null;
  formData.value = { name: '', description: '' };
  formError.value = '';
};

const submitForm = async () => {
  formError.value = '';

  if (!formData.value.name.trim()) {
    formError.value = 'Family name is required';
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
    formError.value = err?.message || 'Failed to save family';
    console.error('Error saving family:', err);
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
    error.value = err?.message || 'Failed to delete family';
    console.error('Error deleting family:', err);
  } finally {
    isDeleting.value = false;
  }
};
</script>
