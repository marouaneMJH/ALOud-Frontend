<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    size?: "sm" | "md" | "lg";
    label?: string;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: "md",
});

const sizes = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-2",
    lg: "h-16 w-16 border-4",
};
</script>

<template>
    <div
        :class="
            cn('flex flex-col items-center justify-center gap-4', props.class)
        "
    >
        <div
            :class="
                cn(
                    'animate-spin rounded-full border-primary border-t-transparent',
                    sizes[props.size],
                )
            "
        />
        <p v-if="$props.label" class="text-muted-foreground text-sm font-medium">
            {{ $props.label }}
        </p>
    </div>
</template>
