<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardDescription from "@/components/ui/CardDescription.vue";
import CardContent from "@/components/ui/CardContent.vue";
import CardFooter from "@/components/ui/CardFooter.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import Alert from "@/components/ui/Alert.vue";
import Separator from "@/components/ui/Separator.vue";
import { Droplets } from "lucide-vue-next";

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
        router.push("/dashboard");
    } catch (err: any) {
        error.value = err.message || "Login failed. Please try again.";
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <div
        class="flex min-h-screen items-center justify-center bg-background p-4"
    >
        <div class="w-full max-w-md space-y-6">
            <!-- Logo -->
            <div class="flex flex-col items-center gap-2">
                <div
                    class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary"
                >
                    <Droplets class="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 class="text-2xl font-bold text-foreground">ALOud Admin</h1>
                <p class="text-sm text-muted-foreground">
                    Perfume Management Dashboard
                </p>
            </div>

            <!-- Login Card -->
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="handleLogin" class="space-y-4">
                        <div class="space-y-2">
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                v-model="formData.email"
                                type="email"
                                placeholder="admin@example.com"
                                required
                                :disabled="isSubmitting"
                            />
                        </div>

                        <div class="space-y-2">
                            <Label for="password">Password</Label>
                            <Input
                                id="password"
                                v-model="formData.password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                :disabled="isSubmitting"
                            />
                        </div>

                        <Alert v-if="error" variant="destructive">
                            {{ error }}
                        </Alert>

                        <div
                            class="rounded-md bg-muted p-3 text-xs text-muted-foreground"
                        >
                            <strong>Demo:</strong> Email: admin@test.com,
                            Password: password123
                        </div>

                        <Button
                            type="submit"
                            class="w-full"
                            variant="outline"
                            :disabled="isSubmitting"
                        >
                            {{ isSubmitting ? "Logging in..." : "Login" }}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter class="flex flex-col gap-4">
                    <Separator />
                    <p class="text-sm text-muted-foreground">
                        Don't have an account?
                        <router-link
                            to="/register"
                            class="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            Create one
                        </router-link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>
