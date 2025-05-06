import { useEffect, useState } from 'react';
import { kanbanApi } from '../api';
import { KanbanBoard } from '../types';

export const useBoards = () => {
  const [boards, setBoards] = useState<KanbanBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        const data = await kanbanApi.getBoards();
        setBoards(data);
        setError(null);
      } catch (e) {
        setError(`Failed to load boards ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const manualReload = async () => {
    try {
      setLoading(true);
      const data = await kanbanApi.getBoards();
      setBoards(data);
      setError(null);
    } catch (e) {
      setError(`Failed to reload boards ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return { boards, loading, error, setBoards, fetchBoards: manualReload };
};