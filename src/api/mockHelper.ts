/**
 * Mock Data Interceptor Utility
 * 
 * This utility provides a consistent way to handle mock data across all API modules.
 * Set MOCK_MODE_ENABLED to false to use real backend API calls.
 */

import { CONFIG } from './client';

/**
 * Global mock mode flag - can be overridden per API module
 * Default: true for development, false for production
 */
export const MOCK_MODE_ENABLED = CONFIG.mockMode;

/**
 * Simulates network delay for mock API calls
 * @param ms - Delay in milliseconds (default: 300ms)
 */
export async function simulateNetworkDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Log mock API calls
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param url - API endpoint URL
 * @param data - Request data (optional)
 */
export function logMockApiCall(method: string, url: string, data?: any): void {
  if (CONFIG.logLevel === 'debug') {
    console.log(
      `%c[MOCK API] ${method}`,
      'color: #ff9800; font-weight: bold;',
      url,
      data ? '→' : '',
      data || ''
    );
  }
}

/**
 * Check if mock mode should be used
 * Returns the configuration setting, but individual API modules can override
 */
export function shouldUseMockMode(): boolean {
  return MOCK_MODE_ENABLED;
}

/**
 * Helper to wrap mock API responses in paginated format
 */
export function paginatedResponse<T>(
  data: T[],
  page: number = 1,
  pageSize: number = 10
) {
  return {
    data: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
    page,
    pageSize,
    totalPages: Math.ceil(data.length / pageSize),
  };
}

/**
 * Helper to create mock error response
 */
export function mockErrorResponse(statusCode: number, message: string) {
  return {
    error: message,
    statusCode,
    message,
  };
}
