import { apiClient } from "./client";
import {
    OccasionDto,
    CreateOccasionDto,
    UpdateOccasionDto,
} from "../types/api";
import { PaginatedResponse } from "../types/api";

export const occasionsApi = {
    async getOccasions(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<OccasionDto>> {
        return apiClient.get<PaginatedResponse<OccasionDto>>(
            `/occasions?page=${page}&pageSize=${pageSize}`,
        );
    },

    async getOccasion(id: string): Promise<OccasionDto> {
        return apiClient.get<OccasionDto>(`/occasions/${id}`);
    },

    async createOccasion(data: CreateOccasionDto): Promise<OccasionDto> {
        return apiClient.post<OccasionDto>("/occasions", data);
    },

    async updateOccasion(
        id: string,
        data: UpdateOccasionDto,
    ): Promise<OccasionDto> {
        return apiClient.put<OccasionDto>(`/occasions/${id}`, data);
    },

    async deleteOccasion(id: string): Promise<void> {
        return apiClient.delete<void>(`/occasions/${id}`);
    },
};
