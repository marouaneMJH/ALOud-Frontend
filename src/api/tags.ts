import { apiClient } from "./client";
import { TagDto, CreateTagDto, UpdateTagDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const tagsApi = {
    async getTags(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<TagDto>> {
        return apiClient.get<PaginatedResponse<TagDto>>(
            `/tags?page=${page}&pageSize=${pageSize}`,
        );
    },

    async getTag(id: string): Promise<TagDto> {
        return apiClient.get<TagDto>(`/tags/${id}`);
    },

    async createTag(data: CreateTagDto): Promise<TagDto> {
        return apiClient.post<TagDto>("/tags", data);
    },

    async updateTag(id: string, data: UpdateTagDto): Promise<TagDto> {
        return apiClient.put<TagDto>(`/tags/${id}`, data);
    },

    async deleteTag(id: string): Promise<void> {
        return apiClient.delete<void>(`/tags/${id}`);
    },
};
