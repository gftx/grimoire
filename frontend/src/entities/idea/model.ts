export type IdeaStatus = 'DRAFT' | 'PUBLISHED';
export type IdeaType = 'IDEA' | 'SCRIPT' | 'TASK' | 'NOTE';

export interface Idea {
  id: string;
  title: string;
  description?: string;
  status: IdeaStatus;
  type: IdeaType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
