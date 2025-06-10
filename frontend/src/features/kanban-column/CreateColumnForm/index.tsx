import { FC, useState } from 'react';
import { kanbanColumnApi } from '@/entities/kanban/api';
import styles from './styles.module.scss';

interface CreateColumnFormProps {
  boardId: string;
  onSuccess: () => void;
}

export const CreateColumnForm: FC<CreateColumnFormProps> = ({ boardId, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      await kanbanColumnApi.createColumn(boardId, title, 0);
      onSuccess();
    } catch (error) {
      console.error('Failed to create column', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h2>Create New Column</h2>

      <input
        type="text"
        placeholder="Column title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />

      <div className={styles.actions}>
        <button
          onClick={handleCreate}
          className={styles.saveButton}
          disabled={!title.trim() || loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </div>
  );
};
