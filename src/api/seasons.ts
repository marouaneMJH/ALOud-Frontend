import { apiClient } from "./client";
import { SeasonDto, CreateSeasonDto, UpdateSeasonDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const seasonsApi = {
    async getSeasons(
        params: { pageIndex?: number; pageSize?: number; query?: string } = {},
    ): Promise<PaginatedResponse<SeasonDto>> {
        const { pageIndex = 1, pageSize = 10, query = "" } = params;
        const queryParams = [`pageIndex=${pageIndex}`, `pageSize=${pageSize}`];
        if (query) queryParams.push(`query=${encodeURIComponent(query)}`);
        return apiClient.get<PaginatedResponse<SeasonDto>>(
            `/admin/seasons?${queryParams.join("&")}`,
        );
    },

    async getSeason(id: string): Promise<SeasonDto> {
        return apiClient.get<SeasonDto>(`/admin/seasons/${id}`);
    },

    async createSeason(data: CreateSeasonDto): Promise<SeasonDto> {
        return apiClient.post<SeasonDto>("/admin/seasons", data);
    },

    async updateSeason(id: string, data: UpdateSeasonDto): Promise<SeasonDto> {
        return apiClient.put<SeasonDto>(`/admin/seasons/${id}`, data);
    },

    async deleteSeason(id: string): Promise<void> {
        return apiClient.delete<void>(`/admin/seasons/${id}`);
    },
};
