<template>
  <div class="relative overflow-hidden rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-6 shadow-lg hover:shadow-golden-glow transition-all duration-300">
    <!-- Golden glow background -->
    <div class="absolute inset-0 bg-golden-gradient opacity-0 hover:opacity-100 transition-opacity duration-300" />
    
    <!-- Content -->
    <div class="relative z-10">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-gold-300 uppercase tracking-wider">{{ title }}</h3>
        <div class="p-2 bg-gold-500 bg-opacity-10 rounded-lg border border-gold-600 border-opacity-30">
          <svg class="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>
      </div>
      
      <div class="mb-2">
        <p class="text-3xl font-bold text-gold-300">{{ formatValue(value) }}</p>
      </div>
      
      <div class="flex items-center gap-2">
        <span v-if="trend" class="text-sm font-medium" :class="trend > 0 ? 'text-green-400' : 'text-red-400'">
          {{ trend > 0 ? '+' : '' }}{{ trend }}%
        </span>
        <span class="text-xs text-gray-400">vs last month</span>
      </div>
    </div>
    
    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-transparent" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: number | string;
  trend?: number;
  format?: 'number' | 'currency' | 'percent';
}

defineProps<Props>();

const formatValue = (value: number | string) => {
  if (typeof value === 'string') return value;
  
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toLocaleString();
};
</script>
