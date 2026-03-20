<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Modal from "@/components/common/Modal.vue";
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const isSubmitting = ref(false);
const error = ref<string | null>(null);
const validationErrors = ref<string[]>([]);

const showVerificationModal = ref(false);
const verificationCode = ref("");
const verificationError = ref<string | null>(null);
const isVerifying = ref(false);

function validateForm(): boolean {
    validationErrors.value = [];

    if (!formData.value.firstName.trim()) {
        validationErrors.value.push("First name is required");
    }
    if (!formData.value.lastName.trim()) {
        validationErrors.value.push("Last name is required");
    }
    if (!formData.value.email.includes("@")) {
        validationErrors.value.push("Valid email is required");
    }
    if (formData.value.password.length < 8) {
        validationErrors.value.push("Password must be at least 8 characters");
    }
    if (formData.value.password !== formData.value.confirmPassword) {
        validationErrors.value.push("Passwords do not match");
    }

    return validationErrors.value.length === 0;
}

async function handleRegister() {
    if (!validateForm()) return;

    error.value = null;
    isSubmitting.value = true;

    try {
        await authStore.register(
            formData.value.email,
            formData.value.password,
            formData.value.firstName,
            formData.value.lastName
        );
        showVerificationModal.value = true;
    } catch (err: any) {
        error.value = err.message || "Registration failed. Please try again.";
    } finally {
        isSubmitting.value = false;
    }
}

async function handleVerify() {
    if (!verificationCode.value.trim()) {
        verificationError.value = "Verification code is required";
        return;
    }

    verificationError.value = null;
    isVerifying.value = true;

    try {
        await authStore.verifyEmail(
            authStore.verificationEmail || formData.value.email,
            verificationCode.value
        );
        closeVerificationModal();
        router.push("/login");
    } catch (err: any) {
        verificationError.value =
            err.message || "Verification failed. Please try again.";
    } finally {
        isVerifying.value = false;
    }
}

async function handleResendCode() {
    isVerifying.value = true;

    try {
        await authStore.resendVerification(
            authStore.verificationEmail || formData.value.email
        );
        verificationError.value = null;
    } catch (err: any) {
        verificationError.value = err.message || "Failed to resend code";
    } finally {
        isVerifying.value = false;
    }
}

function closeVerificationModal() {
    showVerificationModal.value = false;
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

            <!-- Register Card -->
            <Card>
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                        Fill in your details to create a new account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="handleRegister" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    v-model="formData.firstName"
                                    type="text"
                                    placeholder="John"
                                    required
                                    :disabled="isSubmitting"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    v-model="formData.lastName"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    :disabled="isSubmitting"
                                />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                v-model="formData.email"
                                type="email"
                                placeholder="john@example.com"
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
                                placeholder="Min 8 characters"
                                required
                                minlength="8"
                                :disabled="isSubmitting"
                            />
                        </div>

                        <div class="space-y-2">
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                v-model="formData.confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                required
                                :disabled="isSubmitting"
                            />
                        </div>

                        <Alert
                            v-if="validationErrors.length > 0"
                            variant="destructive"
                        >
                            <ul class="list-disc list-inside space-y-1 text-sm">
                                <li
                                    v-for="(err, i) in validationErrors"
                                    :key="i"
                                >
                                    {{ err }}
                                </li>
                            </ul>
                        </Alert>

                        <Alert v-if="error" variant="destructive">
                            {{ error }}
                        </Alert>

                        <Button
                            type="submit"
                            class="w-full"
                            :disabled="isSubmitting"
                        >
                            {{
                                isSubmitting
                                    ? "Creating Account..."
                                    : "Create Account"
                            }}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter class="flex flex-col gap-4">
                    <Separator />
                    <p class="text-sm text-muted-foreground">
                        Already have an account?
                        <router-link
                            to="/login"
                            class="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            Sign in
                        </router-link>
                    </p>
                </CardFooter>
            </Card>
        </div>

        <!-- Email Verification Modal -->
        <Modal
            v-if="showVerificationModal"
            @close="closeVerificationModal"
            title="Verify Email"
        >
            <div class="space-y-4">
                <p class="text-sm text-muted-foreground">
                    A verification code has been sent to
                    <span class="font-medium text-foreground">
                        {{ authStore.verificationEmail }}
                    </span>
                </p>

                <div class="space-y-2">
                    <Label for="verificationCode">Verification Code</Label>
                    <Input
                        id="verificationCode"
                        v-model="verificationCode"
                        type="text"
                        placeholder="000000"
                        required
                        :disabled="isVerifying"
                    />
                </div>

                <Alert v-if="verificationError" variant="destructive">
                    {{ verificationError }}
                </Alert>

                <div class="flex gap-3 pt-2">
                    <Button
                        class="flex-1"
                        :disabled="isVerifying"
                        @click="handleVerify"
                    >
                        {{ isVerifying ? "Verifying..." : "Verify" }}
                    </Button>
                    <Button
                        variant="outline"
                        class="flex-1"
                        :disabled="isVerifying"
                        @click="closeVerificationModal"
                    >
                        Cancel
                    </Button>
                </div>

                <div class="text-center">
                    <button
                        class="text-sm text-primary hover:underline"
                        :disabled="isVerifying"
                        @click="handleResendCode"
                    >
                        Didn't receive code? Resend
                    </button>
                </div>
            </div>
        </Modal>
    </div>
</template>
