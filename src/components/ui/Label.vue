<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    for?: string;
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <label
        :for="$props.for"
        :class="cn('text-sm font-medium text-foreground', $props.class)"
    >
        <slot />
    </label>
</template>
