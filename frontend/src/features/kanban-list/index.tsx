import { useBoards } from "@/entities/kanban/hooks/useBoards";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/shared/config/routes";

export const KanbanBoardsList = () => {
  const { boards, loading, error } = useBoards();

  if (loading) {
    return <div className={styles.message}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.message}>{error}</div>;
  }

  if (boards.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No boards yet ✨</h2>
        <p>Create your first board to start organizing your ideas!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {boards.map((board) => (
        <Link
          to={`${AppRoutes.KANBAN}/${board.id}`}
          key={board.id}
          className={styles.card}
        >
          <h3>{board.title}</h3>
          {board.description && <p>{board.description}</p>}
        </Link>
      ))}
    </div>
  );
};
