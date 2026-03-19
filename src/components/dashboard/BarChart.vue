<template>
    <div
        class="rounded-lg border border-gold-700 bg-gradient-to-br from-gold-900 via-gold-950 to-gold-900 p-6 shadow-lg"
    >
        <h2 class="text-lg font-semibold text-gold-300 mb-6">{{ title }}</h2>

        <div v-if="loading" class="flex items-center justify-center h-80">
            <div class="text-gold-400">Loading chart...</div>
        </div>

        <div v-else class="space-y-4">
            <div v-for="item in items" :key="item.label" class="group">
                <div class="flex justify-between mb-2">
                    <span class="text-sm font-medium text-gold-300">{{
                        item.label
                    }}</span>
                    <span class="text-sm font-semibold text-gold-400">{{
                        item.value
                    }}</span>
                </div>
                <div
                    class="h-2 bg-gold-800 rounded-full overflow-hidden border border-gold-700 border-opacity-30"
                >
                    <div
                        class="h-full bg-gradient-to-red from-gold-500 to-gold-400 rounded-full transition-all duration-500 group-hover:shadow-golden-glow"
                        :style="{ width: `${item.percentage}%` }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface ChartItem {
    label: string;
    value: string | number;
    percentage: number;
}

interface Props {
    title: string;
    items: ChartItem[];
    loading?: boolean;
}

defineProps<Props>();
</script>
