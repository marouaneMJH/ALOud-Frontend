<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <input
        :class="
            cn(
                'flex h-10 w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm text-amber-900 placeholder:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                $props.class,
            )
        "
    />
</template>
