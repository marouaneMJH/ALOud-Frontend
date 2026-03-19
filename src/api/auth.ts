import { apiClient } from "./client";
import {
    LoginRequestDto,
    RegisterRequestDto,
    VerifyEmailRequestDto,
    ResendVerificationRequestDto,
    LoginResponseDto,
    RegisterResponseDto,
} from "../types/auth";
// import { CONFIG } from "./client";

export const accountApi = {
    // Login endpoint: POST /account/login
    async login(email: string, password: string): Promise<LoginResponseDto> {
        const request: LoginRequestDto = { email, password };
        const response = await apiClient.post<any>("/account/login", request);
        // Extract data from wrapped response: { success: true, data: { user, token, message } }
        return response.data || response;
    },

    // Register endpoint: POST /account/register
    async register(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
    ): Promise<RegisterResponseDto> {
        const request: RegisterRequestDto = {
            email,
            password,
            firstName,
            lastName,
        };
        const response = await apiClient.post<any>(
            "/account/register",
            request,
        );
        // Extract data from wrapped response
        return response.data || response;
    },

    // Verify email endpoint: POST /account/verify
    async verifyEmail(email: string, code: string): Promise<any> {
        const request: VerifyEmailRequestDto = { email, code };
        const response = await apiClient.post<any>("/account/verify", request);
        // Extract data from wrapped response
        return response.data || response;
    },

    // Resend verification code: POST /account/resend-verification
    async resendVerification(email: string): Promise<any> {
        const request: ResendVerificationRequestDto = { email };
        const response = await apiClient.post<any>(
            "/account/resend-verification",
            request,
        );
        // Extract data from wrapped response
        return response.data || response;
    },
};
