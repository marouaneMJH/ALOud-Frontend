<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <p :class="cn('text-sm text-amber-700', $props.class)">
        <slot />
    </p>
</template>
