import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Idea } from '@/entities/idea/model';
import { IdeaCard } from './IdeaCard';
import styles from './styles.module.scss';

interface IdeaListProps {
  ideas: Idea[];
}

export const IdeaList: FC<IdeaListProps> = ({ ideas }) => {
  return (
    <div className={styles.ideaList}>
      {ideas.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.empty}
        >
          No ideas yet. Start capturing your thoughts! ✨
        </motion.div>
      ) : (
        <AnimatePresence>
          {ideas.map((idea) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <IdeaCard idea={idea} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};