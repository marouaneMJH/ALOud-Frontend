import { apiClient } from "./client";
import { SeasonDto, CreateSeasonDto, UpdateSeasonDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const seasonsApi = {
    async getSeasons(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<SeasonDto>> {
        return apiClient.get<PaginatedResponse<SeasonDto>>(
            `/seasons?page=${page}&pageSize=${pageSize}`,
        );
    },

    async getSeason(id: string): Promise<SeasonDto> {
        return apiClient.get<SeasonDto>(`/seasons/${id}`);
    },

    async createSeason(data: CreateSeasonDto): Promise<SeasonDto> {
        return apiClient.post<SeasonDto>("/seasons", data);
    },

    async updateSeason(id: string, data: UpdateSeasonDto): Promise<SeasonDto> {
        return apiClient.put<SeasonDto>(`/seasons/${id}`, data);
    },

    async deleteSeason(id: string): Promise<void> {
        return apiClient.delete<void>(`/seasons/${id}`);
    },
};
