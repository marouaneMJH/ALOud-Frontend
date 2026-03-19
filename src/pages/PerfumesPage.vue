<template>
  <CrudLayout page-title="Perfumes Management">
    <div class="space-y-6">
      <Modal v-if="showModal" @close="closeModal" :title="editingItem ? 'Edit Perfume' : 'Create New Perfume'">
        <form @submit.prevent="submitForm" class="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Perfume Name</label>
            <input v-model="formData.name" type="text" placeholder="e.g., No. 5" required class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Brand ID</label>
            <input v-model="formData.brandId" type="text" placeholder="Brand ID" required class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Price</label>
            <input v-model.number="formData.price" type="number" min="0" step="0.01" required class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Stock Quantity</label>
            <input v-model.number="formData.stockQuantity" type="number" min="0" required class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Description</label>
            <textarea v-model="formData.description" rows="2" placeholder="Description..." class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Intensity</label>
            <input v-model="formData.intensity" placeholder="e.g., Light, Medium, Strong" type="text" class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Gender Profile</label>
            <input v-model="formData.genderProfile" placeholder="e.g., Men, Women, Unisex" type="text" class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500" />
          </div>
          <div class="flex gap-4 pt-4">
            <button type="submit" :disabled="isSubmitting" class="flex-1 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-gray-900 font-medium rounded-lg hover:shadow-golden-glow transition duration-300 disabled:opacity-50">{{ isSubmitting ? 'Saving...' : editingItem ? 'Update' : 'Create' }}</button>
            <button type="button" @click="closeModal" class="flex-1 px-4 py-2 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300">Cancel</button>
          </div>
          <div v-if="formError" class="p-3 bg-red-950 border border-red-800 text-red-200 rounded-lg text-sm">{{ formError }}</div>
        </form>
      </Modal>

      <Modal v-if="showDeleteModal" @close="closeDeleteModal" title="Confirm Deletion">
        <div class="space-y-4">
          <p class="text-gray-300">Are you sure you want to delete this perfume?</p>
          <div class="flex gap-4 pt-4">
            <button @click="confirmDelete" :disabled="isDeleting" class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50">{{ isDeleting ? 'Deleting...' : 'Delete' }}</button>
            <button @click="closeDeleteModal" class="flex-1 px-4 py-2 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300">Cancel</button>
          </div>
        </div>
      </Modal>

      <DataTable :items="items" :columns="columns" entity-name="Perfume" :is-loading="isLoading" :has-error="hasError" :error="error" @create="openCreateModal" @edit="openEditModal" @delete="startDelete" />
    </div>
  </CrudLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CrudLayout from '@/components/common/CrudLayout.vue';
import DataTable from '@/components/common/DataTable.vue';
import Modal from '@/components/common/Modal.vue';
import { perfumesApi } from '@/api/perfumes';
import type { PerfumeDto, CreatePerfumeDto } from '@/types/api';

const items = ref<PerfumeDto[]>([]);
const isLoading = ref(false);
const hasError = ref(false);
const error = ref('');
const isSubmitting = ref(false);
const isDeleting = ref(false);
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingItem = ref<PerfumeDto | null>(null);
const deletingItem = ref<PerfumeDto | null>(null);
const formError = ref('');

const formData = ref<CreatePerfumeDto>({ 
  name: '', 
  brandId: '', 
  price: 0,
  stockQuantity: 0,
  description: '',
  intensity: '',
  genderProfile: '',
});

const columns = [
  { key: 'name', label: 'Perfume Name' },
  { key: 'brandId', label: 'Brand' },
  { key: 'price', label: 'Price' },
  { key: 'stockQuantity', label: 'Stock' },
  { key: 'intensity', label: 'Intensity' },
];

onMounted(async () => {
  await loadData();
});

const loadData = async () => {
  isLoading.value = true;
  hasError.value = false;
  error.value = '';
  try {
    const response = await perfumesApi.getPerfumes();
    items.value = Array.isArray(response) ? response : response.data || [];
  } catch (err: any) {
    hasError.value = true;
    error.value = err?.message || 'Failed to load perfumes';
  } finally {
    isLoading.value = false;
  }
};

const openCreateModal = () => {
  editingItem.value = null;
  formData.value = { name: '', brandId: '', price: 0, stockQuantity: 0, description: '', intensity: '', genderProfile: '' };
  formError.value = '';
  showModal.value = true;
};

const openEditModal = (item: PerfumeDto) => {
  editingItem.value = item;
  formData.value = { 
    name: item.name, 
    brandId: item.brandId,
    price: item.price,
    stockQuantity: item.stockQuantity,
    description: item.description || '',
    intensity: item.intensity || '',
    genderProfile: item.genderProfile || '',
  };
  formError.value = '';
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingItem.value = null;
  formData.value = { name: '', brandId: '', price: 0, stockQuantity: 0, description: '', intensity: '', genderProfile: '' };
  formError.value = '';
};

const submitForm = async () => {
  formError.value = '';
  if (!formData.value.name.trim()) {
    formError.value = 'Perfume name is required';
    return;
  }
  if (!formData.value.brandId.trim()) {
    formError.value = 'Brand ID is required';
    return;
  }
  if (formData.value.price < 0) {
    formError.value = 'Price cannot be negative';
    return;
  }
  isSubmitting.value = true;
  try {
    if (editingItem.value) {
      await perfumesApi.updatePerfume(editingItem.value.id, { id: editingItem.value.id, ...formData.value });
    } else {
      await perfumesApi.createPerfume(formData.value);
    }
    closeModal();
    await loadData();
  } catch (err: any) {
    formError.value = err?.message || 'Failed to save perfume';
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
    error.value = err?.message || 'Failed to delete perfume';
  } finally {
    isDeleting.value = false;
  }
};
</script>
