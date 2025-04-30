import { FC, useState } from "react";
import { Idea } from "@/entities/idea/types";
import { useIdeasStore } from "@/entities/idea/store";
import { Modal } from "@/shared/ui/Modal";

import styles from "./styles.module.scss";
interface IdeaCardProps {
  idea: Idea;
}

export const IdeaCard: FC<IdeaCardProps> = ({ idea }) => {
  const { removeIdea } = useIdeasStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    removeIdea(idea.id);
    setIsModalOpen(false);
  }

  return (
    <>
      <div className={styles.ideaCard}>
        <h3 className={styles.title}>{idea.title}</h3>

        <div className={styles.controls}>
          <button
            className={styles.deleteButton}
            onClick={(e) => handleDelete(e)}
            aria-label='Delete idea'
          >
            ✖
          </button>
        </div>

        <div className={styles.meta}>
          <span className={styles.type}>{idea.type.toLowerCase()}</span>
          <span className={styles.status}>
            {idea.status === "DRAFT" ? "Draft" : "Published"}
          </span>
        </div>

        {idea.tags.length > 0 && (
          <div className={styles.tags}>
            {idea.tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this idea?</p>

        <div className={styles.modalActions}>
          <button
            onClick={handleDeleteConfirm}
            className={styles.confirmButton}
          >
            Delete
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};
