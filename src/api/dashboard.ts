import { apiClient } from "./client";
import { DashboardStatsDto } from "../types/api";

export const dashboardApi = {
    async getStats(): Promise<DashboardStatsDto> {
        console.log("[API Dashboard] Calling getStats...");
        const result =
            await apiClient.get<DashboardStatsDto>("/admin/dashboard");
        console.log("[API Dashboard] getStats result:", result);
        return result;
    },
};
