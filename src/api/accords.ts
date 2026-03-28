import { apiClient } from "./client";
import { AccordDto, CreateAccordDto, UpdateAccordDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const accordsApi = {
    async getAccords(
        params: { pageIndex?: number; pageSize?: number; query?: string } = {},
    ): Promise<PaginatedResponse<AccordDto>> {
        const { pageIndex = 1, pageSize = 10, query = "" } = params;
        const queryParams = [`pageIndex=${pageIndex}`, `pageSize=${pageSize}`];
        if (query) queryParams.push(`query=${encodeURIComponent(query)}`);
        return apiClient.get<PaginatedResponse<AccordDto>>(
            `/admin/accords?${queryParams.join("&")}`,
        );
    },

    async getAccord(id: string): Promise<AccordDto> {
        return apiClient.get<AccordDto>(`/admin/accords/${id}`);
    },

    async createAccord(data: CreateAccordDto): Promise<AccordDto> {
        return apiClient.post<AccordDto>("/admin/accords", data);
    },

    async updateAccord(id: string, data: UpdateAccordDto): Promise<AccordDto> {
        return apiClient.put<AccordDto>(`/admin/accords/${id}`, data);
    },

    async deleteAccord(id: string): Promise<void> {
        return apiClient.delete<void>(`/admin/accords/${id}`);
    },
};
