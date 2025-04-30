import { z } from "zod";
import { IdeaStatus, IdeaType } from "@/entities/idea/types";

export const ideaSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string(),
  tags: z.string(),
  status: z.nativeEnum(IdeaStatus),
  type: z.nativeEnum(IdeaType),
});

export type IdeaFormValues = z.infer<typeof ideaSchema>;
