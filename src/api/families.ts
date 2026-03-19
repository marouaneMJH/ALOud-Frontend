import { apiClient } from "./client";
import { FamilyDto, CreateFamilyDto, UpdateFamilyDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const familiesApi = {
    async getFamilies(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<FamilyDto>> {
        return apiClient.get<PaginatedResponse<FamilyDto>>(
            `/admin/families?page=${page}&pageSize=${pageSize}`,
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
