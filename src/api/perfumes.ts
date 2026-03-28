import { apiClient } from "./client";
import { PerfumeDto, CreatePerfumeDto, UpdatePerfumeDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const perfumesApi = {
    async getPerfumes(
        params: { pageIndex?: number; pageSize?: number; query?: string } = {},
    ): Promise<PaginatedResponse<PerfumeDto>> {
        const { pageIndex = 1, pageSize = 12, query = "" } = params;
        const queryParams = [`pageIndex=${pageIndex}`, `pageSize=${pageSize}`];
        if (query) queryParams.push(`query=${encodeURIComponent(query)}`);
        return apiClient.get<PaginatedResponse<PerfumeDto>>(
            `/perfumes?${queryParams.join("&")}`,
        );
    },

    async getPerfume(id: string): Promise<PerfumeDto> {
        return apiClient.get<PerfumeDto>(`/perfumes/${id}`);
    },

    async createPerfume(data: CreatePerfumeDto): Promise<PerfumeDto> {
        return apiClient.post<PerfumeDto>("/perfumes", data);
    },

    async updatePerfume(
        id: string,
        data: UpdatePerfumeDto,
    ): Promise<PerfumeDto> {
        return apiClient.put<PerfumeDto>(`/perfumes/${id}`, data);
    },

    async deletePerfume(id: string): Promise<void> {
        return apiClient.delete<void>(`/perfumes/${id}`);
    },
};
