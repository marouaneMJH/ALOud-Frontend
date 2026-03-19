<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <h2 :class="cn('text-lg font-semibold text-amber-900', $props.class)">
        <slot />
    </h2>
</template>
