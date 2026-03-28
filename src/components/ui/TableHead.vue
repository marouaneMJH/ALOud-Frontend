<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <th
        :class="
            cn(
                'h-12 px-4 text-left align-middle font-semibold transition-colors text-foreground [&:has([role=checkbox])]:pr-0',
                $props.class,
            )
        "
    >
        <slot />
    </th>
</template>
