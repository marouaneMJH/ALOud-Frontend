import { apiClient } from "./client";
import { FamilyDto, CreateFamilyDto, UpdateFamilyDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const familiesApi = {
    async getFamilies(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<FamilyDto>> {
        return apiClient.get<PaginatedResponse<FamilyDto>>(
            `/families?page=${page}&pageSize=${pageSize}`,
        );
    },

    async getFamily(id: string): Promise<FamilyDto> {
        return apiClient.get<FamilyDto>(`/families/${id}`);
    },

    async createFamily(data: CreateFamilyDto): Promise<FamilyDto> {
        return apiClient.post<FamilyDto>("/families", data);
    },

    async updateFamily(id: string, data: UpdateFamilyDto): Promise<FamilyDto> {
        return apiClient.put<FamilyDto>(`/families/${id}`, data);
    },

    async deleteFamily(id: string): Promise<void> {
        return apiClient.delete<void>(`/families/${id}`);
    },
};
