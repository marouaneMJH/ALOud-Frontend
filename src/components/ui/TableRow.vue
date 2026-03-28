<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <tr
        :class="
            cn(
                'border-b border-border/50 transition-all duration-300 hover:bg-muted/50 data-[state=selected]:bg-muted cursor-default',
                $props.class,
            )
        "
    >
        <slot />
    </tr>
</template>
