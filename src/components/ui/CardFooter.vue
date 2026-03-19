<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div :class="cn('px-6 py-4 border-t border-border', $props.class)">
        <slot />
    </div>
</template>
