import { Idea } from "../idea/types";

export interface KanbanBoard {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanColumn {
  id: string;
  boardId: string;
  title: string;
  order: number;
  items: KanbanItem[];
  createdAt: string;
}

export interface CreateKanbanItemDto {
  columnId: string;
  ideaId?: string;
  title?: string;
  order?: number;
}

export interface KanbanItem {
  id: string;
  columnId: string;
  ideaId: string | null;
  idea: Idea | null;
  title: string | null;
  order: number;
  createdAt: string;
}
