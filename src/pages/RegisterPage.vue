<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8">
    <!-- Register Card -->
    <div class="w-full max-w-md">
      <!-- Logo/Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent mb-2">
          ALOud Admin
        </h1>
        <p class="text-gold-400 text-sm">Perfume Management Dashboard</p>
      </div>

      <!-- Card Container -->
      <div class="rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-8 shadow-lg">
        <!-- Form Title -->
        <h2 class="text-2xl font-semibold text-gold-300 mb-6">Create Account</h2>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- First Name -->
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">First Name</label>
            <input
              v-model="formData.firstName"
              type="text"
              placeholder="John"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Last Name</label>
            <input
              v-model="formData.lastName"
              type="text"
              placeholder="Doe"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Email Address</label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="john@example.com"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Password</label>
            <input
              v-model="formData.password"
              type="password"
              placeholder="••••••••"
              required
              minlength="8"
              :disabled="isSubmitting"
              class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:opacity-50"
            />
            <p class="text-xs text-gold-600 mt-1">Minimum 8 characters</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-gold-300 mb-2">Confirm Password</label>
            <input
              v-model="formData.confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          <!-- Validation Errors -->
          <div v-if="validationErrors.length > 0" class="p-3 bg-red-950 border border-red-800 text-red-200 rounded-lg text-sm">
            <ul class="list-disc list-inside space-y-1">
              <li v-for="(err, i) in validationErrors" :key="i">{{ err }}</li>
            </ul>
          </div>

          <!-- API Errors -->
          <div v-if="error" class="p-3 bg-red-950 border border-red-800 text-red-200 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-gray-900 font-semibold rounded-lg hover:shadow-golden-glow transition duration-300 disabled:opacity-50"
          >
            {{ isSubmitting ? "Creating Account..." : "Create Account" }}
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center gap-4">
          <div class="flex-1 border-t border-gold-700" />
          <span class="text-gold-600 text-sm">or</span>
          <div class="flex-1 border-t border-gold-700" />
        </div>

        <!-- Login Link -->
        <div class="text-center">
          <p class="text-gray-400 text-sm mb-2">Already have an account?</p>
          <router-link
            to="/login"
            class="inline-block px-4 py-2 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300"
          >
            Sign In
          </router-link>
        </div>
      </div>
    </div>

    <!-- Email Verification Modal -->
    <Modal v-if="showVerificationModal" @close="closeVerificationModal" title="Verify Email">
      <div class="space-y-4">
        <p class="text-gray-300">
          A verification code has been sent to <span class="font-semibold text-gold-300">{{ authStore.verificationEmail }}</span>
        </p>

        <div>
          <label class="block text-sm font-medium text-gold-300 mb-2">Verification Code</label>
          <input
            v-model="verificationCode"
            type="text"
            placeholder="000000"
            required
            :disabled="isVerifying"
            class="w-full px-4 py-2 border border-gold-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
        </div>

        <div v-if="verificationError" class="p-3 bg-red-950 border border-red-800 text-red-200 rounded-lg text-sm">
          {{ verificationError }}
        </div>

        <div class="flex gap-4 pt-4">
          <button
            @click="handleVerify"
            :disabled="isVerifying"
            class="flex-1 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-gray-900 font-medium rounded-lg hover:shadow-golden-glow transition duration-300 disabled:opacity-50"
          >
            {{ isVerifying ? "Verifying..." : "Verify" }}
          </button>
          <button
            @click="closeVerificationModal"
            :disabled="isVerifying"
            class="flex-1 px-4 py-2 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        <!-- Resend Code Link -->
        <div class="text-center">
          <button
            @click="handleResendCode"
            :disabled="isVerifying"
            class="text-gold-400 hover:text-gold-300 text-sm underline"
          >
            Didn't receive code? Resend
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Modal from "../components/common/Modal.vue";

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
    
    // Show verification modal
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
    
    // Show success and redirect to login
    closeVerificationModal();
    router.push("/login");
  } catch (err: any) {
    verificationError.value = err.message || "Verification failed. Please try again.";
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
