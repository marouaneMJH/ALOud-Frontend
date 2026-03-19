<template>
    <div class="space-y-8">
        <!-- Stats Grid -->
        <div
            v-if="!isLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
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

        <div
            v-if="!isLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
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
                <div
                    class="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent"
                ></div>
                <p class="text-amber-700">Loading dashboard data...</p>
            </div>
        </div>

        <!-- Error State -->
        <div
            v-if="hasError"
            class="bg-red-100 border border-red-300 rounded-lg p-4 text-red-800"
        >
            <p class="font-semibold mb-1">Error Loading Dashboard</p>
            <p class="text-sm">{{ error }}</p>
        </div>

        <!-- Top Brands Section -->
        <div
            v-if="stats && stats.topBrands.length > 0"
            class="rounded-lg border border-amber-300 bg-white p-6 shadow-sm"
        >
            <h3
                class="text-lg font-semibold text-amber-900 mb-6 uppercase tracking-wider"
            >
                Top Brands
            </h3>
            <div class="space-y-4">
                <div
                    v-for="brand in stats.topBrands"
                    :key="brand.brandId"
                    class="group p-4 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 transition-all duration-200"
                >
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-medium text-amber-900">{{
                            brand.brandName
                        }}</span>
                        <span class="text-amber-700 font-semibold"
                            >{{ brand.perfumeCount }} products</span
                        >
                    </div>
                    <div
                        class="h-1.5 bg-amber-200 rounded-full overflow-hidden"
                    >
                        <div
                            class="h-full bg-gradient-to-r from-amber-400 to-amber-300 group-hover:shadow-md transition-all duration-300"
                            :style="{
                                width: `${(brand.perfumeCount / (stats.topBrands[0]?.perfumeCount || 1)) * 100}%`,
                            }"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Top Families Section -->
        <div
            v-if="stats && stats.topFamilies.length > 0"
            class="rounded-lg border border-amber-300 bg-white p-6 shadow-sm"
        >
            <h3
                class="text-lg font-semibold text-amber-900 mb-6 uppercase tracking-wider"
            >
                Top Families
            </h3>
            <div class="space-y-4">
                <div
                    v-for="family in stats.topFamilies"
                    :key="family.familyId"
                    class="group p-4 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 transition-all duration-200"
                >
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-medium text-amber-900">{{
                            family.familyName
                        }}</span>
                        <span class="text-amber-700 font-semibold"
                            >{{ family.perfumeCount }} products</span
                        >
                    </div>
                    <div
                        class="h-1.5 bg-amber-200 rounded-full overflow-hidden"
                    >
                        <div
                            class="h-full bg-gradient-to-r from-amber-400 to-amber-300 group-hover:shadow-md transition-all duration-300"
                            :style="{
                                width: `${(family.perfumeCount / (stats.topFamilies[0]?.perfumeCount || 1)) * 100}%`,
                            }"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Perfumes Section -->
        <div
            v-if="stats && stats.recentPerfumes.length > 0"
            class="rounded-lg border border-amber-300 bg-white p-6 shadow-sm overflow-hidden"
        >
            <h3
                class="text-lg font-semibold text-amber-900 mb-6 uppercase tracking-wider"
            >
                Recently Added Products
            </h3>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-amber-300">
                            <th
                                class="text-left py-3 px-4 font-semibold text-amber-900 text-xs uppercase tracking-wider"
                            >
                                Product Name
                            </th>
                            <th
                                class="text-left py-3 px-4 font-semibold text-amber-900 text-xs uppercase tracking-wider"
                            >
                                Brand
                            </th>
                            <th
                                class="text-left py-3 px-4 font-semibold text-amber-900 text-xs uppercase tracking-wider"
                            >
                                Gender Profile
                            </th>
                            <th
                                class="text-left py-3 px-4 font-semibold text-amber-900 text-xs uppercase tracking-wider"
                            >
                                Added Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="perfume in stats.recentPerfumes.slice(0, 5)"
                            :key="perfume.perfumeId"
                            class="border-b border-amber-200 hover:bg-amber-50 transition-colors duration-200"
                        >
                            <td class="py-4 px-4 text-amber-900 font-medium">
                                {{ perfume.perfumeName }}
                            </td>
                            <td class="py-4 px-4 text-amber-700">
                                {{ perfume.brandName }}
                            </td>
                            <td class="py-4 px-4 text-amber-700">
                                {{ perfume.genderProfile || "N/A" }}
                            </td>
                            <td class="py-4 px-4 text-amber-700 text-xs">
                                {{
                                    new Date(
                                        perfume.createdAt,
                                    ).toLocaleDateString()
                                }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import StatCard from "@/components/dashboard/StatCard.vue";
import { dashboardApi } from "@/api/dashboard";
import type { DashboardStatsDto } from "@/types/api";

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
        error.value = err?.message || "Failed to load dashboard statistics";
        hasError.value = true;
        console.error("Dashboard error:", err);
    } finally {
        isLoading.value = false;
    }
});
</script>
