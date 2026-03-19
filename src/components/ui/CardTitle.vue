<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <h2 :class="cn('text-2xl font-bold text-foreground', $props.class)">
        <slot />
    </h2>
</template>
