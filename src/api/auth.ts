import { apiClient } from "./client";
import {
    LoginRequestDto,
    RegisterRequestDto,
    VerifyEmailRequestDto,
    ResendVerificationRequestDto,
    LoginResponseDto,
    RegisterResponseDto,
} from "../types/auth";
import { logMockApiCall, simulateNetworkDelay } from "./mockHelper";
import { CONFIG } from "./client";

export const accountApi = {
    // Login endpoint: POST /accounts/login
    async login(email: string, password: string): Promise<LoginResponseDto> {
        logMockApiCall("POST", "/accounts/login", { email });

        // Mock mode: accept test account
        if (CONFIG.mockMode) {
            await simulateNetworkDelay(300);
            if (email === "admin@test.com" && password === "password123") {
                return {
                    message: "Login successful",
                    user: {
                        id: "mock-user-123",
                        email: "admin@test.com",
                        firstName: "Admin",
                        lastName: "User",
                        isEmailVerified: true,
                    },
                    token: "mock-jwt-token-" + Date.now(),
                };
            } else {
                throw new Error("Invalid credentials");
            }
        }

        const request: LoginRequestDto = { email, password };
        const response = await apiClient.post<any>("/accounts/login", request);
        // Extract data from wrapped response: { success: true, data: { user, token, message } }
        return response.data || response;
    },

    // Register endpoint: POST /accounts/register
    async register(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
    ): Promise<RegisterResponseDto> {
        logMockApiCall("POST", "/accounts/register", {
            email,
            firstName,
            lastName,
        });

        // Mock mode: always succeed
        if (CONFIG.mockMode) {
            await simulateNetworkDelay(300);
            return {
                message:
                    "Registration successful. Please check your email for verification code.",
                email,
            };
        }

        const request: RegisterRequestDto = {
            email,
            password,
            firstName,
            lastName,
        };
        const response = await apiClient.post<any>(
            "/accounts/register",
            request,
        );
        // Extract data from wrapped response
        return response.data || response;
    },

    // Verify email endpoint: POST /accounts/verify
    async verifyEmail(email: string, code: string): Promise<any> {
        logMockApiCall("POST", "/accounts/verify", { email });

        // Mock mode: accept any code
        if (CONFIG.mockMode) {
            await simulateNetworkDelay(300);
            if (code.length >= 4) {
                return { message: "Email verified successfully" };
            } else {
                throw new Error("Invalid code");
            }
        }

        const request: VerifyEmailRequestDto = { email, code };
        const response = await apiClient.post<any>("/accounts/verify", request);
        // Extract data from wrapped response
        return response.data || response;
    },

    // Resend verification code: POST /accounts/resend-verification
    async resendVerification(email: string): Promise<any> {
        logMockApiCall("POST", "/accounts/resend-verification", { email });

        // Mock mode: always succeed
        if (CONFIG.mockMode) {
            await simulateNetworkDelay(300);
            return { message: "Verification code sent successfully" };
        }

        const request: ResendVerificationRequestDto = { email };
        const response = await apiClient.post<any>("/accounts/resend-verification", request);
        // Extract data from wrapped response
        return response.data || response;
    },
};
