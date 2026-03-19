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
                'border-b border-amber-200 transition-colors hover:bg-amber-50 data-[state=selected]:bg-amber-100',
                $props.class,
            )
        "
    >
        <slot />
    </tr>
</template>
