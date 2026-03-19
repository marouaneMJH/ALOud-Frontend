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
    default: "border-blue-300 bg-blue-50 text-blue-900",
    destructive: "border-red-300 bg-red-50 text-red-900",
    success: "border-green-300 bg-green-50 text-green-900",
    warning: "border-amber-300 bg-amber-50 text-amber-900",
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
