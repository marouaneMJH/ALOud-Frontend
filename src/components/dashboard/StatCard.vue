<script setup lang="ts">
import { computed, type Component } from "vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardContent from "@/components/ui/CardContent.vue";
import { TrendingUp, TrendingDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    value: number | string;
    trend?: number;
    icon?: Component;
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

const trendPositive = computed(() => props.trend && props.trend > 0);
const trendNegative = computed(() => props.trend && props.trend < 0);
</script>

<template>
    <Card>
        <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
            <CardTitle class="text-sm font-medium text-muted-foreground">
                {{ title }}
            </CardTitle>
            <component
                v-if="icon"
                :is="icon"
                class="h-4 w-4 text-muted-foreground"
            />
        </CardHeader>
        <CardContent>
            <div class="text-2xl font-bold text-foreground">
                {{ formatValue(value) }}
            </div>
            <div
                v-if="trend !== undefined"
                class="flex items-center gap-1 text-xs mt-1"
            >
                <TrendingUp
                    v-if="trendPositive"
                    class="h-3 w-3 text-emerald-500"
                />
                <TrendingDown
                    v-else-if="trendNegative"
                    class="h-3 w-3 text-rose-500"
                />
                <span
                    :class="
                        cn(
                            trendPositive && 'text-emerald-500',
                            trendNegative && 'text-rose-500',
                            !trendPositive &&
                                !trendNegative &&
                                'text-muted-foreground'
                        )
                    "
                >
                    {{ trend > 0 ? "+" : "" }}{{ trend }}%
                </span>
                <span class="text-muted-foreground">from last month</span>
            </div>
        </CardContent>
    </Card>
</template>
