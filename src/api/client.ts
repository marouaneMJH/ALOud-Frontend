import axios, { AxiosInstance, AxiosError } from "axios";

// Environment configuration
const VITE_API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:51/api/v1";
const VITE_MOCK_MODE = import.meta.env.VITE_MOCK_MODE;
const VITE_ENV = import.meta.env.VITE_ENV || "development";
const VITE_LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL || "debug";

console.log(`VITE_MOCK_MODE:${VITE_MOCK_MODE}`);

// Feature flags
export const CONFIG = {
    mockMode: VITE_MOCK_MODE,
    apiUrl: VITE_API_URL,
    environment: VITE_ENV,
    logLevel: VITE_LOG_LEVEL,
};

class ApiClient {
    private client: AxiosInstance;
    private baseURL: string;
    private mockMode: boolean;

    constructor() {
        this.baseURL = CONFIG.apiUrl;
        this.mockMode = CONFIG.mockMode;

        console.log(
            `%c[API Client] Initialized`,
            "color: blue; font-weight: bold;",
            {
                baseURL: this.baseURL,
                mockMode: this.mockMode,
                environment: CONFIG.environment,
            },
        );

        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Request interceptor - add auth token
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Response interceptor - handle errors
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                // Handle 401 Unauthorized
                if (error.response?.status === 401) {
                    console.warn(
                        "[API Client] Unauthorized - clearing auth token",
                    );
                    localStorage.removeItem("authToken");
                    window.location.href = "/login";
                }

                // Log errors based on level
                if (CONFIG.logLevel !== "error") {
                    console.error("[API Client] Error:", {
                        status: error.response?.status,
                        statusText: error.response?.statusText,
                        url: error.config?.url,
                        data: error.response?.data,
                    });
                }

                return Promise.reject(error);
            },
        );
    }

    /**
     * Get the current mock mode status
     */
    isMockMode(): boolean {
        return this.mockMode;
    }

    /**
     * Get current configuration
     */
    getConfig() {
        return { ...CONFIG };
    }

    async get<T>(url: string): Promise<T> {
        try {
            const response = await this.client.get<T>(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("API GET request failed:", error);
            throw error;
        }
    }

    async post<T>(url: string, data?: any): Promise<T> {
        try {
            const response = await this.client.post<any>(url, data);
            // Check if response is wrapped in { success, data } format
            if (response.data && response.data.success !== undefined) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.error("API POST request failed:", error);
            throw error;
        }
    }

    async put<T>(url: string, data?: any): Promise<T> {
        try {
            const response = await this.client.put<T>(url, data);
            return response.data;
        } catch (error) {
            console.error("API PUT request failed:", error);
            throw error;
        }
    }

    async delete<T>(url: string): Promise<T> {
        try {
            const response = await this.client.delete<T>(url);
            return response.data;
        } catch (error) {
            console.error("API DELETE request failed:", error);
            throw error;
        }
    }
}

export const apiClient = new ApiClient();
