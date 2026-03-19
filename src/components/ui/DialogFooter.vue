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
                'flex justify-end gap-2 pt-4 border-t border-amber-200',
                $props.class,
            )
        "
    >
        <slot />
    </div>
</template>
