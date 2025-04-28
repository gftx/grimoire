import { api } from '@/shared/lib/axios';
import { Idea } from './model';

export const ideasApi = {
  async create(data: Partial<Idea>) {
    const response = await api.post<Idea>('/ideas', data);
    return response.data;
  },

  async getAll() {
    const response = await api.get<Idea[]>('/ideas');
    return response.data;
  },

  async update(id: string, data: Partial<Idea>) {
    const response = await api.patch<Idea>(`/ideas/${id}`, data);
    return response.data;
  },

  async remove(id: string) {
    await api.delete(`/ideas/${id}`);
  },

  async getOne(id: string) {
    const response = await api.get<Idea>(`/ideas/${id}`);
    return response.data;
  },
};
