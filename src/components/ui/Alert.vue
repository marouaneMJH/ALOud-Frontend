<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    variant?: "default" | "destructive" | "success" | "warning";
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    variant: "default",
});

const variants = {
    default: "border-secondary bg-secondary/10 text-secondary",
    destructive: "border-destructive bg-destructive/10 text-destructive",
    success: "border-green-500 bg-green-50 text-green-900",
    warning: "border-yellow-500 bg-yellow-50 text-yellow-900",
};
</script>

<template>
    <div
        :class="
            cn(
                'rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200',
                variants[props.variant],
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
