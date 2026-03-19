<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div :class="cn('w-full overflow-auto', $props.class)">
        <table class="w-full text-sm">
            <slot />
        </table>
    </div>
</template>
