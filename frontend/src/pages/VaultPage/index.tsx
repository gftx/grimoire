import { useEffect } from "react";
import { useIdeasStore } from "@/entities/idea/store";
import { AddIdeaForm } from "@/features/add-idea";
import { IdeaList } from "@/features/idea-list";

import "./styles.scss";

export const VaultPage = () => {
  const { ideas, fetchIdeas } = useIdeasStore();

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  return (
    <div className='vault'>
      <h1 className='vault-title'>Ideas</h1>

      <AddIdeaForm />

      {ideas.length === 0 ? (
        <div className='vault-empty'>No ideas yet. Add your first one!</div>
      ) : (
        <IdeaList ideas={ideas} />
      )}
    </div>
  );
};
