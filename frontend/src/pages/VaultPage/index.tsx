import { useEffect } from "react";
import { useIdeasStore } from "@/entities/idea/store";
import { AddIdeaForm } from "@/features/add-idea";
import { IdeaList } from "@/features/idea-list";
import { useLoadingStore } from "@/store/loading";

import "./styles.scss";

export const VaultPage = () => {
  const { ideas, fetchIdeas } = useIdeasStore();
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setLoading(true);
        await fetchIdeas();
      } finally {
        setLoading(false);
      }
    };

    loadIdeas();
  }, [fetchIdeas, setLoading]);

  return (
    <div className='vault'>
      <h1 className='vault-title'>🧠 Vault</h1>

      <AddIdeaForm />

      {ideas.length === 0 ? (
        <div className='vault-empty'>No ideas yet. Add your first one!</div>
      ) : (
        <IdeaList ideas={ideas} />
      )}
    </div>
  );
};
