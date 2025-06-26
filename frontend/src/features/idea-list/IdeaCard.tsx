import { FC, useState } from "react";
import { Idea } from "@/entities/idea/types";
import { useIdeasStore } from "@/entities/idea/store";
import { Modal } from "@/shared/ui/Modal";
import { todosApi } from "@/entities/todo/api";
import { startOfToday } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { PlusCircle, Trash2 } from "lucide-react";

import styles from "./styles.module.scss";
interface IdeaCardProps {
  idea: Idea;
}

export const IdeaCard: FC<IdeaCardProps> = ({ idea }) => {
  const { removeIdea } = useIdeasStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatingTask, setCreatingTask] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    removeIdea(idea.id);
    setIsModalOpen(false);
  };

  const handleCreateTask = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setCreatingTask(true);
    try {
      await todosApi.create({
        title: idea.title,
        description: idea.description,
        tag: idea.tags[0],
        date: startOfToday().toISOString(),
        completed: false,
      });
    } finally {
      setCreatingTask(false);
    }
  };

  return (
    <>
      <div className={styles.ideaCard}>
        <h3 className={styles.title}>{idea.title}</h3>

        <div>
          <Tooltip
            className={styles.addTodo}
            title={"Create task"}
            placement='bottom'
          >
            <span>
              <IconButton
                onClick={handleCreateTask}
                disabled={creatingTask}
                size='small'
                aria-label='Create task'
              >
                <PlusCircle size={16} />
              </IconButton>
            </span>
          </Tooltip>
          <button
            className={styles.deleteButton}
            onClick={(e) => handleDelete(e)}
            aria-label='Delete idea'
          >
            <Trash2 size={16} />
          </button>
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
