import { apiClient } from "./client";
import { AccordDto, CreateAccordDto, UpdateAccordDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const accordsApi = {
    async getAccords(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<AccordDto>> {
        return apiClient.get<PaginatedResponse<AccordDto>>(
            `/admin/accords?page=${page}&pageSize=${pageSize}`,
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
