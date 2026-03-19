<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    variant?: "default" | "secondary" | "destructive" | "outline";
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    variant: "default",
});

const variants = {
    default: "border-amber-300 bg-amber-100 text-amber-900",
    secondary: "border-amber-200 bg-amber-50 text-amber-800",
    destructive: "border-red-300 bg-red-100 text-red-900",
    outline: "border-amber-300 text-amber-900",
};
</script>

<template>
    <div
        :class="
            cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
                variants[props.variant],
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
