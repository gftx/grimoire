import { FC } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Idea, IdeaStatus, IdeaType } from "@/entities/idea/types";
import { ideasApi } from "@/entities/idea/api";
import { useIdeasStore } from "@/entities/idea/store";

import { ideaSchema, IdeaFormValues } from "./schema";
import styles from "./styles.module.scss";

interface IdeaEditorInlineProps {
  idea: Idea;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose: () => void;
}

export const IdeaEditorInline: FC<IdeaEditorInlineProps> = ({
  idea,
  onCancel,
  onClose
}) => {
  const { fetchIdeas } = useIdeasStore();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: idea.title,
      description: idea.description ?? "",
      tags: idea.tags.join(", "),
      status: idea.status,
      type: idea.type,
    },
  });

  const onSubmit = async (data: IdeaFormValues) => {
    const parsedTags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    await ideasApi.update(idea.id, {
      ...data,
      tags: parsedTags,
    });

    fetchIdeas();
    onClose();
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editor}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <input
        type='text'
        {...register("title")}
        placeholder='Title'
        className={styles.titleInput}
      />

      <textarea
        {...register("description")}
        placeholder='Description'
        className={styles.textarea}
      />

      <input
        type='text'
        {...register("tags")}
        placeholder='Tags (comma-separated)'
        className={styles.input}
      />

      <div className={styles.row}>
        <select {...register("status")} className={styles.select}>
          {Object.values(IdeaStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select {...register("type")} className={styles.select}>
          {Object.values(IdeaType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <button type='button' onClick={onCancel} className={styles.cancel}>
          Отменить
        </button>
        <button
          type='submit'
          disabled={!isDirty || isSubmitting}
          className={styles.save}
        >
          Сохранить
        </button>
      </div>
    </motion.form>
  );
};
