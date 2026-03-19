<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface Props {
    as?: string;
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    size?: "default" | "sm" | "lg" | "icon";
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    as: "button",
    variant: "default",
    size: "default",
});

const variants = {
    default: "bg-amber-500 text-white hover:bg-amber-600 shadow-sm",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline:
        "border border-amber-300 bg-white text-amber-900 hover:bg-amber-50",
    secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200",
    ghost: "hover:bg-amber-100 hover:text-amber-900",
    link: "text-amber-500 hover:text-amber-600 underline",
};

const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded px-3 text-sm",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
};

const buttonClass = computed(() =>
    cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[props.variant],
        sizes[props.size],
        props.class,
    ),
);
</script>

<template>
    <component :is="props.as" :class="buttonClass">
        <slot />
    </component>
</template>
