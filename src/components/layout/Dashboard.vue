<template>
  <div class="space-y-8">
    <!-- Stats Grid -->
    <div v-if="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Perfumes"
        :value="stats?.totalPerfumes ?? 0"
        :trend="12"
      />
      <StatCard
        title="Total Brands"
        :value="stats?.totalBrands ?? 0"
        :trend="8"
      />
      <StatCard
        title="Total Families"
        :value="stats?.totalFamilies ?? 0"
        :trend="5"
      />
      <StatCard
        title="Total Notes"
        :value="stats?.totalNotes ?? 0"
        :trend="15"
      />
    </div>

    <div v-if="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Accords"
        :value="stats?.totalAccords ?? 0"
        :trend="3"
      />
      <StatCard
        title="Total Tags"
        :value="stats?.totalTags ?? 0"
        :trend="7"
      />
      <StatCard
        title="Total Seasons"
        :value="stats?.totalSeasons ?? 0"
        :trend="0"
      />
      <StatCard
        title="Total Occasions"
        :value="stats?.totalOccasions ?? 0"
        :trend="10"
      />
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-2 border-gold-500 border-t-transparent"></div>
        <p class="text-gold-400">Loading dashboard data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="hasError" class="bg-red-950 border border-red-800 rounded-lg p-4 text-red-200">
      <p class="font-semibold mb-1">Error Loading Dashboard</p>
      <p class="text-sm">{{ error }}</p>
    </div>

    <!-- Top Brands Section -->
    <div v-if="stats && stats.topBrands.length > 0" class="rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-6 shadow-lg">
      <h3 class="text-lg font-semibold text-gold-300 mb-6 uppercase tracking-wider">Top Brands</h3>
      <div class="space-y-4">
        <div
          v-for="brand in stats.topBrands"
          :key="brand.brandId"
          class="group p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gold-700 border-opacity-30 hover:border-opacity-100 transition-all duration-200"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium text-gray-200">{{ brand.brandName }}</span>
            <span class="text-gold-300 font-semibold">{{ brand.perfumeCount }} products</span>
          </div>
          <div class="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-gold-500 to-gold-400 group-hover:shadow-golden-glow transition-all duration-300"
              :style="{ width: `${(brand.perfumeCount / (stats.topBrands[0]?.perfumeCount || 1)) * 100}%` }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Top Families Section -->
    <div v-if="stats && stats.topFamilies.length > 0" class="rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-6 shadow-lg">
      <h3 class="text-lg font-semibold text-gold-300 mb-6 uppercase tracking-wider">Top Families</h3>
      <div class="space-y-4">
        <div
          v-for="family in stats.topFamilies"
          :key="family.familyId"
          class="group p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gold-700 border-opacity-30 hover:border-opacity-100 transition-all duration-200"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium text-gray-200">{{ family.familyName }}</span>
            <span class="text-gold-300 font-semibold">{{ family.perfumeCount }} products</span>
          </div>
          <div class="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-gold-500 to-gold-400 group-hover:shadow-golden-glow transition-all duration-300"
              :style="{ width: `${(family.perfumeCount / (stats.topFamilies[0]?.perfumeCount || 1)) * 100}%` }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Perfumes Section -->
    <div v-if="stats && stats.recentPerfumes.length > 0" class="rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-6 shadow-lg overflow-hidden">
      <h3 class="text-lg font-semibold text-gold-300 mb-6 uppercase tracking-wider">Recently Added Products</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gold-700">
              <th class="text-left py-3 px-4 font-semibold text-gold-400 text-xs uppercase tracking-wider">Product Name</th>
              <th class="text-left py-3 px-4 font-semibold text-gold-400 text-xs uppercase tracking-wider">Brand</th>
              <th class="text-left py-3 px-4 font-semibold text-gold-400 text-xs uppercase tracking-wider">Gender Profile</th>
              <th class="text-left py-3 px-4 font-semibold text-gold-400 text-xs uppercase tracking-wider">Added Date</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="perfume in stats.recentPerfumes.slice(0, 5)" 
              :key="perfume.perfumeId"
              class="border-b border-gray-800 hover:bg-gold-500 hover:bg-opacity-5 transition-colors duration-200"
            >
              <td class="py-4 px-4 text-gray-300 font-medium text-gold-300">{{ perfume.perfumeName }}</td>
              <td class="py-4 px-4 text-gray-400">{{ perfume.brandName }}</td>
              <td class="py-4 px-4 text-gray-400">{{ perfume.genderProfile || 'N/A' }}</td>
              <td class="py-4 px-4 text-gray-400 text-xs">{{ new Date(perfume.createdAt).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import { dashboardApi } from '@/api/dashboard';
import type { DashboardStatsDto } from '@/types/api';

const isLoading = ref(false);
const stats = ref<DashboardStatsDto | null>(null);
const error = ref<string | null>(null);

const hasError = ref(false);

onMounted(async () => {
  isLoading.value = true;
  error.value = null;
  hasError.value = false;

  try {
    const data = await dashboardApi.getStats();
    stats.value = data;
  } catch (err: any) {
    error.value = err?.message || 'Failed to load dashboard statistics';
    hasError.value = true;
    console.error('Dashboard error:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>
