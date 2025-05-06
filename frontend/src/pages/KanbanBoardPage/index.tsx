import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { kanbanColumnApi } from '@/entities/kanban/api';
import { KanbanColumn } from '@/entities/kanban/types';
import { KanbanColumnCard } from '@/features/kanban-column/KanbanColumnCard';
import { CreateColumnButton } from '@/features/kanban-column/CreateColumnButton';
import styles from './styles.module.scss';

export const KanbanBoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchColumns = async () => {
    try {
      if (!boardId) return;
      const data = await kanbanColumnApi.getColumnsByBoard(boardId);
      setColumns(data);
    } catch (error) {
      console.error('Failed to load columns', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, [boardId]);

  if (loading) {
    return <div className={styles.message}>Loading...</div>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>My Board</h1>
        <CreateColumnButton boardId={boardId!} onCreated={fetchColumns} />
      </div>

      <div className={styles.columnsWrapper}>
        {columns.length === 0 ? (
          <div className={styles.emptyState}>No columns yet ✨</div>
        ) : (
          columns.map((column) => (
            <KanbanColumnCard key={column.id} column={column} />
          ))
        )}
      </div>
    </main>
  );
};