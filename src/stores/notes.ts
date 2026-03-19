import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { NoteDto, CreateNoteDto, UpdateNoteDto } from '../types/api';
import { notesApi } from '../api/notes';

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<NoteDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  async function fetchNotes(page: number = 1) {
    loading.value = true;
    error.value = null;
    try {
      const result = await notesApi.getNotes(page, pageSize.value);
      notes.value = result.data;
      currentPage.value = result.page;
      total.value = result.total;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch notes';
      console.error('[Pinia] Notes error:', err);
    } finally {
      loading.value = false;
    }
  }

  async function createNote(data: CreateNoteDto) {
    loading.value = true;
    error.value = null;
    try {
      const newNote = await notesApi.createNote(data);
      notes.value.push(newNote);
      total.value++;
      return newNote;
    } catch (err: any) {
      error.value = err.message || 'Failed to create note';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateNote(id: string, data: UpdateNoteDto) {
    loading.value = true;
    error.value = null;
    try {
      const updatedNote = await notesApi.updateNote(id, data);
      const index = notes.value.findIndex(n => n.id === id);
      if (index !== -1) {
        notes.value[index] = updatedNote;
      }
      return updatedNote;
    } catch (err: any) {
      error.value = err.message || 'Failed to update note';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteNote(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await notesApi.deleteNote(id);
      notes.value = notes.value.filter(n => n.id !== id);
      total.value--;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete note';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    notes.value = [];
    error.value = null;
    currentPage.value = 1;
  }

  return { notes, loading, error, currentPage, pageSize, total, totalPages, isLoading, hasError, fetchNotes, createNote, updateNote, deleteNote, reset };
});
