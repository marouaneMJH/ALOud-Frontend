<template>
    <div
        class="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
        <!-- Login Card -->
        <div class="w-full max-w-md">
            <!-- Logo/Title -->
            <div class="text-center mb-8">
                <h1
                    class="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2"
                >
                    ALOud Admin
                </h1>
                <p class="text-primary text-sm">
                    Perfume Management Dashboard
                </p>
            </div>

            <!-- Card Container -->
            <div
                class="rounded-lg border border-border bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-8 shadow-lg"
            >
                <!-- Form Title -->
                <h2 class="text-2xl font-semibold text-muted-foreground mb-6">Login</h2>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="space-y-4">
                    <!-- Email Field -->
                    <div>
                        <label
                            class="block text-sm font-medium text-muted-foreground mb-2"
                            >Email Address</label
                        >
                        <input
                            v-model="formData.email"
                            type="email"
                            placeholder="admin@test.com"
                            required
                            :disabled="isSubmitting"
                            class="w-full px-4 py-2 border border-border bg-slate-700 text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                        />
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label
                            class="block text-sm font-medium text-muted-foreground mb-2"
                            >Password</label
                        >
                        <input
                            v-model="formData.password"
                            type="password"
                            placeholder="••••••••"
                            required
                            :disabled="isSubmitting"
                            class="w-full px-4 py-2 border border-border bg-slate-700 text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                        />
                    </div>

                    <!-- Error Message -->
                    <div
                        v-if="error"
                        class="p-3 bg-red-950 border border-red-800 text-red-200 rounded-lg text-sm"
                    >
                        {{ error }}
                    </div>

                    <!-- Dev Mode Hint -->
                    <div
                        class="p-3 bg-blue-950 border border-blue-800 text-blue-200 rounded-lg text-xs"
                    >
                        <strong>Demo:</strong> Email: admin@test.com, Password:
                        password123
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="w-full px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-slate-900 font-semibold rounded-lg hover:shadow-md transition duration-300 disabled:opacity-50"
                    >
                        {{ isSubmitting ? "Logging in..." : "Login" }}
                    </button>
                </form>

                <!-- Divider -->
                <div class="my-6 flex items-center gap-4">
                    <div class="flex-1 border-t border-border" />
                    <span class="text-muted-foreground text-sm">or</span>
                    <div class="flex-1 border-t border-border" />
                </div>

                <!-- Register Link -->
                <div class="text-center">
                    <p class="text-muted-foreground text-sm mb-2">
                        Don't have an account?
                    </p>
                    <router-link
                        to="/register"
                        class="inline-block px-4 py-2 border border-border text-muted-foreground font-medium rounded-lg hover:bg-primary hover:bg-opacity-10 transition duration-300"
                    >
                        Create Account
                    </router-link>
                </div>
            </div>

            <!-- Bottom Accent -->
            <div
                class="mt-6 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
    email: "admin@admin.com",
    password: "adminadmin",
});

const isSubmitting = ref(false);
const error = ref<string | null>(null);

async function handleLogin() {
    error.value = null;
    isSubmitting.value = true;

    try {
        await authStore.login(formData.value.email, formData.value.password);
        // Redirect to dashboard on success
        router.push("/dashboard");
    } catch (err: any) {
        error.value = err.message || "Login failed. Please try again.";
    } finally {
        isSubmitting.value = false;
    }
}
</script>
