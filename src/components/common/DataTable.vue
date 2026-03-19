<template>
  <div class="space-y-6">
    <!-- Toolbar -->
    <div class="flex justify-between items-center gap-4">
      <div class="flex-1 flex gap-2">
        <div class="relative flex-1 max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent placeholder-gray-500"
          />
          <div class="absolute inset-0 rounded-lg pointer-events-none shadow-golden-glow opacity-0 focus-within:opacity-100 transition-opacity" />
        </div>
      </div>
      <button
        @click="$emit('create')"
        class="px-6 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-gray-900 font-medium rounded-lg hover:shadow-golden-glow-lg transition duration-300 flex items-center gap-2"
      >
        <span>+</span>
        <span>New {{ entityName }}</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-2 border-gold-500 border-t-transparent"></div>
        <p class="text-gold-400">Loading {{ entityName }}s...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="bg-red-950 border border-red-800 rounded-lg p-4 text-red-200">
      <p class="font-semibold mb-1">Error</p>
      <p class="text-sm">{{ error }}</p>
    </div>

    <!-- Table -->
    <div v-else class="rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 shadow-lg overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-900 border-b border-gold-700">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 text-left font-semibold text-gold-400 text-xs uppercase tracking-wider"
            >
              {{ col.label }}
            </th>
            <th class="px-6 py-4 text-left font-semibold text-gold-400 text-xs uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-800">
          <tr
            v-for="item in filteredItems"
            :key="item.id"
            class="hover:bg-gold-500 hover:bg-opacity-5 transition duration-200 group"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 text-gray-300 group-hover:text-gold-200 transition duration-200"
            >
              {{ item[col.key] }}
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-3">
                <button
                  @click="$emit('edit', item)"
                  class="text-gold-400 hover:text-gold-200 font-medium text-sm transition duration-200"
                >
                  Edit
                </button>
                <button
                  @click="$emit('delete', item.id)"
                  class="text-red-400 hover:text-red-200 font-medium text-sm transition duration-200"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="items.length === 0" class="text-center py-16 text-gray-400">
        <p class="mb-2">No {{ entityName }}s found</p>
        <p class="text-xs text-gray-500">Click "New {{ entityName }}" to create your first entry</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="items.length > 0" class="flex justify-between items-center mt-6">
      <p class="text-sm text-gray-400">
        Showing {{ (currentPage - 1) * pageSize + 1 }} to
        {{ Math.min(currentPage * pageSize, items.length) }} of {{ items.length }}
      </p>
      <div class="flex gap-2">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="px-4 py-2 border border-gold-700 text-gold-400 rounded-lg hover:bg-gold-500 hover:bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 disabled:hover:bg-transparent"
        >
          Previous
        </button>
        <button
          :disabled="currentPage * pageSize >= items.length"
          @click="currentPage++"
          class="px-4 py-2 border border-gold-700 text-gold-400 rounded-lg hover:bg-gold-500 hover:bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 disabled:hover:bg-transparent"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Column {
  key: string;
  label: string;
}

interface Props {
  items: any[];
  columns: Column[];
  entityName: string;
  isLoading?: boolean;
  hasError?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  hasError: false,
  error: '',
});

defineEmits<{
  create: [];
  edit: [item: any];
  delete: [id: string];
}>();

const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = 10;

const filteredItems = computed(() => {
  let filtered = props.items;

  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      JSON.stringify(item).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  );
});
</script>
