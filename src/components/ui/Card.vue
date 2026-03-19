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
                'rounded-lg border border-amber-300 bg-white shadow-sm transition-all duration-200 hover:shadow-md',
                $props.class,
            )
        "
    >
        <slot />
    </div>
</template>
