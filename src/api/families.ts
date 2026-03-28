import { apiClient } from "./client";
import { FamilyDto, CreateFamilyDto, UpdateFamilyDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const familiesApi = {
    async getFamilies(
        params: { pageIndex?: number; pageSize?: number; query?: string } = {},
    ): Promise<PaginatedResponse<FamilyDto>> {
        const { pageIndex = 1, pageSize = 10, query = "" } = params;
        const queryParams = [`pageIndex=${pageIndex}`, `pageSize=${pageSize}`];
        if (query) queryParams.push(`query=${encodeURIComponent(query)}`);
        return apiClient.get<PaginatedResponse<FamilyDto>>(
            `/admin/families?${queryParams.join("&")}`,
        );
    },

    async getFamily(id: string): Promise<FamilyDto> {
        return apiClient.get<FamilyDto>(`/admin/families/${id}`);
    },

    async createFamily(data: CreateFamilyDto): Promise<FamilyDto> {
        return apiClient.post<FamilyDto>("/admin/families", data);
    },

    async updateFamily(id: string, data: UpdateFamilyDto): Promise<FamilyDto> {
        return apiClient.put<FamilyDto>(`/admin/families/${id}`, data);
    },

    async deleteFamily(id: string): Promise<void> {
        return apiClient.delete<void>(`/admin/families/${id}`);
    },
};
