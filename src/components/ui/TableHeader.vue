<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <thead :class="cn('border-b border-border bg-primary/20 text-primary font-bold backdrop-blur-sm', $props.class)">
        <slot />
    </thead>
</template>
