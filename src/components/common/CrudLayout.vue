<template>
    <div class="flex h-screen bg-gold-900">
        <!-- Sidebar -->
        <aside
            class="w-64 bg-gold-950 shadow-lg overflow-y-auto border-r border-gold-700"
        >
            <div class="p-6 border-b border-gold-700">
                <h1
                    class="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent"
                >
                    ALOud Admin
                </h1>
                <p class="text-sm text-gold-400 mt-1">
                    Perfume Management Dashboard
                </p>
            </div>

            <nav class="p-4">
                <router-link
                    to="/dashboard"
                    class="block px-4 py-3 rounded-lg mb-2 transition duration-200"
                    :class="
                        isActive('/dashboard')
                            ? 'bg-gold-500 bg-opacity-20 text-gold-300 font-semibold border border-gold-500 shadow-golden-glow'
                            : 'text-gray-300 hover:text-gold-300 hover:bg-gray-800'
                    "
                >
                    Dashboard
                </router-link>

                <div class="mt-6">
                    <h3
                        class="px-4 py-2 text-xs font-semibold text-gold-400 uppercase tracking-wider"
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
                                ? 'bg-gold-500 bg-opacity-20 text-gold-300 font-semibold border-l-2 border-gold-400'
                                : 'text-gray-300 hover:text-gold-300 hover:bg-gray-800 hover:border-l-2 hover:border-gold-500'
                        "
                    >
                        {{ item.label }}
                    </router-link>
                </div>

                <div class="mt-6">
                    <h3
                        class="px-4 py-2 text-xs font-semibold text-gold-400 uppercase tracking-wider"
                    >
                        System Config
                    </h3>
                    <router-link
                        to="/expert-system"
                        class="block px-4 py-2 rounded-lg mb-1 transition duration-200 text-sm"
                        :class="
                            isActive('/expert-system')
                                ? 'bg-gold-500 bg-opacity-20 text-gold-300 font-semibold border-l-2 border-gold-400'
                                : 'text-gray-300 hover:text-gold-300 hover:bg-gray-800 hover:border-l-2 hover:border-gold-500'
                        "
                    >
                        Expert System
                    </router-link>
                    <router-link
                        to="/llm-config"
                        class="block px-4 py-2 rounded-lg mb-1 transition duration-200 text-sm"
                        :class="
                            isActive('/llm-config')
                                ? 'bg-gold-500 bg-opacity-20 text-gold-300 font-semibold border-l-2 border-gold-400'
                                : 'text-gray-300 hover:text-gold-300 hover:bg-gray-800 hover:border-l-2 hover:border-gold-500'
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
                class="bg-gold-900 border-b border-gold-700 bg-gradient-to-r from-gray-900 via-gray-900 to-gold-950 px-8 py-4 flex justify-between items-center shadow-lg"
            >
                <h2 class="text-2xl font-semibold text-gold-300">
                    {{ pageTitle }}
                </h2>
                <div class="flex items-center gap-4">
                    <button
                        class="text-gold-400 hover:text-gold-200 transition duration-200"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10.5 1.5H9.5V.5h1v1zm0 17H9.5v-1h1v1zm0-17h1v1h-1v-1zm0 17h1v1h-1v-1zM4.22 4.22L3.51 3.51l.707-.707.707.707zm11.31 11.31l.707.707-.707.707-.707-.707zm0-11.31l.707-.707.707.707-.707.707zm-11.31 11.31l-.707.707-.707-.707.707-.707z"
                            />
                        </svg>
                    </button>
                    <button
                        class="text-gold-400 hover:text-gold-200 transition duration-200"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            <!-- Page Content -->
            <main class="flex-1 overflow-y-auto p-8 bg-gold-950">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
    pageTitle: string;
}>();

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
