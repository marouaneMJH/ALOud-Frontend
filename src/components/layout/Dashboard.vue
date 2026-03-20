<script setup lang="ts">
import { ref, onMounted } from "vue";
import StatCard from "@/components/dashboard/StatCard.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import Alert from "@/components/ui/Alert.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardContent from "@/components/ui/CardContent.vue";
import { dashboardApi } from "@/api/dashboard";
import type { DashboardStatsDto } from "@/types/api";
import {
    Sparkles,
    Building2,
    Users,
    FileText,
    Music,
    Tag,
    Calendar,
    PartyPopper,
} from "lucide-vue-next";

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
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="space-y-6">
        <!-- Loading State -->
        <div v-if="isLoading" class="py-20">
            <LoadingSpinner label="Loading dashboard data..." />
        </div>

        <!-- Error State -->
        <Alert v-else-if="hasError" variant="destructive">
            <p class="font-semibold mb-1">Error Loading Dashboard</p>
            <p class="text-sm">{{ error }}</p>
        </Alert>

        <template v-else>
            <!-- Stats Grid - Row 1 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Perfumes"
                    :value="stats?.totalPerfumes ?? 0"
                    :trend="12"
                    :icon="Sparkles"
                />
                <StatCard
                    title="Total Brands"
                    :value="stats?.totalBrands ?? 0"
                    :trend="8"
                    :icon="Building2"
                />
                <StatCard
                    title="Total Families"
                    :value="stats?.totalFamilies ?? 0"
                    :trend="5"
                    :icon="Users"
                />
                <StatCard
                    title="Total Notes"
                    :value="stats?.totalNotes ?? 0"
                    :trend="15"
                    :icon="FileText"
                />
            </div>

            <!-- Stats Grid - Row 2 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Accords"
                    :value="stats?.totalAccords ?? 0"
                    :trend="3"
                    :icon="Music"
                />
                <StatCard
                    title="Total Tags"
                    :value="stats?.totalTags ?? 0"
                    :trend="7"
                    :icon="Tag"
                />
                <StatCard
                    title="Total Seasons"
                    :value="stats?.totalSeasons ?? 0"
                    :trend="0"
                    :icon="Calendar"
                />
                <StatCard
                    title="Total Occasions"
                    :value="stats?.totalOccasions ?? 0"
                    :trend="10"
                    :icon="PartyPopper"
                />
            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <!-- Top Brands -->
                <Card
                    v-if="
                        stats &&
                        Array.isArray(stats.topBrands) &&
                        stats.topBrands.length > 0
                    "
                >
                    <CardHeader>
                        <CardTitle class="text-base">Top Brands</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div
                            v-for="brand in stats.topBrands"
                            :key="brand.brandId"
                            class="space-y-2"
                        >
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium text-foreground">
                                    {{ brand.brandName }}
                                </span>
                                <span class="text-sm text-muted-foreground">
                                    {{ brand.perfumeCount }} products
                                </span>
                            </div>
                            <div
                                class="h-2 bg-secondary rounded-full overflow-hidden"
                            >
                                <div
                                    class="h-full bg-primary rounded-full transition-all duration-500"
                                    :style="{
                                        width: `${(brand.perfumeCount / (stats?.topBrands?.[0]?.perfumeCount || 1)) * 100}%`,
                                    }"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Top Families -->
                <Card
                    v-if="
                        stats &&
                        Array.isArray(stats.topFamilies) &&
                        stats.topFamilies.length > 0
                    "
                >
                    <CardHeader>
                        <CardTitle class="text-base">Top Families</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div
                            v-for="family in stats.topFamilies"
                            :key="family.familyId"
                            class="space-y-2"
                        >
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium text-foreground">
                                    {{ family.familyName }}
                                </span>
                                <span class="text-sm text-muted-foreground">
                                    {{ family.perfumeCount }} products
                                </span>
                            </div>
                            <div
                                class="h-2 bg-secondary rounded-full overflow-hidden"
                            >
                                <div
                                    class="h-full bg-primary rounded-full transition-all duration-500"
                                    :style="{
                                        width: `${(family.perfumeCount / (stats?.topFamilies?.[0]?.perfumeCount || 1)) * 100}%`,
                                    }"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Recent Perfumes Table -->
            <Card
                v-if="
                    stats &&
                    Array.isArray(stats.recentPerfumes) &&
                    stats.recentPerfumes.length > 0
                "
            >
                <CardHeader>
                    <CardTitle class="text-base"
                        >Recently Added Products</CardTitle
                    >
                </CardHeader>
                <CardContent>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-border">
                                    <th
                                        class="text-left py-3 px-4 font-medium text-muted-foreground"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        class="text-left py-3 px-4 font-medium text-muted-foreground"
                                    >
                                        Brand
                                    </th>
                                    <th
                                        class="text-left py-3 px-4 font-medium text-muted-foreground"
                                    >
                                        Gender Profile
                                    </th>
                                    <th
                                        class="text-left py-3 px-4 font-medium text-muted-foreground"
                                    >
                                        Added Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="perfume in stats.recentPerfumes.slice(
                                        0,
                                        5
                                    )"
                                    :key="perfume.perfumeId"
                                    class="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                                >
                                    <td
                                        class="py-3 px-4 text-foreground font-medium"
                                    >
                                        {{ perfume.perfumeName }}
                                    </td>
                                    <td class="py-3 px-4 text-muted-foreground">
                                        {{ perfume.brandName }}
                                    </td>
                                    <td class="py-3 px-4 text-muted-foreground">
                                        {{ perfume.genderProfile || "N/A" }}
                                    </td>
                                    <td
                                        class="py-3 px-4 text-muted-foreground text-xs"
                                    >
                                        {{
                                            new Date(
                                                perfume.createdAt
                                            ).toLocaleDateString()
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <!-- No Data State -->
            <EmptyState
                v-if="
                    stats &&
                    !stats.topBrands?.length &&
                    !stats.topFamilies?.length &&
                    !stats.recentPerfumes?.length
                "
                title="No Dashboard Data Available"
                description="Add some perfumes to see statistics and insights."
            />
        </template>
    </div>
</template>
