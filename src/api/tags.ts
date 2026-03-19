import { apiClient } from "./client";
import { TagDto, CreateTagDto, UpdateTagDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const tagsApi = {
    async getTags(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<TagDto>> {
        return apiClient.get<PaginatedResponse<TagDto>>(
            `/admin/tags?page=${page}&pageSize=${pageSize}`,
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
