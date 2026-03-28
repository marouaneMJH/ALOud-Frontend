import { apiClient } from "./client";
import { TagDto, CreateTagDto, UpdateTagDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const tagsApi = {
    async getTags(
        params: { pageIndex?: number; pageSize?: number; query?: string } = {},
    ): Promise<PaginatedResponse<TagDto>> {
        const { pageIndex = 1, pageSize = 10, query = "" } = params;
        const queryParams = [`pageIndex=${pageIndex}`, `pageSize=${pageSize}`];
        if (query) queryParams.push(`query=${encodeURIComponent(query)}`);
        return apiClient.get<PaginatedResponse<TagDto>>(
            `/admin/tags?${queryParams.join("&")}`,
        );
    },

    async getTag(id: string): Promise<TagDto> {
        return apiClient.get<TagDto>(`/admin/tags/${id}`);
    },

    async createTag(data: CreateTagDto): Promise<TagDto> {
        return apiClient.post<TagDto>("/admin/tags", data);
    },

    async updateTag(id: string, data: UpdateTagDto): Promise<TagDto> {
        return apiClient.put<TagDto>(`/admin/tags/${id}`, data);
    },

    async deleteTag(id: string): Promise<void> {
        return apiClient.delete<void>(`/admin/tags/${id}`);
    },
};
