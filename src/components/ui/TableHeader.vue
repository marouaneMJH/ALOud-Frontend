<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <thead :class="cn('border-b border-border bg-muted/40 text-primary font-semibold backdrop-blur-sm', $props.class)">
        <slot />
    </thead>
</template>
