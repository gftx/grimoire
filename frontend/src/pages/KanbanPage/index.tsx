import { CreateBoardButton } from '@/features/kanban-create';
import { KanbanBoardsList } from '@/features/kanban-list';
import styles from "./styles.module.scss"


export const KanbanPage = () => {
  return (
    <main className={styles.kanbanPage}>
      <div className={styles.header}>
        <h1>My Boards</h1>
        <CreateBoardButton />
      </div>
      <KanbanBoardsList />
    </main>
  );
};