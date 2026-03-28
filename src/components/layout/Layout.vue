<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Sidebar from "./Sidebar.vue";
import Button from "@/components/ui/Button.vue";
import { LogOut, User } from "lucide-vue-next";

interface Props {
    pageTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
    pageTitle: "Dashboard",
});

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logout();
    router.push("/login");
};
</script>

<template>
    <div class="flex h-screen bg-background">
        <Sidebar />

        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <header
                class="flex h-14 items-center justify-between border-b border-border bg-background px-6"
            >
                <h1 class="text-lg font-semibold text-foreground">
                    {{ pageTitle }}
                </h1>

                <div class="flex items-center gap-4">
                    <!-- User Info -->
                    <div class="flex items-center gap-3">
                        <div
                            class="flex h-8 w-8 items-center justify-center rounded-full bg-muted"
                        >
                            <User class="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div class="hidden sm:block">
                            <p class="text-sm font-medium text-foreground">
                                {{ authStore.user?.firstName }}
                                {{ authStore.user?.lastName }}
                            </p>
                            <p class="text-xs text-muted-foreground">
                                {{ authStore.user?.email }}
                            </p>
                        </div>
                    </div>

                    <!-- Logout -->
                    <Button
                        variant="ghost"
                        size="sm"
                        class="text-muted-foreground hover:text-foreground"
                        @click="handleLogout"
                    >
                        <LogOut class="h-4 w-4 mr-2" />
                        <span class="hidden sm:inline">Logout</span>
                    </Button>
                </div>
            </header>

            <!-- Main Content -->
            <main class="flex-1 overflow-y-auto p-6 bg-muted/60">
                <slot />
            </main>
        </div>
    </div>
</template>
