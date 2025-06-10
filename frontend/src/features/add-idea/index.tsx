import { useState } from 'react';
import { useIdeasStore } from '@/entities/idea/store';
import styles from './styles.module.scss';
import { IdeaStatus, IdeaType } from '@/entities/idea/types';

export const AddIdeaForm = () => {
  const [title, setTitle] = useState('');
  const { addIdea } = useIdeasStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 2) {
      return;
    }

    await addIdea({
      title: title.trim(),
      status: IdeaStatus.DRAFT,
      type: IdeaType.IDEA,
      tags: [],
    });

    setTitle(''); // Очистить поле после добавления
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addIdeaForm}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Capture your idea..."
        className={styles.input}
      />
    </form>
  );
};