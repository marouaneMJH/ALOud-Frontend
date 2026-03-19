<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    title?: string;
    description?: string;
    icon?: string;
    class?: string;
}

withDefaults(defineProps<Props>(), {
    title: "No data available",
    description: "There is no data to display at this moment.",
});
</script>

<template>
    <div
        :class="
            cn(
                'flex flex-col items-center justify-center py-12 px-4 text-center',
                $props.class,
            )
        "
    >
        <div v-if="$props.icon" class="mb-4 text-5xl">{{ $props.icon }}</div>
        <svg
            v-else
            class="mb-4 h-12 w-12 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
        </svg>
        <h3 class="text-lg font-semibold text-foreground mb-2">
            {{ $props.title }}
        </h3>
        <p class="text-sm text-muted-foreground">{{ $props.description }}</p>
    </div>
</template>
