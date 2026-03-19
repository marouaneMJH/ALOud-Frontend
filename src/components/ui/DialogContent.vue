<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div :class="cn('py-4', $props.class)">
        <slot />
    </div>
</template>
