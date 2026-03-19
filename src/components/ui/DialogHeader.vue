<script setup lang="ts">
import { Dialog as DialogPrimitive } from "radix-vue";
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div :class="cn('mb-4 pb-4 border-b border-border', $props.class)">
        <slot />
    </div>
</template>
