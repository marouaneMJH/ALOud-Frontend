import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { UserDto, LoginResponseDto } from "../types/auth";
import { accountApi } from "../api/auth";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<UserDto | null>(null);
  const token = ref<string | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const verificationEmail = ref<string | null>(null); // For verification flow

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);

  // Actions

  /**
   * Load auth state from localStorage (called on app startup)
   */
  function loadFromStorage() {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
      console.log("[Auth Store] Session restored from storage", user.value);
    }
  }

  /**
   * Save auth state to localStorage
   */
  function saveToStorage() {
    if (token.value && user.value) {
      localStorage.setItem("authToken", token.value);
      localStorage.setItem("authUser", JSON.stringify(user.value));
    }
  }

  /**
   * Login action: POST /accounts/login
   */
  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;
    console.log("[Auth Store] Attempting login for", email);

    try {
      const response = await accountApi.login(email, password);
      
      // Update state
      token.value = response.token;
      user.value = response.user;
      
      // Save to storage
      saveToStorage();
      
      console.log("[Auth Store] Login successful", user.value);
      return response;
    } catch (err: any) {
      error.value = err.message || "Login failed";
      console.error("[Auth Store] Login error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Register action: POST /accounts/register
   */
  async function register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    loading.value = true;
    error.value = null;
    console.log("[Auth Store] Attempting registration for", email);

    try {
      const response = await accountApi.register(email, password, firstName, lastName);
      
      // Store email for verification flow
      verificationEmail.value = email;
      
      console.log("[Auth Store] Registration successful");
      return response;
    } catch (err: any) {
      error.value = err.message || "Registration failed";
      console.error("[Auth Store] Register error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Verify email action: POST /accounts/verify
   */
  async function verifyEmail(email: string, code: string) {
    loading.value = true;
    error.value = null;
    console.log("[Auth Store] Verifying email");

    try {
      const response = await accountApi.verifyEmail(email, code);
      console.log("[Auth Store] Email verified successfully");
      return response;
    } catch (err: any) {
      error.value = err.message || "Email verification failed";
      console.error("[Auth Store] Verify error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Resend verification code action: POST /accounts/resend-verification
   */
  async function resendVerification(email: string) {
    loading.value = true;
    error.value = null;
    console.log("[Auth Store] Resending verification code");

    try {
      const response = await accountApi.resendVerification(email);
      console.log("[Auth Store] Verification code resent");
      return response;
    } catch (err: any) {
      error.value = err.message || "Failed to resend verification code";
      console.error("[Auth Store] Resend error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Logout action: clear state and storage
   */
  function logout() {
    token.value = null;
    user.value = null;
    verificationEmail.value = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    console.log("[Auth Store] User logged out");
  }

  /**
   * Clear error state
   */
  function clearError() {
    error.value = null;
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    verificationEmail,
    // Computed
    isAuthenticated,
    isLoading,
    hasError,
    // Actions
    loadFromStorage,
    login,
    register,
    verifyEmail,
    resendVerification,
    logout,
    clearError,
  };
});
