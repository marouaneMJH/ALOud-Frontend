<template>
    <div
        class="rounded-lg border border-border bg-gradient-to-br from-card via-card to-card p-6 shadow-lg"
    >
        <h2 class="text-lg font-semibold text-foreground mb-6">{{ title }}</h2>

        <div v-if="loading" class="flex items-center justify-center h-80">
            <div class="text-muted-foreground">Loading chart...</div>
        </div>

        <div v-else class="space-y-4">
            <div v-for="item in items" :key="item.label" class="group">
                <div class="flex justify-between mb-2">
                    <span class="text-sm font-medium text-foreground">{{
                        item.label
                    }}</span>
                    <span class="text-sm font-semibold text-primary">{{
                        item.value
                    }}</span>
                </div>
                <div
                    class="h-2 bg-secondary rounded-full overflow-hidden border border-border border-opacity-30"
                >
                    <div
                        class="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 group-hover:shadow-md"
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
