<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    class?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <td
        :class="
            cn(
                'px-4 py-4 align-middle [&:has([role=checkbox])]:pr-0',
                $props.class,
            )
        "
    >
        <slot />
    </td>
</template>
