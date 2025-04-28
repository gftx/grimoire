import { create } from 'zustand';
import { ideasApi } from './api';
import { Idea } from './model';

interface IdeasStore {
  ideas: Idea[];
  isLoading: boolean;
  fetchIdeas: () => Promise<void>;
  addIdea: (idea: Partial<Idea>) => Promise<void>;
  removeIdea: (id: string) => Promise<void>;
}

export const useIdeasStore = create<IdeasStore>((set) => ({
  ideas: [],
  isLoading: false,

  async fetchIdeas() {
    set({ isLoading: true });
    const ideas = await ideasApi.getAll();
    set({ ideas, isLoading: false });
  },

  async addIdea(data) {
    const newIdea = await ideasApi.create(data);
    set((state) => ({ ideas: [newIdea, ...state.ideas] }));
  },

  async removeIdea(id) {
    await ideasApi.remove(id);
    set((state) => ({ ideas: state.ideas.filter((idea) => idea.id !== id) }));
  },
}));