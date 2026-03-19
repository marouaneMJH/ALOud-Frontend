<template>
  <div class="rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-6 shadow-lg overflow-hidden">
    <h2 class="text-lg font-semibold text-gold-300 mb-6">{{ title }}</h2>
    
    <div v-if="loading" class="flex items-center justify-center h-80">
      <div class="text-gold-400">Loading data...</div>
    </div>
    
    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gold-700">
            <th v-for="col in columns" :key="col" class="text-left py-3 px-4 font-semibold text-gold-400 text-xs uppercase tracking-wider">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, idx) in items" 
            :key="idx"
            class="border-b border-gray-800 hover:bg-gold-500 hover:bg-opacity-5 transition-colors duration-200"
          >
            <td 
              v-for="(col, colIdx) in columns" 
              :key="colIdx"
              class="py-4 px-4 text-gray-300"
              :class="{ 'text-gold-300 font-medium': colIdx === 0 }"
            >
              {{ formatCellValue(row[col.toLowerCase().replace(/\s+/g, '_')]) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  columns: string[];
  items: any[];
  loading?: boolean;
}

defineProps<Props>();

const formatCellValue = (value: any) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};
</script>
