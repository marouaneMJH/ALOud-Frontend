<template>
    <div class="flex h-screen bg-muted">
        <!-- Sidebar -->
        <aside class="w-64 bg-white shadow-lg overflow-y-auto">
            <div class="p-6 border-b border-border">
                <h1 class="text-2xl font-bold text-blue-600">ALOud Admin</h1>
                <p class="text-sm text-muted-foreground mt-1">
                    Perfume Management
                </p>
            </div>

            <nav class="p-4">
                <router-link
                    to="/dashboard"
                    class="block px-4 py-2 rounded-lg mb-2 transition"
                    :class="
                        isActive('/dashboard')
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-muted-foreground hover:bg-muted'
                    "
                >
                    📊 Dashboard
                </router-link>

                <div class="mt-6">
                    <h3
                        class="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase"
                    >
                        Catalog
                    </h3>
                    <router-link
                        v-for="item in catalogLinks"
                        :key="item.path"
                        :to="item.path"
                        class="block px-4 py-2 rounded-lg mb-1 transition"
                        :class="
                            isActive(item.path)
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-muted-foreground hover:bg-muted'
                        "
                    >
                        {{ item.icon }} {{ item.label }}
                    </router-link>
                </div>

                <div class="mt-6">
                    <h3
                        class="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase"
                    >
                        Settings
                    </h3>
                    <router-link
                        to="/expert-system"
                        class="block px-4 py-2 rounded-lg mb-1 transition"
                        :class="
                            isActive('/expert-system')
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-muted-foreground hover:bg-muted'
                        "
                    >
                        🤖 Expert System
                    </router-link>
                    <router-link
                        to="/llm-config"
                        class="block px-4 py-2 rounded-lg mb-1 transition"
                        :class="
                            isActive('/llm-config')
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-muted-foreground hover:bg-muted'
                        "
                    >
                        ⚙️ LLM Config
                    </router-link>
                </div>
            </nav>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <header
                class="bg-white border-b border-border px-8 py-4 flex justify-between items-center"
            >
                <h2 class="text-xl font-semibold text-foreground">
                    {{ pageTitle }}
                </h2>
                <div class="flex items-center gap-4">
                    <button class="text-muted-foreground hover:text-foreground">
                        🔔
                    </button>
                    <button class="text-muted-foreground hover:text-foreground">
                        👤
                    </button>
                </div>
            </header>

            <!-- Page Content -->
            <main class="flex-1 overflow-y-auto p-8">
                <div class="bg-white rounded-lg shadow p-6 text-center">
                    <p class="text-muted-foreground">
                        {{ pageTitle }} page - Coming soon!
                    </p>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const pageTitle = computed(() => (route.meta.title as string) || "Page");

const catalogLinks = [
    { path: "/brands", label: "Brands", icon: "🏷️" },
    { path: "/perfumes", label: "Perfumes", icon: "🌹" },
    { path: "/families", label: "Families", icon: "👨‍👩‍👧‍👦" },
    { path: "/notes", label: "Notes", icon: "🎵" },
    { path: "/accords", label: "Accords", icon: "🎼" },
    { path: "/tags", label: "Tags", icon: "#️⃣" },
    { path: "/seasons", label: "Seasons", icon: "🌍" },
    { path: "/occasions", label: "Occasions", icon: "🎉" },
];

const isActive = (path: string) => {
    return router.currentRoute.value.path.startsWith(path);
};
</script>
