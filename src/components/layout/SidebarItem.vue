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
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 ease-in-out',
                isActive
                    ? 'bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 overflow-hidden'
                    : 'text-sidebar-foreground/70 hover:bg-primary/20 hover:text-sidebar-accent-foreground hover:translate-x-1.5',
                collapsed && 'justify-center px-2 hover:translate-x-0',
            )
        "
        :title="collapsed ? label : undefined"
    >
        <!-- Active Indicator Bar -->
        <div 
            v-if="isActive" 
            class="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full animate-in slide-in-from-left-full duration-300"
        ></div>

        <component :is="icon" 
            :class="cn(
                'h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110', 
                isActive ? 'text-primary-foreground' : 'text-sidebar-foreground/40 group-hover:text-sidebar-accent-foreground'
            )" 
        />
        <span v-if="!collapsed" class="truncate tracking-wide">{{ label }}</span>
        
        <!-- Subtle Glow for Active Item -->
        <div v-if="isActive && !collapsed" class="absolute inset-0 bg-primary/5 pointer-events-none"></div>
    </router-link>
</template>
