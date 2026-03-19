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
                class="absolute inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
                @click="emit('update:open', false)"
            />

            <!-- Dialog Content -->
            <div
                :class="
                    cn(
                        'relative z-50 w-full max-w-lg rounded-lg border border-amber-300 bg-white p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200',
                        props.class,
                    )
                "
                @click.stop
            >
                <slot />

                <button
                    @click="emit('update:open', false)"
                    class="absolute right-4 top-4 rounded-md text-amber-500 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
