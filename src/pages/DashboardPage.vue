<template>
  <CrudLayout page-title="Dashboard">
    <div class="space-y-8">
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          :value="dashboardStats?.totalPerfumes || 0"
          :trend="12"
        />
        <StatCard
          title="Total Brands"
          :value="dashboardStats?.totalBrands || 0"
          :trend="8"
        />
        <StatCard
          title="Total Catalogs"
          :value="(dashboardStats?.totalFamilies || 0) + (dashboardStats?.totalNotes || 0)"
          :trend="15"
        />
        <StatCard
          title="Total Tags"
          :value="dashboardStats?.totalTags || 0"
          :trend="5"
        />
      </div>

      <!-- Secondary Stats Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Accords"
          :value="dashboardStats?.totalAccords || 0"
          :trend="3"
        />
        <StatCard
          title="Seasons"
          :value="dashboardStats?.totalSeasons || 0"
          :trend="0"
        />
        <StatCard
          title="Occasions"
          :value="dashboardStats?.totalOccasions || 0"
          :trend="7"
        />
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Top Brands -->
        <BarChart
          title="Top Brands"
          :items="topBrandsChartData"
          :loading="loading"
        />

        <!-- Top Families -->
        <BarChart
          title="Top Families"
          :items="topFamiliesChartData"
          :loading="loading"
        />
      </div>

      <!-- Recent Products Table -->
      <DataList
        title="Recently Added Products"
        :columns="['Name', 'Brand', 'Gender Profile', 'Added Date']"
        :items="recentPerfumesData"
        :loading="loading"
      />
    </div>
  </CrudLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CrudLayout from '@/components/common/CrudLayout.vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import BarChart from '@/components/dashboard/BarChart.vue';
import DataList from '@/components/dashboard/DataList.vue';
import { dashboardApi } from '@/api/dashboard';
import type { DashboardStatsDto } from '@/types/api';

const loading = ref(false);
const dashboardStats = ref<DashboardStatsDto | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    const stats = await dashboardApi.getStats();
    dashboardStats.value = stats;
  } catch (error) {
    console.error('Failed to load dashboard stats:', error);
  } finally {
    loading.value = false;
  }
});

const topBrandsChartData = computed(() => {
  return (dashboardStats.value?.topBrands || []).map(brand => ({
    label: brand.brandName,
    value: brand.perfumeCount,
    percentage: (brand.perfumeCount / Math.max(...(dashboardStats.value?.topBrands || [{ perfumeCount: 1 }]).map(b => b.perfumeCount))) * 100,
  }));
});

const topFamiliesChartData = computed(() => {
  return (dashboardStats.value?.topFamilies || []).map(family => ({
    label: family.familyName,
    value: family.perfumeCount,
    percentage: (family.perfumeCount / Math.max(...(dashboardStats.value?.topFamilies || [{ perfumeCount: 1 }]).map(f => f.perfumeCount))) * 100,
  }));
});

const recentPerfumesData = computed(() => {
  return (dashboardStats.value?.recentPerfumes || []).map(perfume => ({
    name: perfume.perfumeName,
    brand: perfume.brandName,
    gender_profile: perfume.genderProfile || 'N/A',
    added_date: new Date(perfume.createdAt).toLocaleDateString(),
  }));
});
</script>
