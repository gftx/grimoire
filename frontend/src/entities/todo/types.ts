export interface Todo {
  id: string;
  title: string;
  description?: string;
  tag?: string;
  date: string; // ISO string
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  tag?: string;
  date: string;
  completed: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  tag?: string;
  date?: string;
  completed?: boolean;
}