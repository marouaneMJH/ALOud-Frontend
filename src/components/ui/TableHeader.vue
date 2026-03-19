<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <thead :class="cn('border-b border-border bg-muted', $props.class)">
        <slot />
    </thead>
</template>
