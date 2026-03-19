<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div
        :class="
            cn(
                'rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md',
                $props.class,
            )
        "
    >
        <slot />
    </div>
</template>
