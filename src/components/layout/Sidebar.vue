<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";
import SidebarItem from "./SidebarItem.vue";
import Button from "@/components/ui/Button.vue";
import {
    LayoutDashboard,
    Building2,
    Sparkles,
    Users,
    FileText,
    Music,
    Tag,
    Calendar,
    PartyPopper,
    Brain,
    Settings,
    ChevronLeft,
    Droplets,
} from "lucide-vue-next";

const collapsed = ref(false);

const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
};

const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const catalogItems = [
    { path: "/brands", label: "Brands", icon: Building2 },
    { path: "/perfumes", label: "Perfumes", icon: Sparkles },
    { path: "/families", label: "Families", icon: Users },
    { path: "/notes", label: "Notes", icon: FileText },
    { path: "/accords", label: "Accords", icon: Music },
    { path: "/tags", label: "Tags", icon: Tag },
    { path: "/seasons", label: "Seasons", icon: Calendar },
    { path: "/occasions", label: "Occasions", icon: PartyPopper },
];

const systemItems = [
    { path: "/expert-system", label: "Expert System", icon: Brain },
    { path: "/llm-config", label: "LLM Config", icon: Settings },
];
</script>

<template>
    <aside
        :class="
            cn(
                'flex h-screen flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300',
                collapsed ? 'w-16' : 'w-64',
            )
        "
    >
        <!-- Logo -->
        <div
            class="flex items-center gap-3 p-4 border-b border-sidebar-border h-14"
        >
            <Droplets class="h-6 w-6 text-sidebar-foreground shrink-0" />
            <span
                v-if="!collapsed"
                class="font-semibold text-sidebar-foreground truncate"
            >
                ALOud Admin
            </span>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto p-2 space-y-4">
            <!-- Main -->
            <div class="space-y-1">
                <SidebarItem
                    v-for="item in navItems"
                    :key="item.path"
                    :path="item.path"
                    :label="item.label"
                    :icon="item.icon"
                    :collapsed="collapsed"
                />
            </div>

            <!-- Catalog Management -->
            <div class="space-y-1">
                <h3
                    v-if="!collapsed"
                    class="px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider"
                >
                    Catalog
                </h3>
                <div v-else class="h-px bg-sidebar-border mx-2 my-2"></div>
                <SidebarItem
                    v-for="item in catalogItems"
                    :key="item.path"
                    :path="item.path"
                    :label="item.label"
                    :icon="item.icon"
                    :collapsed="collapsed"
                />
            </div>

            <!-- System Config -->
            <div class="space-y-1">
                <h3
                    v-if="!collapsed"
                    class="px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider"
                >
                    System
                </h3>
                <div v-else class="h-px bg-sidebar-border mx-2 my-2"></div>
                <SidebarItem
                    v-for="item in systemItems"
                    :key="item.path"
                    :path="item.path"
                    :label="item.label"
                    :icon="item.icon"
                    :collapsed="collapsed"
                />
            </div>
        </nav>

        <!-- Collapse Toggle -->
        <div class="p-2 border-t border-sidebar-border">
            <Button
                variant="ghost"
                size="icon"
                class="w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                @click="toggleCollapse"
            >
                <ChevronLeft
                    :class="
                        cn(
                            'h-4 w-4 transition-transform duration-300',
                            collapsed && 'rotate-180',
                        )
                    "
                />
            </Button>
        </div>
    </aside>
</template>
