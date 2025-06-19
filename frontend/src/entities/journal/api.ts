import { api } from "@/shared/lib/axios";
import { CreateJournalEntryDto, JournalEntry, UpdateJournalEntryDto } from "./types";

export const journalApi = {
  async getByDate(date: string): Promise<JournalEntry[]> {
    const response = await api.get<JournalEntry[]>("/journal", { params: { date } });
    return response.data;
  },

  async getById(id: string): Promise<JournalEntry> {
    const response = await api.get<JournalEntry>(`/journal/${id}`);
    return response.data;
  },

  async create(data: CreateJournalEntryDto): Promise<JournalEntry> {
    const response = await api.post<JournalEntry>("/journal", data);
    return response.data;
  },

  async update(id: string, data: UpdateJournalEntryDto): Promise<JournalEntry> {
    const response = await api.patch<JournalEntry>(`/journal/${id}` , data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/journal/${id}`);
  },
};