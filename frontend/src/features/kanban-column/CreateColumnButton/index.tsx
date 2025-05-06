import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { CreateColumnForm } from '../CreateColumnForm';
import styles from './styles.module.scss';

interface Props {
  boardId: string;
  onCreated: () => void;
}

export const CreateColumnButton = ({ boardId, onCreated }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.button}>
        ➕ Add Column
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateColumnForm boardId={boardId} onSuccess={() => { setIsOpen(false); onCreated(); }} />
      </Modal>
    </>
  );
};
