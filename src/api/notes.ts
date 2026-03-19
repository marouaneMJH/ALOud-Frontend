import { apiClient } from "./client";
import { NoteDto, CreateNoteDto, UpdateNoteDto } from "../types/api";
import { PaginatedResponse } from "../types/api";

export const notesApi = {
    async getNotes(
        page: number = 1,
        pageSize: number = 10,
    ): Promise<PaginatedResponse<NoteDto>> {
        return apiClient.get<PaginatedResponse<NoteDto>>(
            `/notes?page=${page}&pageSize=${pageSize}`,
        );
    },

    async getNote(id: string): Promise<NoteDto> {
        return apiClient.get<NoteDto>(`/notes/${id}`);
    },

    async createNote(data: CreateNoteDto): Promise<NoteDto> {
        return apiClient.post<NoteDto>("/notes", data);
    },

    async updateNote(id: string, data: UpdateNoteDto): Promise<NoteDto> {
        return apiClient.put<NoteDto>(`/notes/${id}`, data);
    },

    async deleteNote(id: string): Promise<void> {
        return apiClient.delete<void>(`/notes/${id}`);
    },
};
