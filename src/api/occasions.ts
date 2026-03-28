import { apiClient } from "./client";
import {
    OccasionDto,
    CreateOccasionDto,
    UpdateOccasionDto,
} from "../types/api";
import { PaginatedResponse } from "../types/api";

export const occasionsApi = {
    async getOccasions(
        params: { pageIndex?: number; pageSize?: number; query?: string } = {},
    ): Promise<PaginatedResponse<OccasionDto>> {
        const { pageIndex = 1, pageSize = 10, query = "" } = params;
        const queryParams = [`pageIndex=${pageIndex}`, `pageSize=${pageSize}`];
        if (query) queryParams.push(`query=${encodeURIComponent(query)}`);
        return apiClient.get<PaginatedResponse<OccasionDto>>(
            `/admin/occasions?${queryParams.join("&")}`,
        );
    },

    async getOccasion(id: string): Promise<OccasionDto> {
        return apiClient.get<OccasionDto>(`/admin/occasions/${id}`);
    },

    async createOccasion(data: CreateOccasionDto): Promise<OccasionDto> {
        return apiClient.post<OccasionDto>("/admin/occasions", data);
    },

    async updateOccasion(
        id: string,
        data: UpdateOccasionDto,
    ): Promise<OccasionDto> {
        return apiClient.put<OccasionDto>(`/admin/occasions/${id}`, data);
    },

    async deleteOccasion(id: string): Promise<void> {
        return apiClient.delete<void>(`/admin/occasions/${id}`);
    },
};
