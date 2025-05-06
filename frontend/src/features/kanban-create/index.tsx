import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { CreateBoardForm } from './CreateBoardForm';
import styles from './styles.module.scss';

export const CreateBoardButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.button}>
        ➕ Create Board
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateBoardForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};