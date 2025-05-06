import { FC, useState } from 'react';
import { kanbanApi } from '@/entities/kanban/api';
import { useBoards } from '@/entities/kanban/hooks/useBoards';
import styles from './styles.module.scss';

interface CreateBoardFormProps {
  onSuccess: () => void;
}

export const CreateBoardForm: FC<CreateBoardFormProps> = ({ onSuccess }) => {
  const { fetchBoards } = useBoards();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      await kanbanApi.createBoard(title, description);
      await fetchBoards();
      onSuccess(); // закрываем модалку после успешного создания
    } catch (error) {
      console.error('Failed to create board', error);
    }
  };

  return (
    <div className={styles.form}>
      <h2>Create New Board</h2>

      <input
        type="text"
        placeholder="Board title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.input}
      />

      <div className={styles.actions}>
        <button onClick={handleCreate} className={styles.saveButton}>
          Create
        </button>
      </div>
    </div>
  );
};