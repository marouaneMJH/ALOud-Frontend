<template>
    <div class="flex h-screen bg-amber-50">
        <!-- Sidebar -->
        <aside
            class="w-64 bg-amber-100 shadow-lg overflow-y-auto border-r border-amber-300"
        >
            <div class="p-6 border-b border-amber-300">
                <h1 class="text-2xl font-bold text-amber-900">ALOud Admin</h1>
                <p class="text-sm text-amber-700 mt-1">
                    Perfume Management Dashboard
                </p>
            </div>

            <nav class="p-4">
                <router-link
                    to="/dashboard"
                    class="block px-4 py-3 rounded-lg mb-2 transition duration-200"
                    :class="
                        isActive('/dashboard')
                            ? 'bg-amber-300 text-amber-900 font-semibold border border-amber-400 shadow-sm'
                            : 'text-amber-900 hover:text-amber-800 hover:bg-amber-200'
                    "
                >
                    Dashboard
                </router-link>

                <div class="mt-6">
                    <h3
                        class="px-4 py-2 text-xs font-semibold text-amber-800 uppercase tracking-wider"
                    >
                        Catalog Management
                    </h3>
                    <router-link
                        v-for="item in catalogLinks"
                        :key="item.path"
                        :to="item.path"
                        class="block px-4 py-2 rounded-lg mb-1 transition duration-200 text-sm"
                        :class="
                            isActive(item.path)
                                ? 'bg-amber-200 text-amber-900 font-semibold border-l-2 border-amber-500'
                                : 'text-amber-900 hover:text-amber-800 hover:bg-amber-200 hover:border-l-2 hover:border-amber-400'
                        "
                    >
                        {{ item.label }}
                    </router-link>
                </div>

                <div class="mt-6">
                    <h3
                        class="px-4 py-2 text-xs font-semibold text-amber-800 uppercase tracking-wider"
                    >
                        System Config
                    </h3>
                    <router-link
                        to="/expert-system"
                        class="block px-4 py-2 rounded-lg mb-1 transition duration-200 text-sm"
                        :class="
                            isActive('/expert-system')
                                ? 'bg-amber-200 text-amber-900 font-semibold border-l-2 border-amber-500'
                                : 'text-amber-900 hover:text-amber-800 hover:bg-amber-200 hover:border-l-2 hover:border-amber-400'
                        "
                    >
                        Expert System
                    </router-link>
                    <router-link
                        to="/llm-config"
                        class="block px-4 py-2 rounded-lg mb-1 transition duration-200 text-sm"
                        :class="
                            isActive('/llm-config')
                                ? 'bg-amber-200 text-amber-900 font-semibold border-l-2 border-amber-500'
                                : 'text-amber-900 hover:text-amber-800 hover:bg-amber-200 hover:border-l-2 hover:border-amber-400'
                        "
                    >
                        LLM Configuration
                    </router-link>
                </div>
            </nav>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <header
                class="bg-white border-b border-amber-300 px-8 py-4 flex justify-between items-center shadow-sm"
            >
                <h2 class="text-2xl font-semibold text-amber-900">Dashboard</h2>
                <div class="flex items-center gap-6">
                    <!-- User Profile Section -->
                    <div
                        class="flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-100 border border-amber-300"
                    >
                        <div>
                            <p class="text-sm font-medium text-amber-900">
                                {{ authStore.user?.firstName }}
                                {{ authStore.user?.lastName }}
                            </p>
                            <p class="text-xs text-amber-700">
                                {{ authStore.user?.email }}
                            </p>
                        </div>
                    </div>

                    <!-- Logout Button -->
                    <button
                        @click="handleLogout"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <!-- Page Content -->
            <main class="flex-1 overflow-y-auto p-8 bg-amber-50">
                <Dashboard />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import Dashboard from "./Dashboard.vue";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logout();
    router.push("/login");
};

const catalogLinks = [
    { path: "/brands", label: "Brands" },
    { path: "/perfumes", label: "Perfumes" },
    { path: "/families", label: "Families" },
    { path: "/notes", label: "Notes" },
    { path: "/accords", label: "Accords" },
    { path: "/tags", label: "Tags" },
    { path: "/seasons", label: "Seasons" },
    { path: "/occasions", label: "Occasions" },
];

const isActive = (path: string) => {
    return router.currentRoute.value.path.startsWith(path);
};
</script>

<style scoped>
/* Smooth transitions */
</style>
