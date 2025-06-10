import { api } from "@/shared/lib/axios";
import { CreateTodoDto, Todo, UpdateTodoDto } from "./types";

export const todosApi = {
  async getByDate(date: string): Promise<Todo[]> {
    const response = await api.get<Todo[]>('/todo', { params: { date } });
    return response.data;
  },

  async create(todo: CreateTodoDto): Promise<Todo> {
    const response = await api.post<Todo>('/todo', todo);
    return response.data;
  },

  async update(id: string, todo: UpdateTodoDto): Promise<Todo> {
    const response = await api.patch<Todo>(`/todo/${id}`, todo);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/todo/${id}`);
  },
};