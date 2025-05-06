import { FC } from 'react';
import { KanbanColumn } from '@/entities/kanban/types';
import styles from './styles.module.scss';

interface KanbanColumnCardProps {
  column: KanbanColumn;
}

export const KanbanColumnCard: FC<KanbanColumnCardProps> = ({ column }) => {
  return (
    <div className={styles.columnCard}>
      <h3 className={styles.title}>{column.title}</h3>

      <div className={styles.tasks}>
        {/* Пока задач нет */}
        <div className={styles.empty}>
          No tasks yet ✨
        </div>
      </div>

      <button className={styles.addTaskButton}>
        ➕ Add Task
      </button>
    </div>
  );
};
