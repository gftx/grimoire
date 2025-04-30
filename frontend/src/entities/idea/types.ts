export enum IdeaStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum IdeaType {
  IDEA = "IDEA",
  SCRIPT = "SCRIPT",
  TASK = "TASK",
  NOTE = "NOTE",
}

export interface Idea {
  id: string;
  title: string;
  description?: string;
  status: IdeaStatus;
  tags: string[];
  type: IdeaType;
  createdAt: string;
  updatedAt: string;
}


export type EditableIdeaFields = Omit<Idea, "id" | "createdAt" | "updatedAt">;
