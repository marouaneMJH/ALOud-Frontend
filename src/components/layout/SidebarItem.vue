<script setup lang="ts">
import { computed, type Component } from "vue";
import { useRouter } from "vue-router";
import { cn } from "@/lib/utils";

interface Props {
    path: string;
    label: string;
    icon: Component;
    collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    collapsed: false,
});

const router = useRouter();

const isActive = computed(() => {
    return router.currentRoute.value.path.startsWith(props.path);
});
</script>

<template>
    <router-link
        :to="path"
        :class="
            cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200',
                isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                collapsed && 'justify-center px-2',
            )
        "
        :title="collapsed ? label : undefined"
    >
        <component :is="icon" class="h-4 w-4 shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ label }}</span>
    </router-link>
</template>
