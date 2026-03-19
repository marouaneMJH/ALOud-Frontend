import { apiClient } from "./client";
import { PerfumeDto, CreatePerfumeDto, UpdatePerfumeDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const perfumesApi = {
    async getPerfumes(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<PerfumeDto>> {
        return apiClient.get<PaginatedResponse<PerfumeDto>>(
            `/admin/perfumes?page=${page}&pageSize=${pageSize}`,
        );
    },

    async getPerfume(id: string): Promise<PerfumeDto> {
        return apiClient.get<PerfumeDto>(`/admin/perfumes/${id}`);
    },

    async createPerfume(data: CreatePerfumeDto): Promise<PerfumeDto> {
        return apiClient.post<PerfumeDto>("/admin/perfumes", data);
    },

    async updatePerfume(
        id: string,
        data: UpdatePerfumeDto,
    ): Promise<PerfumeDto> {
        return apiClient.put<PerfumeDto>(`/admin/perfumes/${id}`, data);
    },

    async deletePerfume(id: string): Promise<void> {
        return apiClient.delete<void>(`/admin/perfumes/${id}`);
    },
};
