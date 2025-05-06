import { api } from "@/shared/lib/axios";
import { CreateKanbanItemDto, KanbanBoard, KanbanColumn, KanbanItem } from "./types";

export const kanbanApi = {
  async getBoards(): Promise<KanbanBoard[]> {
    const res = await api.get("/kanban/boards");
    return res.data;
  },

  async createBoard(title: string, description?: string): Promise<KanbanBoard> {
    const res = await api.post("/kanban/boards", { title, description });
    return res.data;
  },

  async deleteBoard(id: string): Promise<void> {
    await api.delete(`/kanban/boards/${id}`);
  },
};

export const kanbanColumnApi = {
  async getColumnsByBoard(boardId: string): Promise<KanbanColumn[]> {
    const response = await api.get<KanbanColumn[]>(`/kanban/columns`, {
      params: { boardId },
    });
    return response.data;
  },

  async createColumn(boardId: string, title: string, order: number): Promise<KanbanColumn> {
    const response = await api.post<KanbanColumn>(`/kanban/columns`, {
      boardId,
      title,
      order,
    });
    return response.data;
  },

  async removeColumn(columnId: string): Promise<void> {
    await api.delete(`/kanban/columns/${columnId}`);
  },

  async updateColumn(columnId: string, data: { title?: string; order?: number }): Promise<KanbanColumn> {
    const response = await api.patch<KanbanColumn>(`/kanban/columns/${columnId}`, data);
    return response.data;
  },
};

export const kanbanItemApi = {
  async getItemsByColumn(columnId: string): Promise<KanbanItem[]> {
    const response = await api.get<KanbanItem[]>(`/kanban/items`, {
      params: { columnId },
    });
    return response.data;
  },

  async createItem(data: CreateKanbanItemDto): Promise<KanbanItem> {
    const response = await api.post<KanbanItem>(`/kanban/items`, data);
    return response.data;
  },

  async removeItem(itemId: string): Promise<void> {
    await api.delete(`/kanban/items/${itemId}`);
  },

  async updateItem(itemId: string, data: { columnId?: string; order?: number }): Promise<KanbanItem> {
    const response = await api.patch<KanbanItem>(`/kanban/items/${itemId}`, data);
    return response.data;
  },
};