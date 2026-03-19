<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <thead :class="cn('border-b border-amber-300 bg-amber-50', $props.class)">
        <slot />
    </thead>
</template>
