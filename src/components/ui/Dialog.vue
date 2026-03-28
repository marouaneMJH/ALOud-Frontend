<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    open?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
    "update:open": [value: boolean];
}>();
</script>

<template>
    <Teleport to="body" v-if="props.open">
        <div
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
            @click.self="emit('update:open', false)"
        >
            <!-- Backdrop -->
            <div
                class="absolute inset-0 bg-black/70 backdrop-blur-md transition-all duration-500 ease-in-out"
                @click="emit('update:open', false)"
            />

            <!-- Dialog Content -->
            <div
                :class="
                    cn(
                        'relative z-50 w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-2xl animate-in fade-in zoom-in-90 slide-in-from-bottom-4 duration-300 ease-out',
                        props.class,
                    )
                "
                @click.stop
            >
                <slot />

                <button
                    @click="emit('update:open', false)"
                    class="absolute right-4 top-4 rounded-md text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    <svg
                        class="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </Teleport>
</template>
