import { apiClient } from "./client";
import { NoteDto, CreateNoteDto, UpdateNoteDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const notesApi = {
    async getNotes(
        params: { pageIndex?: number; pageSize?: number; query?: string } = {},
    ): Promise<PaginatedResponse<NoteDto>> {
        const { pageIndex = 1, pageSize = 10, query = "" } = params;
        const queryParams = [`pageIndex=${pageIndex}`, `pageSize=${pageSize}`];
        if (query) queryParams.push(`query=${encodeURIComponent(query)}`);
        return apiClient.get<PaginatedResponse<NoteDto>>(
            `/admin/notes?${queryParams.join("&")}`,
        );
    },

    async getNote(id: string): Promise<NoteDto> {
        return apiClient.get<NoteDto>(`/admin/notes/${id}`);
    },

    async createNote(data: CreateNoteDto): Promise<NoteDto> {
        return apiClient.post<NoteDto>("/admin/notes", data);
    },

    async updateNote(id: string, data: UpdateNoteDto): Promise<NoteDto> {
        return apiClient.put<NoteDto>(`/admin/notes/${id}`, data);
    },

    async deleteNote(id: string): Promise<void> {
        return apiClient.delete<void>(`/admin/notes/${id}`);
    },
};
