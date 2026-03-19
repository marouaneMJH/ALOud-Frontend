<script setup lang="ts">
import { computed } from "vue";
import Card from "@/components/ui/Card.vue";

interface Props {
    title: string;
    value: number | string;
    trend?: number;
    format?: "number" | "currency" | "percent";
}

const props = defineProps<Props>();

const formatValue = (value: number | string) => {
    if (typeof value === "string") return value;

    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + "K";
    }
    return value.toLocaleString();
};

const trendClass = computed(() => {
    if (!props.trend) return "";
    return props.trend > 0 ? "text-green-600" : "text-red-600";
});
</script>

<template>
    <Card class="relative overflow-hidden p-6">
        <!-- Light gradient background -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-muted to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
        />

        <!-- Content -->
        <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
                <h3
                    class="text-sm font-semibold text-foreground uppercase tracking-wider"
                >
                    {{ title }}
                </h3>
                <div
                    class="p-2 bg-muted rounded-lg border border-border transition-transform duration-300 group-hover:scale-110"
                >
                    <svg
                        class="w-5 h-5 text-muted-foreground"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                        />
                    </svg>
                </div>
            </div>

            <div class="mb-2">
                <p
                    class="text-3xl font-bold text-foreground transition-transform duration-300"
                >
                    {{ formatValue(value) }}
                </p>
            </div>

            <div class="flex items-center gap-2">
                <span
                    v-if="trend"
                    class="text-sm font-medium transition-colors duration-300"
                    :class="trendClass"
                >
                    {{ trend > 0 ? "+" : "" }}{{ trend }}%
                </span>
                <span class="text-xs text-muted-foreground">vs last month</span>
            </div>
        </div>

        <!-- Bottom accent line -->
        <div
            class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent"
        />
    </Card>
</template>
